import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = decoded; // Guardar información del usuario en la petición
    next();
  });
};
