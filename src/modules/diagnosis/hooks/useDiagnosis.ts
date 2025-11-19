/**
 * 诊断相关 Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitDiagnosis, DiagnosisRequest, DiagnosisResponse } from '../services/diagnosisService';

/**
 * 使用诊断功能
 */
export function useDiagnosis() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: DiagnosisRequest) => submitDiagnosis(request),
    onSuccess: () => {
      // 可以在这里添加成功后的操作，如刷新列表等
      queryClient.invalidateQueries({ queryKey: ['diagnosis'] });
    },
  });

  return {
    submitDiagnosis: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    reset: mutation.reset,
  };
}

