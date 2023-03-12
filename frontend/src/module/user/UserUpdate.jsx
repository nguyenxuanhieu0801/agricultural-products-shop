import { Button } from 'components/button';
import FormRow from 'components/common/FormRow';
import { Dropdown } from 'components/dropdown';
import { Field, FieldCheckboxes } from 'components/field';
import { FormGroup } from 'components/form-group';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { Radio } from 'components/radio';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateProduct } from 'redux/features/productSlice';
import { CategoryService } from 'services/categoryServices';
import { ProductService } from 'services/productServices';
import userService from 'services/userServices';
import { MAX_LENGTH, MIN_NUMBER, userRole } from 'utils/constants';
import { getToken } from 'utils/getToken';

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {},
  });
  const watchRole = watch('roleId');
  const [birthDay, setBirthDay] = useState('');

  let { id } = useParams();

  useEffect(() => {
    document.title = 'Product Update';
    (async () => {
      const token = getToken();
      const user = await userService.findById(id, token);

      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
        email: user.email,
        address: user.address,
        roleId: user.roleId,
      });
      if (user.birthDay) {
        const day = new Date(user.birthDay);
        setBirthDay(day);
      }
    })();
  }, [id, reset]);

  const handleUpdateUser = async (values) => {
    try {
      const formatDay = moment(new Date(birthDay)).format('YYYY-MM-DD');

      const body = { ...values, birthDay: formatDay };
      const token = getToken();
      const response = await userService.update(id, body, token);
      if (response) {
        toast.success('Cập nhật thành công');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mr-2">
      <h1 className="dashboard-heading">Update user</h1>
      <form onSubmit={handleSubmit(handleUpdateUser)} autoComplete="off">
        <FormRow>
          <FormGroup>
            <Label>First Name</Label>
            <Input control={control} name="firstName" placeholder="Enter your firstName"></Input>
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input control={control} name="lastName" placeholder="Enter your lastName" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Date of Birth</Label>
            <DatePicker onChange={setBirthDay} value={birthDay} format="dd-MM-yyyy" />
          </FormGroup>
          <FormGroup>
            <Label>Mobile Number</Label>
            <Input control={control} name="phone" placeholder="Nhập số điện thoại" />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Email</Label>
            <Input control={control} name="email" type="email" placeholder="Nhập email" />
          </FormGroup>
          <FormGroup>
            <Label>Địa chỉ</Label>
            <Input control={control} name="address" placeholder="Nhập địa chỉ" />
          </FormGroup>
        </FormRow>
        <Field>
          <Label>Quyền</Label>
          <FieldCheckboxes>
            <Radio
              name="status"
              control={control}
              checked={Number(watchRole) === userRole.ADMIN}
              value={userRole.AWAIT}
            >
              ADMIN
            </Radio>
            <Radio name="status" control={control} checked={Number(watchRole) === userRole.USER} value={userRole.ADMIN}>
              USER
            </Radio>
          </FieldCheckboxes>
        </Field>

        <Button type="submit" className="w-[300px] bg-primary">
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
