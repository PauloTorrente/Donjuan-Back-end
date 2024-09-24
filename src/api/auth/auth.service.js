import User from '../users/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../../config/nodemailer.config.js';
import crypto from 'crypto'; // For generating password reset token

// Function to register a user
export const register = async (email, password, role) => {
  console.log('Attempting to register user with email:', email);

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  console.log('Existing user:', existingUser); // Log to check if user already exists
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Encrypted password:', hashedPassword);

  // Create the new user object
  const newUser = {
    email,
    password: hashedPassword,
    role,
    deleted: false,
    isConfirmed: false,
    createdAt: Date.now(),
  };

  const user = new User(newUser);
  console.log('User to be saved:', user);

  // Save the user to the database
  const savedUser = await user.save().catch(error => {
    console.error('Error saving the user:', error);
    throw new Error('Error registrando el usuario');
  });

  console.log('User successfully saved:', savedUser);

  // Send confirmation email in Spanish
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirma tu registro',
      text: 'Por favor, confirma tu registro siguiendo este enlace.',
      html: '<b>Por favor, confirma tu registro siguiendo este enlace.</b>',
    });
    console.log('Correo de confirmación enviado a:', email);
  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error);
  }

  return savedUser;
};

// Function to log in a user
export const login = async (email, password) => {
  console.log('Attempting to log in with email:', email);

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.AUTH_SECRET_KEY);
  console.log('Token generado para el usuario:', token);

  return token;
};

// Function to handle forgotten password
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Generate a password reset token
  const token = crypto.randomBytes(20).toString('hex');

  // Set token expiration to 1 hour
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

  await user.save();

  // Send password reset email in Spanish
  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Recuperación de Contraseña',
      text: `Has solicitado una recuperación de contraseña. Por favor, haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`,
      html: `<p>Has solicitado una recuperación de contraseña.</p><p>Por favor, haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`,
    });
    return { message: 'Correo de recuperación de contraseña enviado' };
  } catch (error) {
    console.error('Error al enviar el correo de recuperación:', error);
    throw new Error('Error al enviar el correo de recuperación');
  }
};
