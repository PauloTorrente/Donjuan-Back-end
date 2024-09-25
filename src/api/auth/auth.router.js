import express from 'express';
import { register, login } from './auth.controller.js';
import { refreshToken } from './auth.service.js'; // Import the refresh token handler

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Route to refresh the token
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const newToken = await refreshToken(refreshToken);
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});

export default router;
