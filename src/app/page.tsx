import Link from 'next/link';
import { Pet } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <Pet className="h-16 w-16 text-green-600 mx-auto" />
        <h1 className="text-4xl font-bold text-gray-800">欢迎使用 PetVetAI</h1>
        <p className="text-lg text-gray-600">您的 AI 宠物医疗助手，提供智能症状分析和健康建议。</p>
        <Link
          href="/chat"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          开始咨询
        </Link>
        <p className="text-sm text-gray-500 mt-4">仅供参考，请咨询专业兽医。</p>
      </div>
    </div>
  );
}
