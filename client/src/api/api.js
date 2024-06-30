import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
});

let refresh = false;
api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await api.post(
        "/refresh",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;

        return axios.request(error.config);
      }
    }
    refresh = false;
    return error;
  }
);

export default api;
