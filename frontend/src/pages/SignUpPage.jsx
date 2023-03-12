import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import { FormGroup } from 'components/form-group';
import { IconEyeToggle } from 'components/icons';
import { Input } from 'components/input';
import { Label } from 'components/label';
import useToggleValue from 'hooks/useToggleValue';
import LayoutAuthentication from 'layouts/LayoutAuthentication';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from 'redux/features/authSlice';
import * as yup from 'yup';

const schema = yup
  .object({
    firstName: yup.string().required('Vui lòng nhập tên'),
    lastName: yup.string().required('Vui lòng nhập họ'),
    email: yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập password').min(6, 'Password cần tối thiểu 6 ký tự'),
  })
  .required();

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();

  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      const resultAction = await dispatch(register(values)).unwrap();
      if (resultAction) {
        navigate('/');
      }

      toast.success('Create new account successfully');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <LayoutAuthentication heading="Sign Up">
      <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
        Bạn đã có tài khoản?{' '}
        <Link to="/sign-in" className="font-medium underline text-primary">
          Đăng nhập
        </Link>
      </p>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormGroup>
          <Label htmlFor="firstName">Tên *</Label>
          <Input control={control} name="firstName" placeholder="A" error={errors.firstName?.message} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Họ *</Label>
          <Input control={control} name="lastName" placeholder="Nguyễn Văn" error={errors.lastName?.message} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input
            control={control}
            type="email"
            name="email"
            placeholder="example@gmail.com"
            error={errors.email?.message}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="Nhập mật khẩu"
            error={errors.password?.message}
          >
            <IconEyeToggle open={showPassword} onClick={handleTogglePassword}></IconEyeToggle>
          </Input>
        </FormGroup>
        <Button type="submit" className="w-full" kind="primary">
          Tạo tài khoản
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default SignUpPage;
