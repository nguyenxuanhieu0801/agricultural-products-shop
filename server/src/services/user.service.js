import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { pagination } from 'utils/pagination';

const prisma = new PrismaClient();

async function findAll({ page = 0, limit = 1, sortBy = 'createAt', orderBy = 'desc', email = '' }) {
  let options = {};

  // if (roleId) {
  //   options = {
  //     where: {
  //       roleId: Number(roleId),
  //     },
  //   };
  // }

  if (email) {
    options = {
      where: {
        email: { contains: email },
      },
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

  const count = await prisma.user.count({ where: { ...options.where } });

  const data = await prisma.user.findMany({ ...options });

  return pagination({ count, page, limit, data });
}

const findOne = (data) => {
  return prisma.user.findUnique({
    where: { ...data },
    include: {
      orders: true,
    },
  });
};

const getCart = async (id) => {
  const { carts } = await prisma.user.findUnique({
    where: { id },
    include: {
      carts: {
        include: {
          products: true,
        },
      },
    },
  });

  return carts;
};

const getOrder = async (id) => {
  const { orders } = await prisma.user.findUnique({
    where: { id },
    select: { orders: true },
  });
  return orders;
};

const find = (column) => {
  return prisma.user.findFirst({ where: column });
};

const create = async (data) => {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  return prisma.user.create({ data });
};

const update = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.user.delete({ where: { id } });
};

const deleteCartsOfUser = (id) => {
  return prisma.user.update({
    where: { id },
    data: {
      carts: {
        deleteMany: {},
      },
    },
  });
};

export const UserService = {
  create,
  find,
  getCart,
  getOrder,
  findAll,
  findOne,
  update,
  remove,
  deleteCartsOfUser,
};
