import { HttpStatusCode } from 'constants/HttpStatusCode';
import { CartService } from 'services/cart.service';

import { ProductService } from 'services/product.service';

const addToCart = async (req, res, next) => {
  const { user } = req;
  let { quantity, productId } = req.body;
    try {
    const product = await ProductService.findOne({ id: productId });
    if (!product)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the productId ${productId}` });

    const foundCart = await CartService.find({ userId: user._id, productId: productId });

    if (foundCart) {
      quantity += foundCart.quantity;
      const cart = await CartService.update(foundCart.id, { quantity });
      return res.status(HttpStatusCode.OK).json(cart);
    }
    const data = {
      userId: user._id,
      productId: product.id,
      quantity,
    };
    const cart = await CartService.create(data);
    return res.status(HttpStatusCode.OK).json(cart);
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const getCart = async (req, res) => {
  const { user } = req;
  const carts = await CartService.getCartByUserId(user._id);
  return res.status(HttpStatusCode.OK).json(carts);
};

const updateCart = async (req, res) => {
  const { user } = req;
  const quantity = parseInt(req.body.quantity);
  const productId = parseInt(req.body.productId);

  try {
    const product = await ProductService.findOne(productId);

    if (!product)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the productId ${productId}` });

    const foundCart = await CartService.find({ userId: user.id, productId: productId });
    if (!foundCart)
      return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No cart found with the userId ${user.id}` });

    const cart = await CartService.update(foundCart.id, { quantity });
    if (cart.quantity === 0) await CartService.remove(cart.id);
    return res.status(HttpStatusCode.OK).json(cart);
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

const removeItem = async (req, res) => {
  const { user } = req;

  let id = +req.params.id;
  // const productId = parseInt(req.body.productId);

  try {
    // const product = await ProductService.findOne(productId);
    // if (!product)
    //   return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No product found with the productId ${productId}` });
    const foundCart = await CartService.find({ userId: user.id, id });
    if (!foundCart) return res.status(HttpStatusCode.NOT_FOUND).json({ message: `No cart found` });
    const cart = await CartService.remove(foundCart.id);
    return res.status(HttpStatusCode.OK).json({ message: 'Delete product in cart successfully', cart });
    // return res.status(HttpStatusCode.OK).json({ message: 'Delete product in cart successfully', foundCart });
  } catch (error) {
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: error.message });
  }
};

export const CartController = { getCart, addToCart, updateCart, removeItem };
