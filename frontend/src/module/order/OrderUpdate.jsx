import { Button } from 'components/button';
import FormRow from 'components/common/FormRow';
import { Dropdown } from 'components/dropdown';
import { Field, FieldCheckboxes } from 'components/field';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Radio } from 'components/radio';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeliveryService } from 'services/deliveryServices';
import { OrderService } from 'services/orderServices';
import { orderStatus } from 'utils/constants';
import { getToken } from 'utils/getToken';

const OrderUpdate = () => {
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      shipName: '',
      shipEmail: '',
      shipPhone: '',
      shipAddress: '',
      status: 0,
    },
  });
  let { id } = useParams();
  const [selectDelivery, setSelectDelivery] = useState(1);
  const [delivery, setDelivery] = useState([]);

  const navigate = useNavigate();
  const watchStatus = watch('status');

  useEffect(() => {
    document.title = 'Order Update';

    (async () => {
      const list = await DeliveryService.getAll();
      setDelivery(list);

      const token = getToken();
      const data = await OrderService.findById(id, token);
      reset({
        shipName: data.shipName,
        shipEmail: data.shipEmail,
        shipPhone: data.shipPhone,
        shipAddress: data.shipAddress,
        status: data.status,
        deliveryId: data?.deliveryId,
      });

      if (data.deliveryId) {
        const delivery = await DeliveryService.findById(data.deliveryId);
        setSelectDelivery(delivery);
      }
    })();
  }, [id, reset]);

  const handleUpdate = async (values) => {
    if (!isValid) return;
    try {
      const token = getToken();
      let body = {
        ...values,
      };
      body.status = Number(body.status);
      const data = await OrderService.update(id, body, token);
      if (data) {
        toast.success('Update order successfully');
        navigate('/manage/order');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickDelivery = async (item) => {
    setValue('deliveryId', item.id);
    setSelectDelivery(item);
  };

  if (!id) return null;

  return (
    <div>
      <h1 className="dashboard-heading">Update order</h1>
      <form onSubmit={handleSubmit(handleUpdate)} autoComplete="off">
        <FormRow>
          <FormGroup>
            <Label>Họ và tên</Label>
            <Input control={control} name="shipName" placeholder="Enter your ship name" disabled />
          </FormGroup>
          <FormGroup>
            <Label>Địa chị</Label>
            <Input control={control} name="shipAddress" placeholder="Enter your ship name" disabled />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Ship Email</Label>
            <Input control={control} name="shipEmail" placeholder="Enter your ship name" disabled />
          </FormGroup>
          <FormGroup>
            <Label>Số điện thoại</Label>
            <Input control={control} name="shipPhone" placeholder="Enter your ship name" disabled />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Đơn vị</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Chọn đơn vị"></Dropdown.Select>
              <Dropdown.List>
                {delivery.length > 0 &&
                  delivery.map((item) => (
                    <Dropdown.Option key={item.id} onClick={() => handleClickDelivery(item)}>
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectDelivery?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectDelivery?.name}
              </span>
            )}
            {errors.unitId && <p className="text-sm text-red-500">{errors.unitId.message}</p>}
          </FormGroup>
        </FormRow>
        <Field>
          <Label>Trạng thái</Label>
          <FieldCheckboxes>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === orderStatus.AWAIT}
              value={orderStatus.AWAIT}
            >
              Đang xử lý
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === orderStatus.DELIVERY}
              value={orderStatus.DELIVERY}
            >
              Đang vận chuyển
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === orderStatus.COMPLETE}
              value={orderStatus.COMPLETE}
            >
              Giao hàng thành công
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === orderStatus.CANCEL}
              value={orderStatus.CANCEL}
            >
              Hủy
            </Radio>
          </FieldCheckboxes>
        </Field>
        <Button type="submit" className="w-[300px] bg-primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default OrderUpdate;
