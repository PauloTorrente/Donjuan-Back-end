import * as usersRepo from './users.repository.js';
import crypto from 'crypto';
import transporter from '../../config/nodemailer.config.js';

export async function register({ email, password, role }) {
  const confirmationToken = crypto.randomBytes(20).toString('hex');

  const newUser = {
    email,
    password,
    role,
    deleted: false,
    isConfirmed: false,
    confirmationToken,
  };

  // Save the new user
  const user = await usersRepo.create(newUser);

  // Send confirmation email
  const confirmationUrl = `https://donjuan-rzly.onrender.com/confirm/${confirmationToken}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirma tu registro',
    text: `Por favor, confirma tu registro siguiendo este enlace: ${confirmationUrl}`,
    html: `<b>Por favor, confirma tu registro siguiendo este enlace:</b> <a href="${confirmationUrl}">${confirmationUrl}</a>`,
  });

  return user;
}
