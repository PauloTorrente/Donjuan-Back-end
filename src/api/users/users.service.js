import * as usersRepo from './users.repository.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import transporter from '../../config/nodemailer.config.js';

export async function register({ email, password, role }) {
  const confirmationToken = crypto.randomBytes(20).toString('hex');
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    role,
    deleted: false,
    isConfirmed: false,
    confirmationToken,
    createdAt: new Date(),
  };

  const user = await usersRepo.create(newUser);

  const confirmationUrl = `https://donjuan-rzly.onrender.com/api/users/confirm/${confirmationToken}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirma tu registro',
    text: `Por favor, confirma tu registro siguiendo este enlace: ${confirmationUrl}`,
    html: `<b>Por favor, confirma tu registro siguiendo este enlace:</b> <a href="${confirmationUrl}">${confirmationUrl}</a>`,
  });

  return user;
}

export const getUserById = async (id) => {
  return await usersRepo.getById(id);
};

export const updateUser = async (id, updatedData) => {
  return await usersRepo.update(id, updatedData);
};
