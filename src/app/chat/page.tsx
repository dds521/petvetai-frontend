/**
 * 聊天/诊断页面
 * 使用模块化组件
 */
'use client';

import { DiagnosisForm } from '@/modules/diagnosis/components/DiagnosisForm';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <DiagnosisForm />
    </div>
  );
}
