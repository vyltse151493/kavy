# Hướng Dẫn Triển Khai Lên Vercel

## 📋 Yêu Cầu
- Git repository được push lên GitHub
- Tài khoản Vercel (https://vercel.com)
- Node.js 16+ được cài đặt

## 🚀 Các Bước Triển Khai

### 1. Chuẩn Bị Code
```bash
# Ensure everything is built correctly
npm run build

# Test the build locally
npm run start
```

### 2. Push Code lên GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 3. Kết Nối với Vercel

**Cách 1: Sử dụng Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
# Follow the prompts:
# - Link to existing project or create new
# - Select framework: Next.js
# - Confirm project settings
# - Done!
```

**Cách 2: Sử dụng Vercel Dashboard**
1. Truy cập https://vercel.com
2. Click "Add New" → "Project"
3. Import repository từ GitHub
4. Vercel sẽ tự động phát hiện Next.js
5. Click "Deploy"

### 4. Environment Variables (nếu cần)
Nếu bạn có environment variables:
1. Vào Settings → Environment Variables
2. Thêm biến và giá trị
3. Re-deploy để áp dụng

### 5. Custom Domain (Tùy chọn)
1. Vào Settings → Domains
2. Thêm domain tùy chỉnh của bạn
3. Cập nhật DNS records theo hướng dẫn

## 📊 Project Configuration

File `vercel.json`:
- **buildCommand**: `next build` - Build lệnh
- **devCommand**: `next dev` - Dev lệnh
- **installCommand**: `npm install` - Install lệnh
- **framework**: `nextjs` - Framework

## ✅ Kiểm Tra

Sau khi deploy:
- Vercel sẽ cung cấp URL (ví dụ: `https://quiz-app.vercel.app`)
- Mỗi push lên GitHub sẽ tự động deploy
- Xem logs: Deployments tab trên Vercel Dashboard

## 🔧 Troubleshooting

### Build Failed?
- Kiểm tra console log
- Đảm bảo tất cả dependencies được cài
- Verify `tsconfig.json` và `next.config.js`

### Module Not Found?
```bash
npm install --save <module-name>
git push origin main
```

### Port Issues?
Vercel sẽ tự động sử dụng port 3000, không cần config thêm

## 📝 Notes

- Production build được tối ưu hóa tự động
- Vercel cung cấp CDN global miễn phí
- Cold starts rất nhanh với Next.js
- Analytics và monitoring có sẵn
