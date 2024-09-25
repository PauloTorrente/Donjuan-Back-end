import * as userService from './auth.service.js';

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  console.log('Datos de registro recibidos:', req.body); // For debug purposes

  try {
    const newUser = await userService.register(email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error); // For debug purposes
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, refreshToken } = await userService.login(email, password); // Return both tokens

    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ token, refreshToken }); // Include refresh token in response
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // For debug purposes
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
