import axios from "axios";
import type { AxiosInstance } from "axios";
const newsApiClient: AxiosInstance = axios.create({
  baseURL: "https://newsdata.io/api/",
  headers: {
    "Content-type": "application/json",
  },
});
export default newsApiClient;
