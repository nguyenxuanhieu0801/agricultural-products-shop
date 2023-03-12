import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/users/`;

const getAll = async (params) => {
  const config = {
    params,
  };

  const { data } = await axios.get(API_URL, config);
  return data;
};

const findById = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const { data } = await axios.get(API_URL + `${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getListOrderOfUser = async (id, token, params) => {
  try {
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const { data } = await axios.get(API_URL + `${id}` + '/orders', config);
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
  const { data } = await axios.put(API_URL + `${id}`, body, config);
  return data;
  // try {
  //   const { data } = await axios.put(API_URL + `${id}`, body, config);
  //   return data;
  // } catch (error) {
  //   toast.error(error?.response?.message);
  // }
};

const userService = {
  update,
  getAll,
  findById,
  getListOrderOfUser,
};

export default userService;
