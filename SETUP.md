# 🎓 Quiz App - Setup & Development Guide

## 📌 Project Overview

**Quiz Trí Tuệ** là một ứng dụng quiz web hiện đại được xây dựng bằng:
- **Next.js 13** - React framework tối ưu cho SSR/SSG
- **TypeScript** - Type-safe development
- **CSS Modules** - Component-scoped styling

Dự án đã được cấu hình sẵn sàng deploy lên **Vercel** với một lệnh.

## 🚀 Quick Start

### 1. Cài Đặt & Chạy
```bash
# Cài dependencies
npm install

# Chạy development server
npm run dev

# Truy cập: http://localhost:3000
```

### 2. Build & Deploy
```bash
# Build cho production
npm run build

# Test production build locally
npm start

# Deploy lên Vercel (sau khi push lên GitHub)
vercel
```

## 📂 Project Structure

```
kavy/
├── 📄 pages/
│   ├── _app.tsx              # App wrapper với global styles
│   └── index.tsx             # Main quiz component
│
├── 📦 lib/
│   ├── types.ts              # TypeScript interfaces
│   └── quizData.ts           # Quiz questions & answers
│
├── 🎨 styles/
│   ├── globals.css           # Global CSS
│   └── Quiz.module.css       # Component-scoped CSS
│
├── 🔧 Configuration Files
│   ├── next.config.js        # Next.js configuration
│   ├── tsconfig.json         # TypeScript config
│   ├── vercel.json           # Vercel deployment config
│   └── package.json          # Dependencies & scripts
│
├── 📚 Documentation
│   ├── README.md             # Main documentation
│   ├── DEPLOYMENT.md         # Deployment guide
│   └── SETUP.md              # This file
│
└── 📝 Other
    ├── .gitignore           # Git ignore rules
    └── quiz.html            # Original HTML version
```

## 🎯 Features Breakdown

### Quiz Component (`pages/index.tsx`)

**State Management:**
```typescript
- currentQuestionIndex: 0-14 (which question)
- score: 0-100 (accumulated points)
- timeLeft: 0-20 (seconds remaining)
- answered: boolean (has user answered)
- answers: array (user selections)
- quizStarted: boolean (quiz status)
- quizEnded: boolean (final status)
```

**Key Functions:**
- `startQuiz()` - Initialize quiz
- `selectOption(index)` - Handle answer selection
- `nextQuestion()` - Go to next question
- `restartQuiz()` - Reset all state
- `getScoreMessage()` - Generate feedback

### Quiz Data (`lib/quizData.ts`)

Each question has:
```typescript
interface QuizQuestion {
  question: string;      // Question text
  options: string[];     // 4 answer choices
  correct: number;       // Index of correct answer (0-3)
}
```

**Total: 15 questions** covering Vietnamese history, geography, science

### Styling (`styles/Quiz.module.css`)

**CSS Modules Benefits:**
- Scoped classes (no global conflicts)
- Better organization
- Easy to maintain

**Key Classes:**
- `.container` - Main quiz wrapper
- `.timer` - Timer display
- `.timer.warning` - Timer warning state (≤5 seconds)
- `.progressBar` - Progress indicator
- `.option` - Answer option
- `.option.correct` - Correct answer highlight
- `.option.incorrect` - Incorrect answer highlight

## ⏱️ Timer Logic

```
Flow:
1. Question loads → Timer starts at 20 seconds
2. User selects answer → Timer stops
3. Timer reaches 0 → Auto-advance, answer = -1 (no points)
4. Next question → Timer resets to 20
```

**Warning Threshold:**
- Timer ≤ 5 seconds: Background changes to yellow
- Visual cue for user

## 📊 Scoring System

```
Calculation:
- Each correct answer = 100 ÷ 15 = 6.67 points
- No answer (timeout) = 0 points
- Final score = sum of all correct answers

Feedback Tiers:
- ≥ 80 points: 🏆 Excellent
- ≥ 60 points: 👏 Very Good
- ≥ 40 points: 👍 Fair
- < 40 points: 💪 Keep Trying
```

## 🔄 TypeScript Types

**QuizQuestion:**
```typescript
{
  question: string;
  options: string[];
  correct: number;  // 0-3
}
```

**QuizState:**
```typescript
{
  currentQuestionIndex: number;
  score: number;
  timeLeft: number;
  answered: boolean;
  answers: (number | null)[];
  quizStarted: boolean;
  quizEnded: boolean;
}
```

## 🎨 Styling Highlights

**Color Scheme:**
- Primary: Gradient (#667eea → #764ba2)
- Success: #51cf66 (green)
- Error: #ff6b6b (red)
- Text: #333 (dark)

**Responsive:**
- Mobile: Full width with padding
- Desktop: Max-width 700px, centered
- All elements scale with viewport

## 🔧 Customization Guide

### Change Timer Duration
**File:** `pages/index.tsx`
```typescript
// Find line with setTimeLeft(20)
// Change 20 to your desired seconds
```

### Add/Edit Questions
**File:** `lib/quizData.ts`
```typescript
{
  question: "Your question here?",
  options: ["A", "B", "C", "D"],
  correct: 2  // Correct answer index
}
```

### Modify Colors
**File:** `styles/Quiz.module.css`
- Change gradient colors in `.startBtn`, `.nextBtn`
- Adjust `.timer.warning` background
- Edit `.option.correct` and `.option.incorrect` colors

### Change Question Count
1. **Add 15 questions** to `quizData.ts`
2. Update `15` in `index.tsx`:
   - `if (currentQuestionIndex < 14)` → change 14
   - Progress calculation: `((currentQuestionIndex + 1) / 15)`
   - Scoring: `100 / 15`

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🛠️ Development Workflow

### 1. Make Changes
```bash
# Edit any file, dev server auto-reloads
npm run dev
```

### 2. Check Types
```bash
# TypeScript compilation check
npx tsc --noEmit
```

### 3. Format Code (Optional)
```bash
# Install Prettier
npm install --save-dev prettier

# Format
npx prettier --write .
```

### 4. Build & Test
```bash
# Production build
npm run build

# Test production version
npm start
```

### 5. Deploy
```bash
# Push to GitHub
git add .
git commit -m "Your changes"
git push origin main

# Vercel auto-deploys on push
# Or manually: vercel
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -i :3000` then `kill -9 <PID>` |
| Module not found | `npm install` then restart server |
| TypeScript errors | Check `tsconfig.json`, restart IDE |
| CSS not loading | Verify CSS file path and class names |
| Timer not working | Check `useEffect` dependencies in `index.tsx` |

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
- [Vercel Docs](https://vercel.com/docs)

## ✅ Pre-Deployment Checklist

- [ ] All 15 questions added
- [ ] Questions tested in browser
- [ ] Timer working correctly
- [ ] Scoring accurate
- [ ] Mobile responsive checked
- [ ] No TypeScript errors: `npm run build`
- [ ] Vercel.json configured
- [ ] Code pushed to GitHub
- [ ] Vercel project created

## 🚀 Next Steps

1. **Customize questions** for your use case
2. **Test thoroughly** on different devices
3. **Add more features** (leaderboard, difficulty levels, etc.)
4. **Deploy to Vercel** for live access
5. **Monitor analytics** in Vercel dashboard

---

**Created with ❤️ by GitHub Copilot**
