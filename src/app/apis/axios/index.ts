import Axios from "axios";
import { BASE_URL } from "../../env";
import { getItemFromLocal } from "../../utils/local-storage";



export const baseURL = BASE_URL;

const axios = Axios.create({ baseURL });

axios.interceptors.request.use(
  (config: any) => {
    const token = getItemFromLocal("token");
    // console.log(token)
    if (token) {
      config.headers = { ...config.headers, authorization: `BEARER ${token}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// function deleteSession() {
//   const event = new Event("forceLogout");
//   window.dispatchEvent(event);
// }
// interface RefreshResponseData {
//   token: string;
//   refreshToken: string;
// }

// TODO: Create a proper intercept for refreshToken. Can be enabled for modification later.
// axios.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     // if (!originalConfig) return;
//     const originalConfig = err.config;
//     if (
//       originalConfig.url !== "auth/refresh-login" &&
//       originalConfig.url !== "auth/login" &&
//       originalConfig.url !== "auth/verify-otp" &&
//       err.response
//     ) {
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const refreshToken = getItemFromLocal("refreshToken");
//           if (refreshToken) {
//             const { data } = await Axios.get<RefreshResponseData>(
//               `${baseURL}auth/refresh-login`,
//               {
//                 headers: {
//                   Authorization: `BEARER ${refreshToken}`,
//                 },
//               }
//             );
//             // console.log({ refreshToken });
//             setItemInLocal("token", data.token);
//             setItemInLocal("refreshToken", data.refreshToken);
//             return axios(originalConfig);
//           }
//           deleteSession();
//         } catch (_error) {
//           deleteSession();
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(err);
//   }
// );

export default axios;
