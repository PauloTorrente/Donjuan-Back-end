import * as usersRepo from './users.repository.js';

export async function register({ email, password, role }) {
  const newUser = {
    email,
    password,
    role,
    deleted: false,
    isConfirmed: false,
  };
  return usersRepo.create(newUser);
}
