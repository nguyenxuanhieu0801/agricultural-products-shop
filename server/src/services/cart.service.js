import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getCartByUserId = (userId) => {
  return prisma.$queryRaw`SELECT c.id, p.name, p.price, c.quantity, p.image, p.id as productId, p.quantity as productQuantity
                          FROM cart c, product p, user u 
                          WHERE  u.id = ${userId}  AND c.userId = ${userId} AND c.productId = p.id;`;
};

const find = (field) => {
  return prisma.cart.findFirst({ where: field });
};

const findAll = () => {
  return prisma.cart.findMany();
};

const create = (data) => {
  return prisma.cart.create({ data });
};

const update = (id, data) => {
  return prisma.cart.update({ where: { id }, data });
};

const remove = (id) => {
  return prisma.cart.delete({ where: { id } });
};

export const CartService = { getCartByUserId, findAll, find, create, update, remove };

// export const getCartByUserIdAndProduct = (idUser, idProduct) => {
//   return prisma.cart.findUnique({ where: { userId: idUser, productId: idProduct } });
// };

// export const updateCart = (id, data) => {
//   return prisma.cart.update({ where: { id }, data });
// };
