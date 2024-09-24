import * as userService from './auth.service.js';

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  console.log('Datos de registro recibidos:', req.body); // Para debug

  try {
    const newUser = await userService.register(email, password, role);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al registrar usuario:', error); // Para debug
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const token = await userService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Para debug
    res.status(401).json({ message: 'Invalid credentials' });
  }
};
