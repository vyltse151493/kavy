import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Quiz.module.css';
import { quizData } from '@/lib/quizData';
import { QuizQuestion } from '@/lib/types';

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizData.length).fill(null));
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    if (!quizStarted || quizEnded || answered) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setAnswered(true);
          setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = -1;
            return newAnswers;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [quizStarted, quizEnded, answered, currentQuestionIndex]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(20);
  };

  const selectOption = (index: number) => {
    if (timeLeft <= 0) return;
    
    setAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = index;
    setAnswers(newAnswers);

    const question = quizData[currentQuestionIndex];
    const pointsPerQuestion = 100 / quizData.length;
    if (index === question.correct) {
      setScore((prev) => prev + pointsPerQuestion);
      setCorrectCount((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setAnswered(false);
      setTimeLeft(20);
    } else {
      setQuizEnded(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(20);
    setAnswered(false);
    setAnswers(new Array(quizData.length).fill(null));
    setQuizStarted(false);
    setQuizEnded(false);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
  const finalScore = Math.round(score);
  const question: QuizQuestion = quizData[currentQuestionIndex];

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "🏆 Tuyệt vời! Bạn là một thiên tài!";
    if (score >= 60) return "👏 Rất tốt! Bạn thực sự thông minh!";
    if (score >= 40) return "👍 Chưa tệ! Hãy tiếp tục cố gắng!";
    return "💪 Hãy cố gắng thêm lần nữa!";
  };

  const timerClass = timeLeft <= 5 ? styles.warning : '';
  const progressStyle = { width: `${progressPercentage}%` };

  return (
    <>
      <Head>
        <title>Quiz Trí Tuệ - {quizData.length} Câu Hỏi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={`Trang web quiz với ${quizData.length} câu hỏi, 20 giây/câu, thang điểm 100`} />
      </Head>

      <div className={styles.container}>
        {!quizStarted ? (
          // Start Section
          <div className={styles.startSection}>
            <div className={styles.header}>
              <h1>🎯 Quiz Trí Tuệ</h1>
              <p>{quizData.length} câu hỏi, mỗi câu 20 giây</p>
            </div>
            <div className={styles.infoSection}>
              <p>⏱️ <strong>Thời gian:</strong> 20 giây/câu</p>
              <p>📊 <strong>Thang điểm:</strong> 100 điểm</p>
            </div>
            <button className={styles.startBtn} onClick={startQuiz}>
              Bắt Đầu Quiz
            </button>
          </div>
        ) : !quizEnded ? (
          // Quiz Section
          <div className={styles.quizSection}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={progressStyle}></div>
            </div>
            <div className={styles.questionCounter}>
              Câu {currentQuestionIndex + 1}/{quizData.length}
            </div>
            <div className={`${styles.timer} ${timerClass}`}>
              {timeLeft}
            </div>
            <div className={styles.questionText}>
              {question.question}
            </div>
            <div className={styles.options}>
              {question.options.map((option, index) => {
                let optionClass = styles.option;
                if (answered) {
                  if (index === question.correct) {
                    optionClass += ` ${styles.correct}`;
                  } else if (index === answers[currentQuestionIndex]) {
                    optionClass += ` ${styles.incorrect}`;
                  }
                }
                return (
                  <div
                    key={index}
                    className={optionClass}
                    onClick={() => selectOption(index)}
                    style={{ pointerEvents: answered ? 'none' : 'auto' }}
                  >
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={index}
                        checked={answers[currentQuestionIndex] === index}
                        readOnly
                      />
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
            {answered && timeLeft === 0 && (
              <div className={styles.timeExpired}>
                Hết thời gian! Không có điểm cho câu này.
              </div>
            )}
            <div className={styles.buttonGroup}>
              <button
                className={styles.nextBtn}
                onClick={nextQuestion}
                disabled={!answered}
              >
                Câu Tiếp Theo
              </button>
            </div>
          </div>
        ) : (
          // Results Section
          <div className={styles.resultsSection}>
            <div className={styles.header}>
              <h1>🎉 Kết Quả Quiz</h1>
            </div>
            <div className={styles.scoreDisplay}>
              {finalScore}/100
            </div>
            <div className={styles.scoreMessage}>
              {getScoreMessage(finalScore)}
            </div>
            <div className={styles.scoreDetails}>
              <p>✅ Câu trả lời đúng: {correctCount}/{quizData.length}</p>
            </div>
            <button className={styles.restartBtn} onClick={restartQuiz}>
              Làm Lại Quiz
            </button>
          </div>
        )}
      </div>
    </>
  );
}
