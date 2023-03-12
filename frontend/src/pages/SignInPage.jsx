import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'components/button';
import ErrorComponent from 'components/common/ErrorComponent';
import FormGroup from 'components/common/FormGroup';
import { IconEyeToggle } from 'components/icons';
import { Input } from 'components/input';
import { Label } from 'components/label';
import { LoadingSpinner } from 'components/loading';
import useToggleValue from 'hooks/useToggleValue';
import LayoutAuthentication from 'layouts/LayoutAuthentication';
import { useEffect } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from 'redux/features/authSlice';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email('Email không hợp lê').required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập password').min(6, 'Password tối thiểu 6 ký tự'),
  })
  .required();

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value: showPassword, handleToggleValue: handleTogglePassword } = useToggleValue();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate('/');
    document.title = 'Sign In';
    reset({
      email: '',
      password: '',
    });
  }, [navigate, user]);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      const resultAction = await dispatch(login(values)).unwrap();
      if (resultAction) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Đăng nhập thất bại');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-9999">
        <LoadingSpinner className="w-[120px] h-[120px] border-[16px]" />
      </div>
    );
  }

  return (
    <LayoutAuthentication heading="Welcome back!">
      <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
        Bạn chưa có tài khoản?{' '}
        <Link to="/sign-up" className="font-medium underline text-primary">
          Đăng ký
        </Link>
      </p>
      <form onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
        <FormGroup>
          <Label htmlFor="email">Email *</Label>
          <Input control={control} type="email" name="email" placeholder="example@gmail.com" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password *</Label>
          <Input
            control={control}
            name="password"
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="Nhập mật khẩu"
          >
            <IconEyeToggle open={showPassword} onClick={handleTogglePassword}></IconEyeToggle>
          </Input>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </FormGroup>
        <FormGroup>
          <Link to="/forgot-password">
            <div className="text-right">
              <span className="inline-block text-sm font-medium text-primary">Forgot password</span>
            </div>
          </Link>
        </FormGroup>
        <Button type="submit" className="w-full" kind="primary">
          Đăng nhập
        </Button>
      </form>
    </LayoutAuthentication>
  );
};

export default withErrorBoundary(SignInPage, {
  FallbackComponent: ErrorComponent,
});
