import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reset } from 'redux/features/authSlice';

const SignOutPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reset());
    localStorage.clear();
    window.location = '/';
  }, [dispatch]);

  return <div className=""></div>;
};

export default SignOutPage;
