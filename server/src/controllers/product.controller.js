import { HttpStatusCode } from 'constants/HttpStatusCode';
import { CategoryService } from 'services/category.service';
import { ProductService } from 'services/product.service';

const findAll = async (req, res, next) => {
  const { page = 0, limit = 10, sortBy = '', orderBy = 'asc', name = '' } = req.query;
  try {
    const results = await ProductService.findAll({ name, page, limit, sortBy, orderBy });
    return res.status(HttpStatusCode.OK).json(results);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findOne = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const product = await ProductService.findOne({ id });
    if (!product) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the id ${id}` });
    return res.status(HttpStatusCode.OK).json({ product });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const foundProduct = await ProductService.findOne({ name: req.body.name });
    if (foundProduct)
      return res
        .status(HttpStatusCode.CONFLICT)
        .json({ message: `Product name ${foundProduct.name} is already in use` });

    const foundCategory = await CategoryService.findOne({ id: req.body.categoryId });
    if (!foundCategory)
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: `Not found category with id ${req.body.categoryId}` });

    const product = await ProductService.create(req.body);
    return res.status(HttpStatusCode.CREATED).json({ product });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const update = async (req, res, next) => {
  let id = +req.params.id;

  try {
    const foundProduct = await ProductService.findOne({ id });
    if (!foundProduct)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the id ${id}` });

    const foundCategory = await CategoryService.findOne({ id: req.body.categoryId });
    if (!foundCategory)
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: `Not found category with id ${req.body.categoryId}` });

    const product = await ProductService.update(id, req.body);
    return res.status(HttpStatusCode.OK).json({ product });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const remove = async (req, res, next) => {
  let id = +req.params.id;

  try {
    const product = await ProductService.remove(id);
    if (!product) next(createError.NotFound(`No product found with the id ${id}`));

    return res.status(HttpStatusCode.OK).json({ message: 'Delete product successfully' });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export const ProductController = {
  findAll,
  findOne,
  update,
  remove,
  create,
};
