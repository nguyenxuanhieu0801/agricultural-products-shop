import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/unit/`;

const getAll = async (params) => {
  const config = {
    params,
  };
  const { data } = await axios.get(API_URL, config);
  return data;
};

const create = async (body) => {
  const { data } = await axios.post(API_URL, body);
  return data;
};

const update = async (id, body) => {
  const { data } = await axios.put(API_URL + `${id}`, body);
  return data;
};

const findById = async (id) => {
  const { data } = await axios.get(API_URL + `${id}`);
  return data;
};

export const UnitService = { getAll, findById, create, update };
