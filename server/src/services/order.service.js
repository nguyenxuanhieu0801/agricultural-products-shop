import { PrismaClient } from '@prisma/client';
import { pagination } from 'utils/pagination';

const prisma = new PrismaClient();

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
  const count = await prisma.order.count({ where: { ...options.where } });
  const data = await prisma.order.findMany({ ...options });

  return pagination({ count, page, limit, data });
}

const find = (column) => {
  return prisma.order.findFirst({
    where: column,
    include: {
      orderDetails: true,
    },
  });
};

const create = (bodyOrder, carts) => {
  return prisma.order.create({
    data: {
      ...bodyOrder,
      orderDetails: {
        create: carts.map((item) => {
          return {
            // price: item.price,
            quantity: item.quantity,
            productId: item.productId,
          };
        }),
      },
    },
    include: {
      orderDetails: true, // Include all posts in the returned object
    },
  });
};

const update = async (id, data) => {
  return prisma.order.update({ where: { id }, data });
};

const findOne = (id) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      orderDetails: true,
    },
  });
};

const getOrderDetailByOrderID = (orderId) => {
  return prisma.$queryRaw`SELECT od.id ,od.quantity, p.price, p.name, p.image
                          FROM \`\order\`\  o, orderdetail od, product p 
                          WHERE o.id =${orderId} AND od.orderId = ${orderId} AND od.productId = p.id`;
};

const getAllOrdersToday = () => {
  return prisma.$queryRaw`SELECT * 
                          FROM \`\order\`\ o 
                          WHERE DATE(o.createAt) = CURRENT_DATE()`;
};

const report = (startDate, endDate) => {
  return prisma.$queryRaw`SELECT SUM(o.total) as total, DATE_FORMAT(createAt,'%Y-%m-%d') as date
                          FROM (SELECT * FROM \`\order\`\ WHERE status = 2) o 
                          WHERE o.createAt BETWEEN ${startDate} AND ${endDate}
                          GROUP BY DATE_FORMAT(createAt,'%Y-%m-%d')`;
};

export const OrderService = {
  find,
  findAll,
  create,
  findOne,
  update,
  getOrderDetailByOrderID,
  getAllOrdersToday,
  report,
};
