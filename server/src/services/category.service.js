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
  const count = await prisma.category.count({ where: { ...options.where } });
  const data = await prisma.category.findMany({ ...options });

  return pagination({ count, page, limit, data });
};

const findOne = (data) => {
  return prisma.category.findFirst({
    where: { ...data },
    include: {
      products: true,
    },
  });
};

const create = (data) => {
  return prisma.category.create({ data });
};

const update = (id, data) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

const remove = (id) => {
  return prisma.category.delete({ where: { id } });
};

export const CategoryService = { create, remove, update, findAll, findOne };
