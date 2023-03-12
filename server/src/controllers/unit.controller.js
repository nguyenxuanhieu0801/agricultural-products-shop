import { HttpStatusCode } from 'constants/HttpStatusCode';
import { UnitService } from 'services/unit.service';

const findAll = async (req, res, next) => {
  try {
    let { page, limit, sortBy, orderBy, name } = req.query;

    const results = await UnitService.findAll({ page, limit, sortBy, orderBy, name });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const id = +req.params.id;
    const results = await UnitService.findOne({ id });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const foundUnit = await UnitService.findOne(req.body);
    if (foundUnit)
      return res.status(HttpStatusCode.CONFLICT).json({ message: `Unit name ${foundUnit.name} is already in use` });
    const unit = await UnitService.create(req.body);
    return res.status(HttpStatusCode.CREATED).json(unit);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const update = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const foundUnit = await UnitService.findOne({ id });
    if (!foundUnit) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No unit found with the id ${id}` });
    const unit = await UnitService.update(id, req.body);
    return res.status(HttpStatusCode.OK).json({ unit });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export const UnitController = {
  findAll,
  findOne,
  create,
  update,
};
