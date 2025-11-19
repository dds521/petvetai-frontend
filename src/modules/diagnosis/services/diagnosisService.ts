/**
 * 诊断服务
 * 处理宠物症状诊断相关的 API 调用
 */

import { post } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/api/config';

export interface DiagnosisRequest {
  petId: number;
  symptomDesc: string;
}

export interface DiagnosisResponse {
  suggestion: string;
  confidence: number;
}

/**
 * 提交诊断请求
 */
export async function submitDiagnosis(
  request: DiagnosisRequest
): Promise<DiagnosisResponse> {
  return post<DiagnosisResponse>(
    API_ENDPOINTS.PET.DIAGNOSE,
    request
  );
}

