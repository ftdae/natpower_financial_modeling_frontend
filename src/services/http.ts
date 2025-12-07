import axios from "axios";
const http = axios.create({
  baseURL: "https://financialmodellingapi.azurewebsites.net",
  // baseURL: "https://financialmodellingapi.azurewebsites.net",
  // https://financialmodellingapi-stg.azurewebsites.net,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
// REACT_APP_API=https://financialmodellingapi.azurewebsites.net
// http://localhost:8000
// https://financialmodellingapi-stg.azurewebsites.net
