import type { AxiosRequestConfig as _AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface BaseDTO {
  id: number;
}

interface BasePriority extends BaseDTO {
  priority: number;
}

type AxiosRequestConfig = Omit<
  _AxiosRequestConfig,
  'url' | 'baseURL' | 'method'
>;

// TODO: いい感じの管理方法を考える
const BASE_URL = 'http://localhost:8000';

const axiosRequest = <T = unknown>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  config: AxiosRequestConfig = {}
) => {
  const conf: _AxiosRequestConfig = {
    baseURL: `${BASE_URL}`,
    url: `/api/${endpoint}`,
    method,
    ...config,
  };

  return axios<T>(conf);
};

const getRequest = async <T = unknown>(
  endpoint: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return await axiosRequest<T>(endpoint, 'GET', config).then((res) => res.data);
};

const postRequest = async <T>(
  endpoint: string,
  data: T,
  config: AxiosRequestConfig = {}
) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return await axiosRequest(endpoint, 'POST', { data, headers, ...config });
};

const deleteRequest = async (
  endpoint: string,
  config: AxiosRequestConfig = {}
) => await axiosRequest(endpoint, 'DELETE', config);

const patchRequest = async <T>(
  endpoint: string,
  data: T,
  config: AxiosRequestConfig = {}
) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  return await axiosRequest(endpoint, 'PATCH', { data, headers, ...config });
};

export { deleteRequest, getRequest, patchRequest, postRequest };
export type { BaseDTO, BasePriority };
