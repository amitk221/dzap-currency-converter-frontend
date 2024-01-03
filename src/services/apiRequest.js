// services/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiRequest = async (url, method, requestData, params) => {
  try {
    const response = await instance({
      url,
      method,
      data: requestData,
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
