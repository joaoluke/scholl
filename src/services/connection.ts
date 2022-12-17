import axios from "axios";

export const API = axios.create({
  baseURL: "https://stark-badlands-19625.herokuapp.com/",
});
