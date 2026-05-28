import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export const API_ORIGIN = "http://localhost:3000";

export const BASE_URL = `${API_ORIGIN}/api/v1`;

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;
export type ErrorType<Error> = AxiosError<Error>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];
