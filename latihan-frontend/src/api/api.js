import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // sesuaikan dengan backend kamu
});

export default api;
