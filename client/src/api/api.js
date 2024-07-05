// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3001",
// });

// let refresh = false;
// api.interceptors.response.use(
//   (resp) => {
//     console.log(resp);
//     return resp;
//   },
//   async (error) => {
//     try {
//       console.log("hello world");

//       if (error.response.status === 401 && !refresh) {
//         refresh = true;
//         const response = await api.post(
//           "/refresh",
//           {},
//           { withCredentials: true }
//         );
//         console.log(response.data);
//         if (response.status === 200) {
//           api.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${response.data.accessToken}`;

//           return axios.request(error.config);
//         }
//       }
//     } catch (refreshError) {
//       console.error("Token refresh failed", refreshError);
//     }

//     refresh = false;
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

let refresh = false;

api.interceptors.response.use(
  (resp) => {
    // Handle successful responses
    console.log("Response received:", resp);
    return resp;
  },
  async (error) => {
    try {
      console.log("Error occurred:", error);

      if (error.response && error.response.status === 401 && !refresh) {
        console.log(
          "401 Unauthorized error detected, attempting token refresh..."
        );

        refresh = true;

        // Perform token refresh request
        const response = await api.post(
          "/refresh",
          {},
          { withCredentials: true }
        );

        console.log("Refresh response:", response.data);

        if (response.status === 200) {
          // Update Authorization header with new access token
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;

          // Retry the original request
          console.log("Retrying original request...");
          return axios.request(error.config);
        }
      }
    } catch (refreshError) {
      console.error("Token refresh failed", refreshError);
    } finally {
      refresh = false; // Reset refresh flag
    }

    // If refresh fails or if not a 401 error, reject the promise with the original error
    return Promise.reject(error);
  }
);

export default api;
