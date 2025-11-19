/**
 * 诊断模块类型定义
 */

export interface Diagnosis {
  suggestion: string;
  confidence: number;
}

export interface DiagnosisRequest {
  petId: number;
  symptomDesc: string;
}

export interface DiagnosisResponse {
  suggestion: string;
  confidence: number;
}

