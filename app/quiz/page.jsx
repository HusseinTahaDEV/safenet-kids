"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Trophy, Clock, Target, ChevronRight, ChevronLeft, Star, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

const examQuestions = [
  {
    unit: "التصيد",
    question: "ما هو التصيد؟",
    options: [
      "رسالة مزيفة للحصول على معلوماتك الشخصية",
      "رسالة من صديق",
      "إعلان عادي",
      "بريد إلكتروني آمن"
    ],
    correct: 0
  },
  {
    unit: "التصيد",
    question: "أي من هذه علامات التصيد؟",
    options: [
      "بريد من صديق",
      "بريد من مديرك",
      "بريد من بنك برقم غريب",
      "بريد من معلمك"
    ],
    correct: 2
  },
  {
    unit: "الغرباء",
    question: "من هو الغريب؟",
    options: [
      "صديق المدرسة",
      "والدك",
      "أي شخص لا تعرفه",
      "معلمك"
    ],
    correct: 2
  },
  {
    unit: "الغرباء",
    question: "ماذا تفعل لو طلب غريب مقابلتك؟",
    options: [
      "أوافق",
      "أذهب سراً",
      "أخبر والدي فوراً",
      "أتجاهله"
    ],
    correct: 2
  },
  {
    unit: "الخصوصية",
    question: "أي مما يلي يعتبر معلومات شخصية؟",
    options: [
      "اسم فيلمك المفضل",
      "اسمك الكامل",
      "لونك المفضل",
      "طعامك المفضل"
    ],
    correct: 1
  },
  {
    unit: "الخصوصية",
    question: "أي هذه كلمات المرور الأقوى؟",
    options: [
      "password123",
      "أحمد2005",
      "X#7kL$mN2@qP",
      "qwerty"
    ],
    correct: 2
  },
  {
    unit: "الأمان الرقمي",
    question: "ماذا تفعل لو رأيت تنمراً إلكترونياً؟",
    options: [
      "تتنمر أيضاً",
      "تنشره للجميع",
      "تحذر الشخص",
      "تبلغ شخصاً بالغاً"
    ],
    correct: 3
  },
  {
    unit: "الأمان الرقمي",
    question: "ما هي قاعدة 20-20-20؟",
    options: [
      "قاعدة للألعاب",
      "قاعدة لصحة العين",
      "قاعدة للدراسة",
      "قاعدة للنوم"
    ],
    correct: 1
  },
  {
    unit: "كلمات المرور",
    question: "كم مرة يجب تغيير كلمة المرور؟",
    options: [
      "كل يوم",
      "كل شهر",
      "كل 3 أشهر",
      "أبداً"
    ],
    correct: 2
  },
  {
    unit: "التطبيقات",
    question: "من أين يجب تحميل التطبيقات؟",
    options: [
      "أي موقع",
      "المتاجر الرسمية فقط",
      "روابط الأصدقاء",
      "أي مكان"
    ],
    correct: 1
  },
  {
    unit: "التطبيقات",
    question: "ماذا تفعل لو طلب منك أحد اللعبة مالاً؟",
    options: [
      "أشتري فوراً",
      "أخبر والدي",
      "أعطيهم رقم البطاقة",
      "لا أستخدم اللعبة"
    ],
    correct: 1
  },
  {
    unit: "الخصوصية",
    question: "ماذا قد يحدث لو شاركت رقم هاتفك مع غرباء؟",
    options: [
      "كل شيء سيكون بخير",
      "قد يتعرض للسرقة",
      "لن يحدث شيء",
      "ستصبح مشهوراً"
    ],
    correct: 1
  }
];

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [isComplete, setIsComplete] = useState(false);

  const question = examQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isComplete) {
      setShowResult(true);
      setIsComplete(true);
    }
  }, [timeLeft, isComplete]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = { ...answers, [currentQuestion]: selectedAnswer };
      setAnswers(newAnswers);

      if (currentQuestion < examQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] ?? null);
      } else {
        setIsComplete(true);
        setShowResult(true);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const calculateResult = () => {
    let correct = 0;
    examQuestions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return { correct, total: examQuestions.length, percentage: Math.round((correct / examQuestions.length) * 100) };
  };

  const getResultMessage = (percentage) => {
    if (percentage >= 90) return { text: "ممتاز! أنت بطل حقيقي في الأمان الرقمي! 🏆", emoji: "👑", color: "text-amber-500" };
    if (percentage >= 70) return { text: "عمل رائع! مهاراتك قوية جداً! ⭐", emoji: "🌟", color: "text-violet-600" };
    if (percentage >= 50) return { text: "جيد! أنت تعرف الأساسيات، لكن يمكنك التحسن 📚", emoji: "🛡️", color: "text-emerald-600" };
    return { text: "لا بأس، التدريب يجعلك أفضل! حاول مرة أخرى 📖", emoji: "💪", color: "text-rose-500" };
  };

  if (showResult && isComplete) {
    const result = calculateResult();
    const resultInfo = getResultMessage(result.percentage);

    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center bg-slate-50" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-[3rem] p-8 md:p-16 max-w-2xl w-full text-center border border-slate-100"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-9xl mb-8 inline-block"
          >
            {resultInfo.emoji}
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            نتيجة التحدي
          </h1>

          <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 mb-8 border border-slate-100 relative overflow-hidden">
            <div className={`text-7xl md:text-8xl font-black mb-4 ${resultInfo.color}`}>
              {result.percentage}%
            </div>
            <p className="text-slate-600 text-xl font-bold">
              لقد أجبت على {result.correct} من أصل {result.total} سؤال بشكل صحيح
            </p>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 rotate-12" />
            </div>
          </div>

          <p className="text-2xl font-bold text-slate-800 mb-10 leading-relaxed">
            {resultInfo.text}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-amber-50 p-4 rounded-2xl flex items-center justify-center gap-3 border border-amber-200">
              <Star className="text-amber-500 fill-current" size={24} />
              <span className="text-xl font-black text-amber-600">+{result.correct * 20} XP</span>
            </div>
            <div className="bg-violet-50 p-4 rounded-2xl flex items-center justify-center gap-3 border border-violet-200">
              <Trophy className="text-violet-500" size={24} />
              <span className="text-xl font-black text-violet-600">شارة البطل</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                setShowResult(false);
                setIsComplete(false);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setAnswers({});
                setTimeLeft(600);
              }}
              className="w-full sm:w-auto bg-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-200 active:scale-95 transition-all shadow-sm"
            >
              إعادة الاختبار
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto bg-violet-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-violet-700 active:scale-95 transition-all shadow-xl hover:shadow-violet-600/20"
            >
              العودة للرئيسية
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-900" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full mb-4 border border-violet-200">
              <Brain size={18} />
              <span className="text-sm font-bold tracking-wider">الاختبار النهائي</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900">تحدي السلامة الرقمية</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white shadow-sm px-6 py-3 rounded-2xl flex items-center gap-3 border border-slate-100">
              <Clock className={timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-slate-500"} />
              <span className={`text-xl font-black ${timeLeft < 60 ? "text-rose-600" : "text-slate-800"}`}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white shadow-sm p-6 rounded-3xl mb-8 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="text-violet-600" size={20} />
              <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">السؤال {currentQuestion + 1} من {examQuestions.length}</span>
            </div>
            <span className="text-slate-900 font-black">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-xl mb-8"
          >
            <div className="p-8 md:p-12 relative">
              <div className="absolute top-8 left-8">
                <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200">
                  وحدة: {question.unit}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 leading-relaxed">
                {question.question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.01, x: -5 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedAnswer(index)}
                    className={`w-full p-6 rounded-2xl text-right transition-all flex items-center gap-6 border-2 ${
                      selectedAnswer === index
                        ? "bg-violet-50 border-violet-500 shadow-md"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl transition-colors ${
                      selectedAnswer === index ? "bg-violet-600 text-white shadow" : "bg-slate-200 text-slate-600"
                    }`}>
                      {String.fromCharCode(1632 + index + 1)}
                    </div>
                    <span className={`text-xl font-bold transition-colors ${
                      selectedAnswer === index ? "text-violet-900" : "text-slate-700"
                    }`}>
                      {option}
                    </span>
                    {selectedAnswer === index && (
                      <div className="mr-auto">
                        <ShieldCheck className="text-violet-600" size={28} />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Controls */}
        <div className="flex items-center justify-between gap-6">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg transition-all ${
              currentQuestion === 0
                ? "bg-slate-100 text-slate-400 cursor-not-allowed opacity-50"
                : "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 shadow-sm active:scale-95"
            }`}
          >
            <ChevronRight size={24} />
            <span>السابق</span>
          </button>

          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xl transition-all shadow-xl ${
              selectedAnswer === null
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:scale-105 active:scale-95 hover:shadow-violet-600/30"
            }`}
          >
            <span>{currentQuestion === examQuestions.length - 1 ? "إنهاء التحدي" : "السؤال التالي"}</span>
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
          <AlertCircle size={14} />
          <span>تأكد من إجابتك قبل الانتقال للسؤال التالي</span>
        </div>
      </div>
    </div>
  );
}
