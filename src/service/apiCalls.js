import axios from "axios";

// const URL_USER = "https://mastermind-backend.vercel.app/";
const URL_USER = "http://localhost:3000/";

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

//users register
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

//users delete
export const deleteUser = (token ,id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .delete(`${URL_USER}delete_user/${id}`, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};


//extraer datos del usuario de la base de datos
export const modifyUser = (token , id , data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .put(`${URL_USER}modify_user/${id}`,data , config )
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error;
    });
};
