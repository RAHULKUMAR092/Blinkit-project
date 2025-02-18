import axios from "axios";
import SummaryApi, { baseURl } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL: baseURl,
  withCredentials: true,
});

// sending access token in the header
Axios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// extend the life span of access token with help of refresh token
Axios.interceptors.request.use(
  (Response) => {
    return Response;
  },
  async (error) => {
    let originRequest = error.config;
    if (error.response.status === 401 && !originRequest.retry) {
      originRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const newassessToken = await refreshAccessToken(refreshToken);
        if (newassessToken) {
          originRequest.headers.Authorization = `Bearer ${newassessToken}`;
          return Axios(originRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await Axios({
      ...SummaryApi.refreshToken,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const accessToken = response.data.data.accessToken;
    localStorage.setItem("accesstoken", accessToken);
    return accessToken;
  } catch (error) {}
};

export default Axios;
