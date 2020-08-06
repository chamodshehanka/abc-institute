import { AxiosInstance } from "axios";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function addResponseIntecepter(instance: AxiosInstance) {
  instance.interceptors.response.use(
    function onValidResponse(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // logTime(response);
      return response;
    },
    async function onError(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response) {
        //   logTime(error.response);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { data } = error.response;
        // const displayMsg = (data && data.message) || "Something went wrong!";
        // const errorCode = (data && data.errorCode) || "ERR_RESPONSE";
        //   throw new PXAPIError(displayMsg, "ERR_RESPONSE", error, errorCode);

        console.error(data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //   logRequestInfo(error.request);
        //   throw new PXAPIError("Network error!", "NETWORK_ERROR", error);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        //   throw new PXAPIError("Something went wrong!", "ERR_RESPONSE", error);
      }
    }
  );
}