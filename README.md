# Quiz Trí Tuệ - TypeScript + Next.js

Một ứng dụng quiz hiện đại được xây dựng bằng TypeScript và Next.js, sẵn sàng deploy lên Vercel.

## 🎯 Tính Năng

- ✅ 15 câu hỏi trắc nghiệm
- ⏱️ 20 giây cho mỗi câu hỏi
- 📊 Thang điểm 100 điểm (6.67 điểm/câu)
- ❌ Hết giờ = 0 điểm
- 📱 Responsive design (mobile-friendly)
- 🎨 Giao diện đẹp với gradient colors
- 📈 Hiển thị kết quả chi tiết

## 🛠️ Công Nghệ

- **Next.js 14** - React framework
- **TypeScript** - Type-safe JavaScript
- **CSS Modules** - Scoped styling
- **Vercel** - Deployment platform

## 📦 Cài Đặt

### 1. Clone Repository
```bash
git clone <repository-url>
cd kavy
```

### 2. Cài Đặt Dependencies
```bash
npm install
```

### 3. Chạy Development Server
```bash
npm run dev
```

Truy cập `http://localhost:3000` để xem ứng dụng.

### 4. Build cho Production
```bash
npm run build
npm start
```

## 🚀 Deploy lên Vercel

### Phương Pháp 1: Qua GitHub (Khuyên Dùng)

1. **Push code lên GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: Quiz app with TypeScript"
   git push origin main
   ```

2. **Tạo tài khoản Vercel:**
   - Truy cập https://vercel.com
   - Đăng ký bằng GitHub

3. **Import Project:**
   - Nhấp "Add New" → "Project"
   - Chọn repository từ GitHub
   - Vercel sẽ tự động detect Next.js project
   - Nhấp "Deploy"

### Phương Pháp 2: Dùng Vercel CLI

1. **Cài Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Theo dõi hướng dẫn từ CLI để hoàn thành.**

### Phương Pháp 3: Manual Upload

1. Build project:
   ```bash
   npm run build
   ```

2. Tạo file `vercel.json` (đã có sẵn)

3. Upload thư mục lên Vercel dashboard

## 📁 Cấu Trúc Project

```
kavy/
├── pages/
│   ├── _app.tsx          # App wrapper
│   └── index.tsx         # Main quiz page
├── lib/
│   ├── types.ts          # TypeScript interfaces
│   └── quizData.ts       # Quiz questions
├── styles/
│   ├── globals.css       # Global styles
│   └── Quiz.module.css   # Component styles
├── public/               # Static files
├── package.json
├── tsconfig.json
├── next.config.js
├── vercel.json
└── README.md
```

## 🎮 Cách Chơi

1. Nhấp "Bắt Đầu Quiz"
2. Chọn đáp án đúng trong vòng 20 giây
3. Xem kết quả tức thì (đúng = ✅, sai = ❌)
4. Tiếp tục câu tiếp theo
5. Xem điểm cuối cùng và đánh giá kết quả

## 📊 Chấm Điểm

- **Mỗi câu đúng:** 100 ÷ 15 = 6.67 điểm
- **Không trả lời (hết giờ):** 0 điểm
- **Thang điểm cuối cùng:** 0-100

## 🔧 Tùy Chỉnh

### Thêm/Chỉnh Câu Hỏi

Edit `lib/quizData.ts`:
```typescript
export const quizData: QuizQuestion[] = [
  {
    question: "Câu hỏi của bạn?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0  // Index của đáp án đúng
  },
  // ...
];
```

### Thay Đổi Thời Gian Timer

Edit `pages/index.tsx`, tìm `setTimeLeft(20)` và thay đổi số giây.

### Tùy Chỉnh Style

Edit `styles/Quiz.module.css` để thay đổi màu, fonts, spacing, v.v.

## 📝 License

MIT License

## 👨‍💻 Author

Tạo bởi AI Assistant - GitHub Copilot

## 🤝 Support

Nếu gặp vấn đề, kiểm tra:
- Node.js version >= 16
- npm hoặc yarn đã được cài
- Port 3000 không bị chiếm dụng