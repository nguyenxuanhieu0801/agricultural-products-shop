import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const create = (data) => {
  return prisma.orderDetail.create({ data });
};

async function findAll({ page = 0, limit = 1, sortBy = 'createAt', orderBy = 'desc' }) {
  let options = {};

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
  const count = await prisma.orderDetail.count({ where: { ...options.where } });
  const data = await prisma.orderDetail.findMany({ ...options });

  return pagination({ count, page, limit, data });
}

export const OrderDetailService = { create, findAll };
