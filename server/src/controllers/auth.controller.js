import { HttpStatusCode } from 'constants/HttpStatusCode';
import { UserService } from 'services/user.service';
import { generateAuthToken } from 'utils/generateAuthToken';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await UserService.findOne({ email });
  if (!foundUser) return res.sendStatus(401);
  let verifyPassword = await bcrypt.compare(password, foundUser.password);
  if (verifyPassword) {
    const token = generateAuthToken('accessToken', foundUser);
    let { password, ...user } = foundUser;
    return res.status(HttpStatusCode.OK).json({ token, ...user });
  }
  return res.sendStatus(401);
};

const register = async (req, res, next) => {
  try {
    const foundUser = await UserService.findOne({ email: req.body.email });
    if (foundUser) return res.status(HttpStatusCode.FORBIDDEN).json({ message: 'Email đã được đăng ký.' });

    const { password, ...user } = await UserService.create(req.body);
    const token = generateAuthToken('accessToken', user);
    return res.status(HttpStatusCode.OK).json({ ...user, token });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, password, newPassword } = req.body;
    const foundUser = await UserService.findOne({ email });
    let verifyPassword = await bcrypt.compare(password, foundUser.password);
    if (verifyPassword) {
      const salt = await bcrypt.genSalt(10);
      const body = await bcrypt.hash(newPassword, salt);
      const data = await UserService.update(foundUser.id, { password: body });
      return res.status(HttpStatusCode.OK).json({ message: 'update password successfully' });
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: 'Email or Password does not match' });
    }
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  login,
  register,
  resetPassword,
};
