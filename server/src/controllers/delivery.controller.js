import { HttpStatusCode } from 'constants/HttpStatusCode';
import { DeliveryService } from 'services/delivery.service';

const findAll = async (req, res, next) => {
  try {
    let { page, limit, sortBy, orderBy, name } = req.query;

    const results = await DeliveryService.findAll({ page, limit, sortBy, orderBy, name });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const results = await DeliveryService.findOne({ id });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const foundDelivery = await DeliveryService.findOne(req.body);
    if (foundDelivery)
      return res.status(HttpStatusCode.CONFLICT).json({ message: `Delivery name ${foundUnit.name} is already in use` });
    const delivery = await DeliveryService.create(req.body);
    return res.status(HttpStatusCode.CREATED).json(delivery);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const update = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const foundDelivery = await DeliveryService.findOne({ id });
    if (!foundDelivery)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No Delivery found with the id ${id}` });
    const delivery = await DeliveryService.update(id, req.body);
    return res.status(HttpStatusCode.OK).json({ delivery });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export const DeliveryController = {
  findAll,
  findOne,
  create,
  update,
};
