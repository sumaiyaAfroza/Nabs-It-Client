import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://nabs-it-server.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;