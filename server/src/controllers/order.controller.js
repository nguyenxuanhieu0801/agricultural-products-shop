import { HttpStatusCode } from 'constants/HttpStatusCode';
import { OrderDetailService } from 'services/orderDetail.service';
import { OrderService } from 'services/order.service';
import { UserService } from 'services/user.service';
import { CartService } from 'services/cart.service';
import moment from 'moment';
import { ProductService } from 'services/product.service';

const findAll = async (req, res) => {
  try {
    const { page, limit, sortBy, orderBy } = req.query;

    const orders = await OrderService.findAll({ page, limit, sortBy, orderBy });
    return res.status(HttpStatusCode.OK).json({ orders });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const getAllOrdersToday = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrdersToday();

    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const getListOrderDetail = async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const order = await OrderService.findOne(orderId);
    const orderDetails = await OrderService.getOrderDetailByOrderID(orderId);

    if (orderDetails) {
      return res.status(HttpStatusCode.OK).json({ total: order.total, orderDetails });
    } else {
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No order found with the id ${orderId}` });
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { user } = req;

    const carts = await CartService.getCartByUserId(user._id);

    let bodyOrder = {
      ...req.body,
      userId: user._id,
    };

    const order = await OrderService.create(bodyOrder, carts);

    order.orderDetails.map(async (item) => {
      let { id, name, price, description, quantity, image, unit, mass, origin, categoryId } =
        await ProductService.findOne({
          id: item.productId,
        });
      let newValue = {
        name,
        price,
        description,
        quantity,
        mass,
        origin,
        image,
        unit,
        categoryId,
      };
      newValue.quantity -= item.quantity;
      await ProductService.update(id, newValue);
    });

    await UserService.deleteCartsOfUser(user._id);
    return res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findOne = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const orders = await OrderService.findOne(id);
    if (!orders) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `Not orders found with the id ${id}` });
    return res.status(HttpStatusCode.OK).json(orders);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const update = async (req, res, next) => {
  let id = +req.params.id;
  try {
    const foundOrder = await OrderService.findOne(id);
    if (!foundOrder)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No category found with the id ${id}` });

    const order = await OrderService.update(id, req.body);
    return res.status(HttpStatusCode.OK).json(order);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const report = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.params;
    const response = await OrderService.report(startDate, endDate);
    let data = [...response];

    let test = moment(new Date(startDate)).format('YYYY-MM-DD');
    let i = 0;

    while (test >= startDate && test <= endDate) {
      if (data[i]?.date === test) {
      } else {
        data.splice(i, 0, {
          total: 0,
          date: test,
        });
      }
      test = moment(new Date(test).setDate(new Date(test).getDate() + 1)).format('YYYY-MM-DD');
      i++;
    }

    return res.status(HttpStatusCode.OK).json(data);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

export const OrderController = { create, findAll, findOne, update, getListOrderDetail, getAllOrdersToday, report };
