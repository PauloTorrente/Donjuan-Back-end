import jwt from 'jsonwebtoken';
import User from '../api/users/users.model.js'; // Adjust the path as needed

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Received token:', token); // Log the token for debugging

      // Verify the token
      const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
      console.log('Decoded token:', decoded); // Log decoded token

      // Find the user
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      console.log('User found:', user); // Log found user

      // Check for admin role
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error in token verification:', error); // Log the error for debugging
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
