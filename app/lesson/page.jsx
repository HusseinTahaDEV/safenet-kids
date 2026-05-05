"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Star,
  Info,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { allUnits } from "@/data/units";

function LessonContent() {
  const searchParams = useSearchParams();
  const initialUnitId = searchParams.get("unit") || "phishing";
  
  const [selectedUnit, setSelectedUnit] = useState(allUnits.find(u => u.id === initialUnitId) || allUnits[0]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showUnitList, setShowUnitList] = useState(false);

  const lesson = selectedUnit?.lessons[activeLessonIndex];
  const progress = lesson?.content ? ((currentStep + 1) / lesson.content.length) * 100 : 0;

  const nextStep = () => {
    if (currentStep < (lesson?.content?.length || 0) - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeLesson = () => {
    const lessonId = `${selectedUnit.id}-${lesson?.id}`;
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    if (activeLessonIndex < selectedUnit.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
      setCurrentStep(0);
    }
  };

  const selectUnit = (unit) => {
    setSelectedUnit(unit);
    setActiveLessonIndex(0);
    setCurrentStep(0);
    setShowUnitList(false);
  };

  const currentStepData = lesson?.content?.[currentStep];

  return (
    <div className="min-h-screen text-slate-900 p-4 md:p-8" dir="rtl">
      {/* Header with Navigation */}
      <header className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between gap-4 bg-white shadow-sm border border-slate-100 p-4 rounded-3xl">
          <div className="flex items-center gap-4">
            <Link href="/units" className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
              <ArrowRight className="w-6 h-6 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{selectedUnit?.title}</h1>
              <p className="text-slate-500 text-xs">الوحدة {allUnits.findIndex(u => u.id === selectedUnit?.id) + 1} من {allUnits.length}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowUnitList(!showUnitList)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-100 transition-all"
          >
            <span className="font-bold text-sm">تغيير الوحدة</span>
            {showUnitList ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Unit Selector Dropdown */}
        <AnimatePresence>
          {showUnitList && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-white shadow-xl border border-slate-100 p-4 rounded-3xl z-40 relative"
            >
              {allUnits.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => selectUnit(unit)}
                  className={`p-4 rounded-2xl text-right transition-all flex items-center gap-4 border ${
                    selectedUnit?.id === unit.id
                      ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/20"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-2xl">{unit.icon}</span>
                  <span className="font-bold text-sm">{unit.title}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Lesson Metadata */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 text-violet-600">
              <BookOpen size={20} />
              <span className="text-sm font-bold uppercase tracking-wider">الدرس {activeLessonIndex + 1}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{lesson?.title}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">{lesson?.description}</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white shadow-sm border border-slate-100 px-4 py-2 rounded-2xl self-start">
            <div className="flex items-center gap-2 text-emerald-600">
              <Clock size={16} />
              <span className="text-sm font-bold">{lesson?.duration}</span>
            </div>
            <div className="w-px h-4 bg-slate-300" />
            <div className="flex items-center gap-2 text-amber-500">
              <Star size={16} />
              <span className="text-sm font-bold">50 XP</span>
            </div>
          </div>
        </div>

        {/* Video Hero for the Lesson (always visible at the top if present) */}
        {lesson?.video && (
           <div className="mb-10 aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-black border-4 border-white">
             <iframe
               src={lesson.video}
               title={lesson.title}
               className="w-full h-full"
               allowFullScreen
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             />
           </div>
        )}

        {/* Progress Bar */}
        <div className="mb-10 relative">
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
            />
          </div>
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1">
            {lesson?.content?.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= currentStep ? "bg-white shadow" : "bg-slate-400"}`} />
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedUnit?.id}-${activeLessonIndex}-${currentStep}`}
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-[2.5rem] p-6 md:p-12 min-h-[350px] flex flex-col justify-center border border-slate-100"
            >
              {currentStepData?.type === "text" && (
                <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 text-center">
                  {currentStepData.text}
                </p>
              )}



              {currentStepData?.type === "list" && (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-violet-600">نقاط هامة:</h4>
                  <ul className="space-y-4">
                    {currentStepData.items?.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                      >
                        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-slate-800">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {currentStepData?.type === "warning" && (
                <div className="flex flex-col items-center text-center gap-6 p-8 rounded-[2rem] bg-rose-50 border border-rose-200">
                  <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center">
                    <AlertTriangle className="w-10 h-10 text-rose-600" />
                  </div>
                  <p className="text-2xl font-bold text-rose-800">{currentStepData.text}</p>
                </div>
              )}

              {currentStepData?.type === "tip" && (
                <div className="flex flex-col items-center text-center gap-6 p-8 rounded-[2rem] bg-amber-50 border border-amber-200">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <Lightbulb className="w-10 h-10 text-amber-600" />
                  </div>
                  <p className="text-2xl font-bold text-amber-800">{currentStepData.text}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-between gap-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
              currentStep === 0
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm active:scale-95"
            }`}
          >
            <ArrowRight size={24} />
            <span>السابق</span>
          </button>

          <div className="hidden md:flex items-center gap-3">
            {lesson?.content?.map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: i === currentStep ? 1.5 : 1,
                  backgroundColor: i === currentStep ? "#8b5cf6" : i < currentStep ? "#a78bfa" : "#e2e8f0"
                }}
                className="w-2.5 h-2.5 rounded-full"
              />
            ))}
          </div>

          {currentStep < (lesson?.content?.length || 0) - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-violet-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <span>التالي</span>
              <ArrowLeft size={24} />
            </button>
          ) : (
            <button
              onClick={completeLesson}
              className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Trophy size={24} />
              <span>{activeLessonIndex < selectedUnit.lessons.length - 1 ? "الدرس التالي" : "أكملت الوحدة!"}</span>
            </button>
          )}
        </div>

        {/* Lesson List within Unit */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <BookOpen className="text-violet-500" />
            دروس الوحدة الحالية
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedUnit?.lessons.map((l, index) => (
              <button
                key={l.id}
                onClick={() => {
                  setActiveLessonIndex(index);
                  setCurrentStep(0);
                }}
                className={`p-6 rounded-3xl text-right transition-all border ${
                  activeLessonIndex === index
                    ? "bg-violet-50 border-violet-300 text-violet-900 shadow-md"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    activeLessonIndex === index ? "bg-violet-500 text-white shadow-lg" : "bg-slate-100 text-slate-500"
                  }`}>
                    {index + 1}
                  </div>
                  {completedLessons.includes(`${selectedUnit.id}-${l.id}`) && (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                  )}
                </div>
                <h4 className={`font-bold text-lg mb-1 ${activeLessonIndex === index ? "text-violet-900" : "text-slate-900"}`}>{l.title}</h4>
                <p className="text-sm opacity-80">{l.duration}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Final Exam Call to Action */}
        <div className="mt-20 bg-white shadow-xl p-10 rounded-[3rem] text-center border border-amber-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 z-0" />
          <div className="relative z-10">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">هل أنت مستعد للتحدي؟</h3>
            <p className="text-slate-600 text-lg mb-8 max-w-lg mx-auto">
              بعد إنهاء جميع الدروس، يمكنك خوض الاختبار النهائي للحصول على الشارة الذهبية وتأكيد مهاراتك في الحماية الرقمية!
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl hover:shadow-amber-500/25"
            >
              <Star className="fill-current" />
              ابدأ الاختبار النهائي
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-900">جاري التحميل...</div>}>
      <LessonContent />
    </Suspense>
  );
}
