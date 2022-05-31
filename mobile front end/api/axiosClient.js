// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
export const REACT_APP_API_URL = "http://192.168.1.10:7000";

const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
    'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
  return response.data;
  }
  return response;
  }, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient;