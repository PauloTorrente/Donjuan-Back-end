import User from '../users/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // To generate JWT
import transporter from '../../config/nodemailer.config.js';
import crypto from 'crypto'; // For generating confirmation token

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

  // Generate a confirmation token
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  // Create the new user object
  const newUser = {
    email,
    password: hashedPassword,
    role,
    deleted: false,
    isConfirmed: false,
    createdAt: Date.now(),
    confirmationToken, // Add confirmation token to user object
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
  const confirmationUrl = `https://donjuan-rzly.onrender.com/api/users/confirm/${confirmationToken}`;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirma tu registro',
      text: `Por favor, confirma tu registro siguiendo este enlace: ${confirmationUrl}`,
      html: `<b>Por favor, confirma tu registro siguiendo este enlace: <a href="${confirmationUrl}">${confirmationUrl}</a></b>`,
    });
    console.log('Correo de confirmación enviado a:', email);
  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error);
  }

  return savedUser;
};

// Function to log in a user
export const login = async (email, password) => {
  console.log('Attempting to log in user with email:', email);

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Check if the user has confirmed their email
  if (!user.isConfirmed) {
    throw new Error('Please confirm your email before logging in');
  }

  // Compare the provided password with the stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: '1h' } // Token expires in 1 hour
  );

  console.log('Login successful, token generated:', token);
  return token;
};
