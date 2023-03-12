import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/cart/`;

const findOne = async (token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const { data } = await axios.get(API_URL, config);
  return data;
};

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
    console.log(error);
  }
};


const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await axios.delete(API_URL + `${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const CartService = { findOne, create, remove };
