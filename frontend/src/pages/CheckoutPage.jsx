// import { Checkbox } from 'components/checkbox';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import FormGroup from 'components/common/FormGroup';
import FormRow from 'components/common/FormRow';
import { Input } from 'components/input';
import { Label } from 'components/label';
import Layout from 'layouts/Layout';
import CartSummury from 'module/cart/CartSummury';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchCart } from 'redux/features/cartSlice';
import { OrderService } from 'services/orderServices';
import { getToken } from 'utils/getToken';

import * as yup from 'yup';

const schema = yup
  .object({
    shipName: yup.string().required('Vui lòng nhập họ tên'),
    shipEmail: yup.string().email('Email không hợp lê').required('Vui lòng nhập email'),
    shipAddress: yup.string().required('Vui lòng nhập địa chỉ'),
    shipPhone: yup.string().required('Vui lòng nhập điện thoại').min(10, 'Số điện thoại tối thiểu 10 số'),
  })
  .required();

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      shipName: '',
      shipAddress: '',
      shipEmail: '',
      shipPhone: '',
    },
  });

  useEffect(() => {
    document.title = 'Checkout';
    const shipName = user?.lastName + ' ' + user?.firstName;
    reset({
      shipName: shipName.trim(),
      shipAddress: user?.address || '',
      shipEmail: user?.email,
      shipPhone: user?.phone || 0,
    });
    const token = getToken();
    dispatch(fetchCart(token));
  }, [dispatch, user, reset]);

  const total = () => {
    let total = 0;
    data.forEach((item) => {
      total += item.quantity * item.price;
    });

    return total;
  };

  const handleCheckout = async (values) => {
    if (!isValid) return;
    try {
      let newValues = {
        ...values,
        total: total(),
      };
      const token = getToken();
      const response = await OrderService.create(newValues, token);
      if (response) {
        dispatch(fetchCart(token));
        toast.success('Tạo đơn hàng thành công');
        navigate('/orders');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user) return;

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto">
        <form onSubmit={handleSubmit(handleCheckout)}>
          <div className="flex items-start w-full gap-x-[74px]">
            <div className="flex-1">
              <h2 className="font-bold text-[30px] leading-normal mb-10">Checkout</h2>
              <FormRow>
                <FormGroup>
                  <Label>Họ và tên *</Label>
                  <Input control={control} name="shipName" placeholder="Nguyễn Văn A" />
                  {errors.shipName && <p className="text-sm text-red-500">{errors.shipName.message}</p>}
                </FormGroup>
                <FormGroup>
                  <Label>Địa chỉ *</Label>
                  <Input
                    control={control}
                    name="shipAddress"
                    placeholder="97 Man Thiện, Hiệp Phú, Thủ Đức, Hồ Chí Minh"
                  />
                  {errors.shipAddress && <p className="text-sm text-red-500">{errors.shipAddress.message}</p>}
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <Label>Ship Email *</Label>
                  <Input control={control} name="shipEmail" placeholder="John" />
                  {errors.shipEmail && <p className="text-sm text-red-500">{errors.shipEmail.message}</p>}
                </FormGroup>
                <FormGroup>
                  <Label>Số điện thoại *</Label>
                  <Input control={control} name="shipPhone" placeholder="+123 456 789" />
                  {errors.shipPhone && <p className="text-sm text-red-500">{errors.shipPhone.message}</p>}
                </FormGroup>
              </FormRow>
            </div>
            <div className="flex-1 max-w-[400px] ml-auto">
              <CartSummury title="Thành tiền" total={total()}>
                <Button type="submit" className="w-full text-white bg-primary">
                  Xác Nhận
                </Button>
              </CartSummury>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
