import User from '../users/users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from '../../config/nodemailer.config.js';
import crypto from 'crypto';

// Function to register a user
export const register = async (email, password, role) => {
  console.log('Attempting to register user with email:', email);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const confirmationToken = crypto.randomBytes(20).toString('hex');

  const newUser = {
    email,
    password: hashedPassword,
    role,
    deleted: false,
    isConfirmed: false,
    createdAt: Date.now(),
    confirmationToken,
  };

  const user = new User(newUser);
  const savedUser = await user.save().catch(error => {
    console.error('Error saving the user:', error);
    throw new Error('Error registrando el usuario');
  });

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

// Function to log in a user and generate both access and refresh tokens
export const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  if (!user.isConfirmed) {
    throw new Error('Please confirm your email before logging in');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token that expires in 15 minutes
  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: '15m' } // Token expires in 15 minutes
  );

  // Generate a refresh token that expires in 7 days
  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.AUTH_SECRET_KEY,
    { expiresIn: '7d' } // Refresh token expires in 7 days
  );

  return { token, refreshToken };
};

// Function to refresh tokens
export const refreshToken = async (oldRefreshToken) => {
  try {
    const decoded = jwt.verify(oldRefreshToken, process.env.AUTH_SECRET_KEY);
    
    // Generate a new token (15 minutes) based on the decoded refresh token data
    const newToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email, role: decoded.role },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: '15m' }
    );

    return newToken;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};
