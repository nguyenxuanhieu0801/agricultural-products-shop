import { PrismaClient } from '@prisma/client';
import { pagination } from 'utils/pagination';

const prisma = new PrismaClient();

async function findAll({ page = 0, limit = 1, sortBy = 'id', orderBy = 'desc', name = '' }) {
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

  const count = await prisma.delivery.count({ where: { ...options.where } });
  const data = await prisma.delivery.findMany({ ...options });

  return pagination({ count, page, limit, data });
}

const findOne = (data) => {
  return prisma.delivery.findFirst({
    where: { ...data },
  });
};

const update = (id, data) => {
  return prisma.delivery.update({
    where: { id },
    data,
  });
};

const create = (data) => {
  return prisma.delivery.create({ data });
};

export const DeliveryService = { create, findAll, findOne, update };
