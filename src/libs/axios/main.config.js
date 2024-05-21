import axios from "axios";

const axiosConfigured = axios.create({
  baseURL: "https://9aef42jn9p95jrpq.mock.apigit.com/",
  headers: {
    Accept: "application/json"
  }
});

export default axiosConfigured;
