import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify JWT access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (optional: you can also fetch full user from DB here)
    req.user = { id: decoded.id };

    next(); // Continue to next middleware or controller
  } catch (error) {
    console.error('JWT Verification Failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
