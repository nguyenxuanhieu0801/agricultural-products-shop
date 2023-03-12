import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/auth/`;

const register = async (data) => {
  const response = await axios.post(API_URL + 'register', data);
  return response.data;
};

const login = async (data) => {
  const response = await axios.post(API_URL + 'login', data);
  return response.data;
};

const resetPassword = async (data) => {
  const response = await axios.post(API_URL + 'reset-password', data);
  return response.data;
};

const authService = {
  register,
  login,
  resetPassword,
};

export default authService;
