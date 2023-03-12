import { PrismaClient } from '@prisma/client';
import { pagination } from 'utils/pagination';

const prisma = new PrismaClient();

const findAll = async ({ page = 0, limit = 1, sortBy = 'createAt', orderBy = 'desc', name = '' }) => {
  let options = {
    where: {
      isDelete: false,
    },
  };

  if (name) {
    options.where.name = {
      contains: name,
    };
  }

  if (page != 0) {
    let offset = page * limit;
    options = {
      ...options,
      skip: offset - limit,
      take: parseInt(limit),
    };
  }

  if (sortBy != '') {
    options = {
      ...options,
      orderBy: {
        [sortBy]: orderBy,
      },
    };
  }
  const count = await prisma.product.count({ where: { ...options.where } });
  const data = await prisma.product.findMany({ ...options });

  return pagination({ count, page, limit, data });
};

const findOne = async (data) => {
  return prisma.product.findFirst({
    where: { ...data },
  });
};

const create = (data) => {
  return prisma.product.create({ data });
};

const update = (id, data) => {
  return prisma.product.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.product.delete({ where: { id } });
};

export const ProductService = { create, remove, update, findAll, findOne };
