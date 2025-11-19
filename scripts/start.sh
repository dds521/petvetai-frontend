#!/bin/bash

echo "=========================================="
echo "  PetVetAI Frontend 启动脚本"
echo "=========================================="
echo ""

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查 npm 是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到 npm，请先安装 npm"
    exit 1
fi

# 显示 Node.js 和 npm 版本
echo "📦 环境信息："
echo "   Node.js: $(node --version)"
echo "   npm: $(npm --version)"
echo ""

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "📥 安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败"
        exit 1
    fi
    echo ""
fi

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    if [ -f ".env.example" ]; then
        echo "📝 创建环境变量文件..."
        cp .env.example .env.local
        echo "✅ 已创建 .env.local，请根据需要修改配置"
        echo ""
    else
        echo "⚠️  警告: 未找到 .env.local 文件"
        echo "   请创建 .env.local 并设置 NEXT_PUBLIC_API_URL"
        echo ""
    fi
fi

# 检查后端服务是否运行（可选）
if command -v curl &> /dev/null; then
    API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:48080}
    if curl -s "${API_URL}/actuator/health" > /dev/null 2>&1; then
        echo "✅ 后端服务连接正常: ${API_URL}"
    else
        echo "⚠️  警告: 无法连接到后端服务: ${API_URL}"
        echo "   请确保后端服务已启动"
    fi
    echo ""
fi

echo "🚀 启动开发服务器..."
echo "   前端地址: http://localhost:3000"
echo "   后端 API: ${NEXT_PUBLIC_API_URL:-http://localhost:48080}"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

npm run dev

