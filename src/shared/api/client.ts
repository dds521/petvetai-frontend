/**
 * API 客户端
 * 封装 fetch 请求，统一处理错误和响应
 */

import { API_CONFIG, getApiUrl } from './config';

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  code?: number;
}

export interface ApiError {
  message: string;
  code?: number;
  status?: number;
}

/**
 * 创建 API 请求
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  
  const config: RequestInit = {
    ...API_CONFIG.headers,
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error: ApiError = {
        message: `请求失败: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw {
        message: error.message,
      } as ApiError;
    }
    throw error;
  }
}

/**
 * GET 请求
 */
export function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'GET',
  });
}

/**
 * POST 请求
 */
export function post<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT 请求
 */
export function put<T>(
  endpoint: string,
  data?: any,
  options?: RequestInit
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE 请求
 */
export function del<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'DELETE',
  });
}

