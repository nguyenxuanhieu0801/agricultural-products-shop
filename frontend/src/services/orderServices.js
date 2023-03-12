import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/orders/`;

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
  const { data } = await axios.get(API_URL, config);
  return data;
};

const report = async (token, startDate, endDate) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const { data } = await axios.get(API_URL + `report/${startDate}/${endDate}`, config);
  return data;
};

const getAllOrdersToday = async (token, params) => {
  const config = {
    params,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const { data } = await axios.get(API_URL + 'today', config);
  return data;
};

const getListOrderDetail = async (id, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const { data } = await axios.get(API_URL + 'listOrderDetail/' + `${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const findById = async (id, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await axios.get(API_URL + `${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, body, token) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  try {
    const { data } = await axios.put(API_URL + `${id}`, body, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const OrderService = { create, getAll, findById, getListOrderDetail, update, getAllOrdersToday, report };
