import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from 'configs/environments';
import jwt from 'jsonwebtoken';

export const generateAuthToken = (type, user) => {
  return jwt.sign(
    {
      _id: user.id,
      firstName: user?.firstName,
      firstName: user?.lastName,
      email: user.email,
      roleId: user.roleId,
    },
    type === 'accessToken' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    { algorithm: 'HS256' }

    // {
    //   expiresIn: type === 'accessToken' ? '1d' : '10d',
    // }
  );
};
