import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/products/`;

const create = async (body, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const { data } = await axios.post(API_URL, body, config);
  return data;
};

const findById = async (id) => {
  const { data } = await axios.get(API_URL + `${id}`);
  return data;
};

const getAll = async (params) => {
  const config = {
    params,
  };
  const { data } = await axios.get(API_URL, config);
  return data;
};

const update = async (id, body, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const { data } = await axios.put(API_URL + `${id}`, body, config);
  return data;
};

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const { data } = await axios.delete(API_URL + `${id}`, config);
  return data;
};

export const ProductService = { create, findById, getAll, remove, update };
