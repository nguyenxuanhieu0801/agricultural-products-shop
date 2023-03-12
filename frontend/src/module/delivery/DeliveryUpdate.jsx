import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DeliveryService } from 'services/deliveryServices';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên đơn vị vận chuyển').min(2, 'Tên sản phẩm tối thiểu 2 ký tự'),
  })
  .required();

const DeliveryUpdate = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Delivery Update';
    (async () => {
      const data = await DeliveryService.findById(id);
      reset({
        name: data.name,
      });
    })();
  }, [id, reset]);

  const handleUpdate = async (values) => {
    if (!isValid) return;
    try {
      const newValue = {
        ...values,
      };
      newValue.name = newValue.name.trim();
      const data = await DeliveryService.update(id, newValue);
      if (data) {
        toast.success('Cập nhật thành công');
      }
    } catch (error) {
      toast.error('Cập nhật thất bại');
    }
  };

  if (!id) return null;

  return (
    <div>
      <h1 className="dashboard-heading">Update delivery</h1>
      <form onSubmit={handleSubmit(handleUpdate)} autoComplete="off">
        <div className="form-layout">
          <FormGroup>
            <Label>Tên</Label>
            <Input control={control} name="name" placeholder="Nhập tên đơn vận chuyển" required />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </FormGroup>
        </div>
        <Button type="submit" className="w-[300px] bg-primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default DeliveryUpdate;
