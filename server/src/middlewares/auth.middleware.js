import { ACCESS_TOKEN_SECRET } from 'configs/environments';
import { userRole } from 'constants/Global';
import { HttpStatusCode } from 'constants/HttpStatusCode';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
      req.user = decoded;
      //req.user = await User.findById(decoded.id).select('-password')
      next();
    } catch (error) {
      res.status(HttpStatusCode.UNAUTHORIZED);
      throw new Error('Not authorized');
    }
  }

  if (!token)
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      message: 'Not authorized, no token',
    });
};

export const checkRole = (req, res, next) => {
  const { user } = req;
  if (user.roleId === userRole.ADMIN) {
    next();
  } else {
    return res.status(HttpStatusCode.FORBIDDEN).send('Access denied. Not authorized...');
  }
};
