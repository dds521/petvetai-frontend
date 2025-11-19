#!/bin/bash

# PetVetAI Frontend 部署脚本
# 用于将构建产物部署到 Nginx

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 配置
ENV=${1:-prod}
DEPLOY_DIR=${2:-/usr/share/nginx/html/petvetai-frontend}
NGINX_CONF_DIR=${3:-/etc/nginx/conf.d}

echo -e "${BLUE}===========================================${NC}"
echo -e "${BLUE}  PetVetAI Frontend 部署脚本${NC}"
echo -e "${BLUE}===========================================${NC}"
echo ""

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then
    echo -e "${YELLOW}⚠️  警告: 需要 root 权限进行部署${NC}"
    echo "请使用: sudo $0 $ENV $DEPLOY_DIR $NGINX_CONF_DIR"
    exit 1
fi

# 检查构建产物
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ 错误: 未找到构建产物 .next 目录${NC}"
    echo "请先运行构建脚本: ./scripts/build.sh $ENV"
    exit 1
fi

echo -e "${BLUE}📦 部署环境: ${ENV}${NC}"
echo -e "${BLUE}📁 部署目录: ${DEPLOY_DIR}${NC}"
echo ""

# 创建部署目录
echo -e "${BLUE}📁 创建部署目录...${NC}"
mkdir -p "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/.next"
echo ""

# 备份旧版本
if [ -d "$DEPLOY_DIR/.next" ]; then
    echo -e "${BLUE}💾 备份旧版本...${NC}"
    BACKUP_DIR="${DEPLOY_DIR}.backup.$(date +%Y%m%d_%H%M%S)"
    cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
    echo -e "${GREEN}✅ 备份完成: ${BACKUP_DIR}${NC}"
    echo ""
fi

# 复制构建产物
echo -e "${BLUE}📋 复制构建产物...${NC}"
cp -r .next/* "$DEPLOY_DIR/.next/"
if [ -d "public" ]; then
    cp -r public "$DEPLOY_DIR/"
fi
echo -e "${GREEN}✅ 复制完成${NC}"
echo ""

# 设置权限
echo -e "${BLUE}🔐 设置文件权限...${NC}"
chown -R nginx:nginx "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"
echo -e "${GREEN}✅ 权限设置完成${NC}"
echo ""

# 复制 Nginx 配置
if [ -f "nginx/nginx.conf" ] || [ -f "nginx/nginx-dev.conf" ]; then
    echo -e "${BLUE}⚙️  配置 Nginx...${NC}"
    if [ "$ENV" = "prod" ] && [ -f "nginx/nginx.conf" ]; then
        cp nginx/nginx.conf "$NGINX_CONF_DIR/petvetai.conf"
    elif [ -f "nginx/nginx-dev.conf" ]; then
        cp nginx/nginx-dev.conf "$NGINX_CONF_DIR/petvetai.conf"
    fi
    
    # 测试 Nginx 配置
    if nginx -t; then
        echo -e "${GREEN}✅ Nginx 配置测试通过${NC}"
        echo -e "${YELLOW}⚠️  请手动重启 Nginx: systemctl reload nginx${NC}"
    else
        echo -e "${RED}❌ Nginx 配置测试失败${NC}"
        exit 1
    fi
    echo ""
fi

echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo -e "${YELLOW}下一步:${NC}"
echo "  1. 检查 Nginx 配置: nginx -t"
echo "  2. 重启 Nginx: systemctl reload nginx"
echo "  3. 验证部署: curl http://localhost/health"
echo ""

