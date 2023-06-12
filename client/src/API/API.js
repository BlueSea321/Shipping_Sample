import axios from "axios";

const {
    BASIC_SERVER_URL
} = require('../config')

console.log('axios', localStorage.getItem("transport_token"))

export const API = axios.create({
  baseURL: BASIC_SERVER_URL,
  headers: {
    "x-access-token": localStorage.getItem("transport_token") || "",
  },
});
