import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

export const register = (body) => {
  const URL = HOST + "/users/register/";
  return axios.post(URL, body);
};

export const login = (body) => {
  const URL = HOST + "/users/login/ ";
  return axios.post(URL, body);
};

export const logout = (token) => {
  const URL = HOST + "/users/logout/";
  return axios.delete(URL, {
    headers: { "x-access-token": token },
  });
};

export const getProfile = (token) => {
  const URL = HOST + "/users/";
  return axios.get(URL, {
    headers: { "x-access-token": token },
  });
};

export const getData = () => {
  const URL =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean";
    return axios.get(URL);
};
