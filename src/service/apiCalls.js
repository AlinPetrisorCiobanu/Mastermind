import axios from "axios";

const URL_USER = "https://mastermind-backend.vercel.app/";
// const URL_USER = "http://localhost:3000/";

//users login
export const login = (data) => {
  return axios
    .post(`${URL_USER}login`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

//users login
export const register = (data) => {
  return axios
    .post(`${URL_USER}register`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

