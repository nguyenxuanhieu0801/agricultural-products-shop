import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DeliveryService } from 'services/deliveryServices';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên đơn vị vận chuyển').min(2, 'Tên sản phẩm tối thiểu 2 ký tự'),
  })
  .required();

const DeliveryAddNew = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    document.title = 'Unit Delivery';
  }, []);

  const handleAddNewDelivery = async (values) => {
    if (!isValid) return;

    try {
      const data = await DeliveryService.create(values);
      if (data) {
        toast.success('Create new delivery successfully');
      }
    } catch (error) {
      toast.error(error);
    } finally {
      reset({
        name: '',
      });
    }
  };
  return (
    <div>
      <h1 className="dashboard-heading">Add new delivery</h1>
      <form onSubmit={handleSubmit(handleAddNewDelivery)} autoComplete="off">
        <div className="form-layout">
          <FormGroup>
            <Label>Tên</Label>
            <Input control={control} name="name" placeholder="Nhập tên đơn vị vận chuyển" required />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </FormGroup>
        </div>
        <Button type="submit" className="w-[300px] bg-primary">
          Add
        </Button>
      </form>
    </div>
  );
};

export default DeliveryAddNew;
