import { ActionDelete } from 'components/actions';
import { Button } from 'components/button';
import { IconMinus, IconPlus } from 'components/icons';
import { Table } from 'components/table';
import Layout from 'layouts/Layout';
import CartSummury from 'module/cart/CartSummury';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart, fetchCart, removeItem } from 'redux/features/cartSlice';
import { STEP } from 'utils/constants';
import { getToken } from 'utils/getToken';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.cart);

  useEffect(() => {
    document.title = 'Cart';
    const token = getToken();
    dispatch(fetchCart(token));
  }, [dispatch, navigate, user]);
  const handleOnClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleRemove = (id) => {
    const token = getToken();
    dispatch(removeItem({ id, token }));
  };

  const handleIncreaseItem = (item) => {
    try {
      const value = item.quantity + STEP;
      if (value <= item.productQuantity) {
        const body = {
          productId: item.productId,
          quantity: 1,
        };
        const token = getToken();
        dispatch(addToCart({ body, token })).unwrap();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDecreaseItem = (item) => {
    try {
      const value = item.quantity - STEP;
      if (value > 0) {
        const body = {
          productId: item.productId,
          quantity: -1,
        };
        const token = getToken();
        dispatch(addToCart({ body, token })).unwrap();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const total = () => {
    let total = 0;
    data.forEach((item) => {
      total += item.quantity * item.price;
    });

    return total;
  };

  if (!user) navigate('/404');

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto">
        <h2 className="font-bold text-[30px] leading-normal mb-4 text-center">Giỏ Hàng</h2>
        <Table className="">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Tổng</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="!pr-[100px]" onClick={() => handleOnClick(item.id)}>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={item?.image || 'https://placehold.jp/100x78.png'}
                        alt=""
                        className="w-[100px] h-[78px] rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                      </div>
                    </div>
                  </td>
                  <td>{item.price}đ</td>
                  <td>
                    <div className="flex justify-center items">
                      <button
                        type="button"
                        className="flex items-center justify-center h-[40px] w-[40px] border border-solid border-[#ccc] rounded-tl-md rounded-bl-md bg-[#ddd] rounded-r-0"
                        onClick={() => handleDecreaseItem(item)}
                      >
                        <IconMinus />
                      </button>
                      <div className="w-[40px] h-[40px] border border-solid border-[#ccc] flex items-center justify-center">
                        {item.quantity}
                      </div>
                      <button
                        type="button"
                        className="flex items-center justify-center h-[40px] w-[40px] border border-solid border-[#ccc] rounded-tr-md rounded-br-md bg-[#ddd] rounded-r-0"
                        onClick={() => handleIncreaseItem(item)}
                      >
                        <IconPlus />
                      </button>
                    </div>
                  </td>
                  <td>{item.price * item.quantity}đ</td>
                  <td>
                    <div className="flex items-center text-gray-500 gap-x-3">
                      <ActionDelete onClick={() => handleRemove(item.id)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="mt-[10px] flex justify-end">
          <CartSummury total={total()}>
            <Button href="/checkout" className="w-full text-white bg-primary">
              Đặt Hàng
            </Button>
          </CartSummury>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
