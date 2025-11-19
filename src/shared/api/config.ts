/**
 * API 配置
 * 统一管理 API 基础配置
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * API 端点配置
 */
export const API_ENDPOINTS = {
  // 宠物相关
  PET: {
    DIAGNOSE: '/api/pet/diagnose',
    LIST: '/api/pet/list',
    DETAIL: '/api/pet/:id',
  },
  // 健康相关
  HEALTH: {
    CHECK: '/actuator/health',
  },
} as const;

/**
 * 获取完整的 API URL
 */
export function getApiUrl(endpoint: string): string {
  return `${API_CONFIG.baseURL}${endpoint}`;
}

