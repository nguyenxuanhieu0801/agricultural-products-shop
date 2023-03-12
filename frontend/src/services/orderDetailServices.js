import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/ordersDeatail/`;

const create = async (body, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const { data } = await axios.post(API_URL, body, config);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

const getAll = async (token, params) => {
  const config = {
    params,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const { data } = await axios.get(API_URL, config, token);
  return data;
};

const findById = async (id) => {
  try {
    const { data } = await axios.get(API_URL + `${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const OrderDetailService = { create, getAll, findById };
