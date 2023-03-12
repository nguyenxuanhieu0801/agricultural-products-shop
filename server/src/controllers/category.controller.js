import { HttpStatusCode } from 'constants/HttpStatusCode';
import { CategoryService } from 'services/category.service';

const findAll = async (req, res, next) => {
  let { page, limit, sortBy, orderBy, name } = req.query;

  try {
    const results = await CategoryService.findAll({ page, limit, sortBy, orderBy, name });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findOne = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const category = await CategoryService.findOne({ id });
    if (!category) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${id}` });
    return res.status(HttpStatusCode.OK).json({ ...category });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const foundCategory = await CategoryService.findOne(req.body);
    if (foundCategory)
      return res
        .status(HttpStatusCode.CONFLICT)
        .json({ message: `Category name ${foundCategory.name} is already in use` });
    const category = await CategoryService.create(req.body);
    return res.status(HttpStatusCode.CREATED).json({ category });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const update = async (req, res, next) => {
  let id = +req.params.id;

  try {
    const foundCategory = await CategoryService.findOne({ id });
    if (!foundCategory)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${id}` });
    const category = await CategoryService.update(id, req.body);
    return res.status(HttpStatusCode.OK).json({ category });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const remove = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const foundCategory = await CategoryService.findOne({ id });

    if (!foundCategory) {
      const error = new Error(`Not found category with the id ${id}`);
      error.status = HttpStatusCode.NOT_FOUND;
      next(error);
    } else {
      const category = await CategoryService.remove(id);
      return res.status(HttpStatusCode.OK).json({ category });
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export const CategoryController = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
