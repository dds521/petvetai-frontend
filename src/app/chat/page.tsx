// 新文件：chat 页面
'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pet, AlertCircle, Loader2 } from 'lucide-react';
import { Diagnosis } from '@/types';  // 假设 types.ts 定义

interface DiagnosisRequest {
  petId: number;
  symptomDesc: string;
}

interface DiagnosisResponse {
  suggestion: string;
  confidence: number;
}

export default function ChatPage() {
  const [symptom, setSymptom] = useState('');
  const [petId, setPetId] = useState(1);  // 示例：假设用户有宠物 ID
  const [diagnosis, setDiagnosis] = useState<DiagnosisResponse | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (request: DiagnosisRequest) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pet/diagnose`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (!res.ok) {
        throw new Error('诊断请求失败');
      }
      return res.json() as Promise<DiagnosisResponse>;
    },
    onSuccess: (data) => {
      setDiagnosis(data);
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
    onError: (error) => {
      console.error('AI 诊断错误:', error);
      alert('诊断失败，请重试');
    },
  });

  const handleSubmit = () => {
    if (!symptom.trim()) return;
    mutation.mutate({ petId, symptomDesc: symptom });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Pet className="h-8 w-8 text-green-600" />
            PetVetAI 症状咨询
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            placeholder="宠物 ID (示例: 1)"
            value={petId}
            onChange={(e) => setPetId(Number(e.target.value))}
            className="w-full"
          />
          <Input
            placeholder="描述宠物症状，例如：'狗狗咳嗽、食欲不振'"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleSubmit} className="w-full" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              '获取 AI 诊断'
            )}
          </Button>
          {diagnosis && (
            <div className="p-4 bg-green-100 rounded-lg space-y-2">
              <h3 className="font-semibold flex items-center gap-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                AI 建议（仅供参考，请咨询专业兽医）
              </h3>
              <p className="text-sm">{diagnosis.suggestion}</p>
              <p className="text-xs text-gray-600">置信度: {(diagnosis.confidence * 100).toFixed(0)}%</p>
            </div>
          )}
          {mutation.isError && (
            <div className="p-4 bg-red-100 rounded-lg text-red-700 text-sm">
              错误: {mutation.error?.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
