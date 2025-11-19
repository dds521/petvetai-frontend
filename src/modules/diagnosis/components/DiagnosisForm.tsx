/**
 * 诊断表单组件
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pet, AlertCircle, Loader2 } from 'lucide-react';
import { useDiagnosis } from '../hooks/useDiagnosis';

export function DiagnosisForm() {
  const [symptom, setSymptom] = useState('');
  const [petId, setPetId] = useState(1);
  const { submitDiagnosis, isLoading, error, data, isSuccess, isError } = useDiagnosis();

  const handleSubmit = () => {
    if (!symptom.trim()) return;
    submitDiagnosis({ petId, symptomDesc: symptom });
  };

  return (
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
        <Button onClick={handleSubmit} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              分析中...
            </>
          ) : (
            '获取 AI 诊断'
          )}
        </Button>
        {isSuccess && data && (
          <div className="p-4 bg-green-100 rounded-lg space-y-2">
            <h3 className="font-semibold flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              AI 建议（仅供参考，请咨询专业兽医）
            </h3>
            <p className="text-sm">{data.suggestion}</p>
            <p className="text-xs text-gray-600">
              置信度: {(data.confidence * 100).toFixed(0)}%
            </p>
          </div>
        )}
        {isError && (
          <div className="p-4 bg-red-100 rounded-lg text-red-700 text-sm">
            错误: {error instanceof Error ? error.message : '诊断失败，请重试'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

