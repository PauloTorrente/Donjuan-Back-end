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
    throw new Error('Email is already registered');
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
    throw new Error('Error registering the user');
  });

  console.log('User successfully saved:', savedUser);

  // Send confirmation email
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirm your registration',
      text: 'Please confirm your registration by following this link.',
      html: '<b>Please confirm your registration by following this link.</b>',
    });
    console.log('Confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }

  return savedUser;
};

// Function to log in a user
export const login = async (email, password) => {
  console.log('Attempting to log in with email:', email);

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.AUTH_SECRET_KEY);
  console.log('Token generated for user:', token);

  return token;
};

// Function to handle forgotten password
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Generate a password reset token
  const token = crypto.randomBytes(20).toString('hex');

  // Set token expiration to 1 hour
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

  await user.save();

  // Send password reset email
  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `You are receiving this because you requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
      html: `<p>You are receiving this because you requested a password reset.</p><p>Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    });
    return { message: 'Password recovery email sent' };
  } catch (error) {
    console.error('Error sending password recovery email:', error);
    throw new Error('Error sending password recovery email');
  }
};
