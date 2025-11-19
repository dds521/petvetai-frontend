#!/bin/bash

# PetVetAI Frontend 构建脚本
# 支持多环境构建和压缩

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取环境参数
ENV=${1:-dev}

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}  PetVetAI Frontend 构建脚本${NC}"
echo -e "${BLUE}===========================================${NC}"
echo ""

# 验证环境参数
if [[ ! "$ENV" =~ ^(dev|test|uat|prod)$ ]]; then
    echo -e "${RED}❌ 错误: 无效的环境参数: $ENV${NC}"
    echo "用法: $0 [dev|test|uat|prod]"
    exit 1
fi

echo -e "${BLUE}📦 构建环境: ${ENV}${NC}"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 错误: 未找到 Node.js${NC}"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 错误: 未找到 npm${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js: $(node --version)${NC}"
echo -e "${GREEN}✅ npm: $(npm --version)${NC}"
echo ""

# 安装依赖
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 安装依赖...${NC}"
    npm install
    echo ""
fi

# 清理旧的构建
echo -e "${BLUE}🧹 清理旧的构建文件...${NC}"
rm -rf .next
rm -rf out
rm -rf dist
echo ""

# 构建
echo -e "${BLUE}🔨 开始构建...${NC}"
case $ENV in
    dev)
        npm run build:dev
        ;;
    test)
        npm run build:test
        ;;
    uat)
        npm run build:uat
        ;;
    prod)
        npm run build:prod
        ;;
esac

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ 构建完成${NC}"
echo ""

# 压缩构建产物（如果安装了压缩工具）
if command -v gzip &> /dev/null; then
    echo -e "${BLUE}🗜️  压缩构建产物...${NC}"
    
    # 压缩 JavaScript 文件
    find .next -type f -name "*.js" -exec gzip -k -9 {} \;
    
    # 压缩 CSS 文件
    find .next -type f -name "*.css" -exec gzip -k -9 {} \;
    
    echo -e "${GREEN}✅ 压缩完成${NC}"
    echo ""
fi

# 显示构建信息
echo -e "${BLUE}📊 构建信息:${NC}"
echo "  环境: $ENV"
echo "  输出目录: .next"
if [ -d ".next" ]; then
    echo "  构建大小: $(du -sh .next | cut -f1)"
fi
echo ""

echo -e "${GREEN}✅ 构建流程完成！${NC}"
echo ""
echo -e "${YELLOW}下一步:${NC}"
echo "  1. 将 .next 目录部署到服务器"
echo "  2. 配置 Nginx 指向构建产物"
echo "  3. 启动 Next.js 服务或使用 Nginx 代理"
echo ""

