#!/bin/bash

echo "=========================================="
echo "  PetVetAI Frontend 启动脚本"
echo "=========================================="
echo ""

# 加载 nvm（如果存在）
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 如果存在 .nvmrc 文件，自动切换 Node.js 版本
if [ -f ".nvmrc" ]; then
    echo "📌 检测到 .nvmrc 文件，切换 Node.js 版本..."
    nvm use
    if [ $? -ne 0 ]; then
        echo "⚠️  警告: 无法切换到 .nvmrc 指定的版本，使用当前版本"
    fi
    echo ""
fi

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

# 检查并关闭占用 3000 端口的进程
PORT=3000
PIDS=$(lsof -ti:${PORT} 2>/dev/null)

if [ ! -z "$PIDS" ]; then
    echo "🔍 检测到端口 ${PORT} 被占用"
    echo "   占用进程 PID: $(echo $PIDS | tr '\n' ' ')"
    echo "🛑 正在关闭占用端口的进程..."
    
    # 处理所有占用端口的进程
    for PID in $PIDS; do
        # 尝试优雅关闭
        kill $PID 2>/dev/null
    done
    
    # 等待进程关闭
    sleep 2
    
    # 检查是否还有进程在运行，强制终止
    REMAINING_PIDS=$(lsof -ti:${PORT} 2>/dev/null)
    if [ ! -z "$REMAINING_PIDS" ]; then
        echo "⚠️  部分进程未正常关闭，强制终止..."
        for PID in $REMAINING_PIDS; do
            kill -9 $PID 2>/dev/null
        done
        sleep 1
    fi
    
    # 再次检查端口是否已释放
    FINAL_PIDS=$(lsof -ti:${PORT} 2>/dev/null)
    if [ ! -z "$FINAL_PIDS" ]; then
        echo "❌ 错误: 无法释放端口 ${PORT}"
        echo "   仍有进程占用: $(echo $FINAL_PIDS | tr '\n' ' ')"
        echo "   请手动检查: lsof -i:${PORT}"
        exit 1
    else
        echo "✅ 端口 ${PORT} 已释放"
        echo ""
    fi
else
    echo "✅ 端口 ${PORT} 可用"
    echo ""
fi

echo "🚀 启动开发服务器..."
echo "   前端地址: http://localhost:3000"
echo "   后端 API: ${NEXT_PUBLIC_API_URL:-http://localhost:48080}"
echo ""
echo "按 Ctrl+C 停止服务"
echo ""

npm run dev

