import axios from "axios";
import apis from "./urls";

const http = axios.create({
  baseURL: apis.baseUrl,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default http;
