/**
 * 应用常量
 */

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'PetVetAI',
  version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  env: process.env.NEXT_PUBLIC_ENV || 'development',
} as const;

/**
 * 路由常量
 */
export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  DIAGNOSIS: '/diagnosis',
} as const;

/**
 * 错误消息
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNKNOWN_ERROR: '未知错误，请联系管理员',
} as const;

