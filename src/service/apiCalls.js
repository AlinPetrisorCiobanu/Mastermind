import axios from "axios";

const URL_USER = "https://mastermind-backend.vercel.app/";

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

