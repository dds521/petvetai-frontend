// 新文件：TypeScript 类型定义
export interface Diagnosis {
  suggestion: string;
  confidence: number;
}

export interface DiagnosisRequest {
  petId: number;
  symptomDesc: string;
}
