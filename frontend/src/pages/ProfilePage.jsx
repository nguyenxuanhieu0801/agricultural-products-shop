import { Button } from 'components/button';
import FormGroup from 'components/common/FormGroup';
import FormRow from 'components/common/FormRow';
import { Input } from 'components/input';
import { Label } from 'components/label';
import Layout from 'layouts/Layout';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UploadService } from 'services/uploadService';
import ImageUpload from './ImageUpload';
import DatePicker from 'react-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import userService from 'services/userServices';
import moment from 'moment';
import { updateAuth } from 'redux/features/authSlice';
import { getToken } from 'utils/getToken';

const schema = yup
  .object({
    firstName: yup.string().required('Please enter your first name'),
    lastName: yup.string().required('Please enter your last name'),
    address: yup.string().required('Vui lòng nhập địa chỉ'),
    email: yup
      .string()
      .email('Invalid email address')
      .required('Please enter your email')
      .min(6, 'Email at least 3 characters'),
    phone: yup.string().length(10, 'Số điện thoại tối thiểu 10 số'),
  })
  .required();

const ProfilePage = ({}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    document.title = 'Profile';
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone || '',
      email: user.email,
      address: user.address || '',
    });
    if (user.birthDay) {
      const day = new Date(user.birthDay);
      setBirthDay(day);
    }
    if (user.image) setImage(user.image);
  }, [reset, user]);

  const handleUploadImage = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    const response = await UploadService.create(formData);
    if (response[0]?.url) {
      setImage(response[0]?.url);
    } else {
      setImage('');
    }
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleUploadImage(file);
  };

  const handleUpdate = async (values) => {
    if (!isValid) return;
    try {
      const formatDay = moment(new Date(birthDay)).format('YYYY-MM-DD');
      const token = getToken();
      const body = { ...values, birthDay: formatDay, image };
      const response = await userService.update(user.id, body, token);
      if (response) {
        dispatch(updateAuth(response));
        toast.success('Cập nhật thành công');
      }
    } catch (error) {
      toast.error('Cập nhật thất bại');
    }
  };

  return (
    <Layout>
      <div className="max-w-[1170px] mx-auto">
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="mb-10 text-center">
            <ImageUpload
              className="!w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
              onChange={handleSelectImage}
              image={image}
            />
          </div>
          <FormRow>
            <FormGroup>
              <Label>Tên</Label>
              <Input control={control} name="firstName" placeholder="Enter your firstName"></Input>
              {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
            </FormGroup>
            <FormGroup>
              <Label>Họ</Label>
              <Input control={control} name="lastName" placeholder="Enter your lastName"></Input>
              {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Date of Birth</Label>
              <DatePicker onChange={setBirthDay} value={birthDay} format="dd-MM-yyyy" />
            </FormGroup>
            <FormGroup>
              <Label>Số điện thoại</Label>
              <Input control={control} name="phone" placeholder="Nhập số điện thoại" />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <Label>Email</Label>
              <Input control={control} name="email" type="email" placeholder="Nhập email" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </FormGroup>
            <FormGroup>
              <Label>Địa chỉ</Label>
              <Input control={control} name="address" type="text" placeholder="Nhập địa chỉ" />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </FormGroup>
          </FormRow>
          <Button type="submit" kind="primary" className="mx-auto w-[200px]">
            Update
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
