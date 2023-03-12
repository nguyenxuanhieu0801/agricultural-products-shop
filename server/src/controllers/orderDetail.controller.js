import { HttpStatusCode } from 'constants/HttpStatusCode';
import { OrderDetailService } from 'services/orderDetail.service';
import { OrderService } from 'services/order.service';
import { UserService } from 'services/user.service';
import { CartService } from 'services/cart.service';

const findAll = async (req, res) => {
  const { page, limit, sortBy, orderBy, search } = req.query;

  const orders = await OrderService.findAll({ search, page, limit, sortBy, orderBy });
  return res.status(HttpStatusCode.OK).json({ orders });
};

const findOne = async (req, res) => {
  const orderId = parseInt(req.params.orderId);

  try {
    const order = await OrderService.findOne(orderId);
    if (order) {
      return res.status(HttpStatusCode.OK).json(order);
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No order found with the id ${orderId}` });
    }
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { user } = req;
  const { shipName, shipAddress, shipEmail, shipPhone } = req.body;

  const carts = await CartService.getCartByUserId(user._id);

  let order = await OrderService.create({ shipName, shipAddress, shipEmail, shipPhone, status: 0, userId: user._id });
  carts.forEach(async (item) => {
    let data = {
      price: item.price,
      quantity: item.quantity,
      productId: item.productId,
      orderId: order.id,
    };
    await OrderDetailService.create(data);
  });

  await UserService.deleteCartsOfUser(user._id);
  return res.status(HttpStatusCode.OK).json({ order });
};

const updateOrder = async (req, res) => {
  // const { user } = req;
  const orderId = req.params.orderId;

  const order = await OrderService.create({ shipName, shipAddress, shipEmail, shipPhone, status: 0, userId: user.id });

  let carts = await UserService.getCart(user.id);

  carts.forEach(async (item) => {
    let data = {
      price: item.price,
      quantity: item.quantity,
      productId: item.productId,
      orderId: 24,
    };
    await OrderDetailService.create(data);
  });

  return res.sendStatus(200);
};

export const OrderController = { create, findAll, findOne };
