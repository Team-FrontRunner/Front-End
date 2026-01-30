import axios from 'axios';

const client = axios.create({
  baseURL: 'https://ultraistic-vicky-caustically.ngrok-free.dev', 
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420' 
  }
});

export default client;