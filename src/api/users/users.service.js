import * as usersRepo from './users.repository.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import transporter from '../../config/nodemailer.config.js';

export async function register({ email, password, role }) {
  const confirmationToken = crypto.randomBytes(20).toString('hex');
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  const newUser = {
    email,
    password: hashedPassword,
    role,
    deleted: false,
    isConfirmed: false,
    confirmationToken,
  };

  // Save the new user
  const user = await usersRepo.create(newUser);

  // Send confirmation email
  const confirmationUrl = `https://donjuan-rzly.onrender.com/api/users/confirm/${confirmationToken}`; // Ensure the URL includes /api
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirma tu registro',
    text: `Por favor, confirma tu registro siguiendo este enlace: ${confirmationUrl}`,
    html: `<b>Por favor, confirma tu registro siguiendo este enlace:</b> <a href="${confirmationUrl}">${confirmationUrl}</a>`,
  });

  return user;
}
