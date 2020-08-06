import axios from "axios";
import { addAuthIntecepter } from "./authIntecepter";
import { addResponseIntecepter } from "./responseIntecepter";

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});

addAuthIntecepter(apiInstance);
addResponseIntecepter(apiInstance);

apiInstance.interceptors.request.use(
  async function (config) {
    // config.baseURL = ConfigService.API.MAIN;
    config.baseURL =
      "https://github3olabsbodimak-api-6wpxwvhtpq-uc.a.run.app/api/v1";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { apiInstance };