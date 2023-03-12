import axios from 'axios';
import { PORT } from 'utils/constants';

const API_URL = `http://localhost:${PORT}/upload/`;

const create = async (formData) => {
  const config = {
    headers: {
      // Authorization: 'Bearer ' + token,
      'content-type': 'multipart/form-data',
    },
  };
  const { data } = await axios.post(API_URL, formData, config);
  return data;

  // try {
  //   const { data } = await axios.post(
  //     `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
  //     formData,
  //     {
  //       headers: {
  //         Auhorization: `Bearer ${token}`,
  //         "content-type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   return data;
  // } catch (error) {
  //   return error.response.data.message;
  // }
};

export const UploadService = { create };
