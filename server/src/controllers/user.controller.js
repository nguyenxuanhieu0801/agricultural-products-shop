import bcrypt from 'bcrypt';
import { HttpStatusCode } from 'constants/HttpStatusCode';
import createError from 'http-errors';
import { UserService } from 'services/user.service';

const findAll = async (req, res) => {
  try {
    let { page, limit, sortBy, orderBy, roleId, email } = req.query;

    const results = await UserService.findAll({ page, limit, sortBy, orderBy, roleId, email });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const getListOrderOfUser = async (req, res, next) => {
  try {
    const { user } = req;
    const id = parseInt(req.params.id);
    if (user._id !== id) return res.send(HttpStatusCode.UNAUTHORIZED);
    const { orders } = await UserService.findOne({ id });
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const id = parseInt(req.params.userId);

  try {
    const { password, ...data } = await UserService.findOne({ id });
    if (!data) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${userId}` });
    return res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    return res.status(HttpStatusCode.OK).json({ user });
  } catch (error) {
    next(createError.NotFound(error.message));
  }
};

const update = async (req, res, next) => {
  const id = parseInt(req.params.userId);
  const { birthDay, password, address, firstName, lastName, phone, image } = req.body;
  try {
    const foundUser = await UserService.findOne({ id });
    if (!foundUser)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No user found with the id ${userId}` });

    if (req.body.email) {
      const emailExists = await UserService.find({ email: req.body.email });
      if (!emailExists)
        return res.status(HttpStatusCode.NOT_FOUND).json({ message: `User is already in use by ${req.body.email}` });
    }
    let _toISOString;
    let newValue = { firstName, lastName, phone, image };
    if (address) {
      newValue = {
        ...newValue,
        address,
      };
    }

    if (birthDay) {
      _toISOString = new Date(birthDay).toISOString();
      newValue = {
        ...newValue,
        birthDay: _toISOString,
      };
    }

    let newPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
      newValue = {
        password: newPassword,
      };
    }

    const user = await UserService.update(id, newValue);
    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const remove = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await UserService.remove(userId);
    if (!user) {
      next(createError.NotFound(`No user found with the id ${userId}`));
    }
    return res.status(HttpStatusCode.OK).json(user);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const UserController = {
  findAll,
  findOne,
  update,
  remove,
  create,
  getListOrderOfUser,
};
