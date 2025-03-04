import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const TIME = 1000 * 60 * 3;

class API {
  instance: AxiosInstance;
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

    console.log(this.baseUrl);

    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
    });

    this.setupinterceptor();
    this.refreshTokenOnRequest();
    this.refreshToken();
  }

  setupinterceptor = () => {
    this.instance.interceptors.request.use(async (config: any) => {
      const idToken = localStorage.getItem("idToken");
      if (idToken) {
        config.headers["Authorization"] = `Bearer ${idToken}`;
      }
      return config;
    });
  };

  refreshTokenOnRequest = () => {
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
              refreshToken,
            });

            const { IdToken } = response.data.AuthenticationResult;

            localStorage.setItem("tokenId", IdToken);

            originalRequest.headers.Authorization = `Bearer ${IdToken}`;
            return axios(originalRequest);
          } catch (error) {
            // Handle refresh token error or redirect to login
          }
        }

        return Promise.reject(error);
      }
    );
  };

  refreshToken = () => {
    setInterval(async () => {
      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { IdToken } = response.data.AuthenticationResult;

        localStorage.setItem("tokenId", IdToken);
      }
    }, TIME);
  };

  logUrl = () => {
    console.log(this.baseUrl);
  };

  get = async <REQ, RES = undefined>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<RES>> => {
    return await this.instance.get<REQ, AxiosResponse<RES>>(url, config);
  };

  post = async <REQ, RES = undefined>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<RES>> => {
    return await this.instance.post<REQ, AxiosResponse<RES>>(url, data, config);
  };

  put = async <REQ, RES = undefined>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<RES>> => {
    return await this.instance.put<REQ, AxiosResponse<RES>>(url, data, config);
  };

  patch = async <REQ, RES = undefined>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<RES>> => {
    return await this.instance.patch<REQ, AxiosResponse<RES>>(url, data, config);
  };

  delete = async <REQ, RES = undefined>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<AxiosResponse<RES>> => {
    return await this.instance.delete<REQ, AxiosResponse<RES>>(url, config);
  };
}

export const api = new API();
