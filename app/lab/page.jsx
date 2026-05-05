"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Mail,
  Lock,
  UserX,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Globe,
  AlertTriangle,
  RefreshCcw,
  Check,
  Send
} from "lucide-react";

// --- Phishing Simulator Component ---
function PhishingSim() {
  const [status, setStatus] = useState("idle"); // idle, success, fail

  return (
    <div className="flex flex-col h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
      <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <Mail size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">تحديث عاجل للحساب!</h4>
            <p className="text-sm text-slate-500" dir="ltr">admin@y0utube-support.net</p>
          </div>
        </div>
        <span className="text-xs text-slate-400">منذ 5 دقائق</span>
      </div>

      <div className="p-6 flex-1 text-right text-slate-700 leading-relaxed space-y-4">
        <p>عزيزي المستخدم،</p>
        <p>لقد لاحظنا نشاطاً مشبوهاً في حسابك. لتجنب إغلاق الحساب نهائياً، يرجى النقر على الرابط أدناه وتأكيد بياناتك فوراً.</p>
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-center my-6">
          <a href="#" className="text-blue-600 font-bold underline cursor-not-allowed">www.y0utube-verify-account.com/login</a>
        </div>
        <p>إذا لم تقم بتأكيد هويتك خلال 24 ساعة، سيتم حذف حسابك.</p>
        <p>فريق الدعم</p>
      </div>

      <div className="p-6 bg-white border-t border-slate-200">
        <AnimatePresence mode="wait">
          {status === "idle" ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex gap-4"
            >
              <button
                onClick={() => setStatus("fail")}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                رسالة آمنة (رد)
              </button>
              <button
                onClick={() => setStatus("success")}
                className="flex-1 py-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <AlertTriangle size={18} />
                تصيد احتيالي (حذف)
              </button>
            </motion.div>
          ) : status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-bold text-emerald-900 mb-1">أحسنت! قرار سليم.</h4>
              <p className="text-emerald-700 text-sm">لقد لاحظت الرابط المزيف والعنوان الغريب. هذه بالفعل رسالة تصيد!</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-emerald-600 font-bold text-sm underline flex items-center justify-center gap-1 mx-auto">
                <RefreshCcw size={14} /> إعادة المحاولة
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center"
            >
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle size={24} />
              </div>
              <h4 className="font-bold text-rose-900 mb-1">احذر! وقعت في الفخ.</h4>
              <p className="text-rose-700 text-sm">الرسالة تحتوي على عنوان بريد مزيف ورابط غريب، وتحاول إخافتك بإغلاق الحساب.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-rose-600 font-bold text-sm underline flex items-center justify-center gap-1 mx-auto">
                <RefreshCcw size={14} /> إعادة المحاولة
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Password Simulator Component ---
function PasswordSim() {
  const [password, setPassword] = useState("");

  const rules = [
    { id: 'length', text: '8 أحرف على الأقل', check: (p) => p.length >= 8 },
    { id: 'upper', text: 'حرف كبير واحد (A-Z)', check: (p) => /[A-Z]/.test(p) },
    { id: 'lower', text: 'حرف صغير واحد (a-z)', check: (p) => /[a-z]/.test(p) },
    { id: 'number', text: 'رقم واحد (0-9)', check: (p) => /[0-9]/.test(p) },
    { id: 'special', text: 'رمز خاص (!@#$%)', check: (p) => /[^A-Za-z0-9]/.test(p) }
  ];

  const score = rules.filter(r => r.check(password)).length;
  const strength = score === 0 ? 0 : (score / rules.length) * 100;

  let strengthColor = "bg-rose-500";
  let strengthText = "ضعيفة جداً";
  if (score >= 3) { strengthColor = "bg-amber-400"; strengthText = "متوسطة"; }
  if (score === 5) { strengthColor = "bg-emerald-500"; strengthText = "قوية جداً!"; }
  if (password.length === 0) { strengthColor = "bg-slate-200"; strengthText = ""; }

  return (
    <div className="flex flex-col h-full bg-white text-right">
      <div className="space-y-6">
        <div>
          <label className="block font-bold text-slate-700 mb-2">أدخل كلمة مرور لاختبارها:</label>
          <div className="relative">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="اكتب كلمة مرور هنا..."
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 rounded-xl p-4 text-xl outline-none transition-all font-mono text-left"
              dir="ltr"
            />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-slate-500">قوة الكلمة:</span>
            <span className={password.length ? strengthColor.replace('bg-', 'text-') : 'text-slate-400'}>{strengthText}</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <motion.div
              className={`h-full ${strengthColor}`}
              animate={{ width: `${strength}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {rules.map((rule) => {
            const passed = rule.check(password);
            return (
              <div key={rule.id} className={`flex items-center gap-3 p-3 rounded-xl border ${passed ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-500'} transition-colors`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${passed ? 'bg-emerald-200 text-emerald-700' : 'bg-slate-200 text-slate-400'}`}>
                  {passed ? <Check size={14} /> : <XCircle size={14} />}
                </div>
                <span className="font-medium text-sm">{rule.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Chat Simulator Component ---
function ChatSim() {
  const [status, setStatus] = useState("idle"); // idle, success, fail

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative">
      <div className="bg-white border-b border-slate-200 p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
          <UserX size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-900" dir="ltr">@UnknownGamer99</h4>
          <p className="text-xs text-emerald-500">متصل الآن</p>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0" />
          <div className="bg-white border border-slate-200 rounded-2xl rounded-tr-sm p-4 shadow-sm text-slate-700 max-w-[80%] text-right">
            مرحباً! لقد رأيتك تلعب بشكل رائع في المباراة الأخيرة. أنا في نفس عمرك وأسكن قريباً منك، ما اسمك وفي أي مدرسة تدرس؟
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 p-4">
        <AnimatePresence mode="wait">
          {status === "idle" ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="font-bold text-slate-500 text-sm text-center mb-4">كيف سترد على هذه الرسالة؟</p>
              <button onClick={() => setStatus("fail")} className="w-full text-right p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors">
                "أهلاً! أنا أحمد وأدرس في مدرسة النور الابتدائية."
              </button>
              <button onClick={() => setStatus("fail")} className="w-full text-right p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors">
                "مرحباً، من أنت؟ لا أعرفك."
              </button>
              <button onClick={() => setStatus("success")} className="w-full text-right p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors flex items-center justify-between">
                <span>تجاهل الرسالة وحظر المستخدم</span>
                {/* <ShieldAlert size={18} /> */}
              </button>
            </motion.div>
          ) : status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-bold text-emerald-900 mb-1">تصرف ممتاز!</h4>
              <p className="text-emerald-700 text-sm">القاعدة الذهبية: لا تشارك معلوماتك الشخصية أبداً مع الغرباء، حتى لو ادعوا أنهم في مثل عمرك.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-emerald-600 font-bold text-sm underline flex items-center justify-center gap-1 mx-auto">
                <RefreshCcw size={14} /> إعادة المحاولة
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center"
            >
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <XCircle size={24} />
              </div>
              <h4 className="font-bold text-rose-900 mb-1">احذر!</h4>
              <p className="text-rose-700 text-sm">الرد على الغرباء أو إعطائهم معلومات يجعلك هدفاً سهلاً. تجاهلهم وحظرهم هو الحل الأفضل.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-rose-600 font-bold text-sm underline flex items-center justify-center gap-1 mx-auto">
                <RefreshCcw size={14} /> إعادة المحاولة
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


// --- Main Lab Page ---
const simulations = [
  {
    id: "phishing-email",
    title: "كاشف الرسائل المخادعة",
    description: "هل يمكنك التمييز بين الرسالة الحقيقية والمزيفة؟",
    icon: <Mail className="w-12 h-12" />,
    colorStyles: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      hover: "hover:bg-rose-600",
      iconBg: "bg-rose-100",
      iconBorder: "border-rose-200"
    },
    difficulty: "متوسط"
  },
  {
    id: "password-strength",
    title: "مختبر كلمات المرور",
    description: "اختبر قوة كلمة مرورك وحاول جعلها غير قابلة للاختراق.",
    icon: <Lock className="w-12 h-12" />,
    colorStyles: {
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-100",
      hover: "hover:bg-cyan-600",
      iconBg: "bg-cyan-100",
      iconBorder: "border-cyan-200"
    },
    difficulty: "سهل"
  },
  {
    id: "stranger-chat",
    title: "محاكي الدردشة الآمنة",
    description: "تدرب على كيفية الرد على الغرباء في تطبيقات التواصل.",
    icon: <UserX className="w-12 h-12" />,
    colorStyles: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      hover: "hover:bg-amber-600",
      iconBg: "bg-amber-100",
      iconBorder: "border-amber-200"
    },
    difficulty: "صعب"
  }
];

export default function LabPage() {
  const [selectedSim, setSelectedSim] = useState(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-12 min-h-screen pb-32 text-slate-900" dir="rtl">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-rose-200"
        >
          <ShieldAlert size={48} />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">المعمل التطبيقي</h1>
        <p className="text-slate-600 text-xl max-w-2xl mx-auto font-medium">
          هنا يمكنك تجربة مهاراتك في بيئة آمنة تماماً. واجه التحديات وتعلم من أخطائك!
        </p>
      </div>

      {/* Simulation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {simulations.map((sim, i) => (
          <motion.div
            key={sim.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] p-8 group border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-20 h-20 rounded-3xl ${sim.colorStyles.bg} ${sim.colorStyles.text} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm border ${sim.colorStyles.border}`}>
              {sim.icon}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">{sim.title}</h3>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-100 rounded-lg text-slate-600 border border-slate-200">
                  {sim.difficulty}
                </span>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed">
                {sim.description}
              </p>
              <button
                onClick={() => setSelectedSim(sim)}
                className={`w-full py-4 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:text-white ${sim.colorStyles.hover} transition-colors flex items-center justify-center gap-2 shadow-sm`}
              >
                بدء المحاكاة
                <ArrowLeft size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coming Soon / Enterprise Placeholder */}
      {/* <div className="bg-slate-50 rounded-[3rem] p-12 text-center border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
          <Globe className="text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-700 mb-2">تحديات عالمية قريباً</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          نحن نعمل على إضافة المزيد من السيناريوهات التفاعلية لمحاكاة أحدث التهديدات الرقمية كالتنمر والهندسة الاجتماعية.
        </p>
      </div> */}

      {/* Simulation Modal */}
      <AnimatePresence>
        {selectedSim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col max-h-[95vh] shadow-2xl border border-slate-100"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${selectedSim.colorStyles.iconBg} ${selectedSim.colorStyles.text} flex items-center justify-center shadow-sm border ${selectedSim.colorStyles.iconBorder}`}>
                    {selectedSim.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{selectedSim.title}</h2>
                    <p className="text-slate-500 text-sm hidden sm:block">{selectedSim.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSim(null)}
                  className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors flex-shrink-0"
                >
                  <ArrowLeft className="rotate-180" />
                </button>
              </div>

              {/* Modal Body (The Actual Simulator) */}
              <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-white">
                <div className="h-full max-w-2xl mx-auto">
                  {selectedSim.id === "phishing-email" && <PhishingSim />}
                  {selectedSim.id === "password-strength" && <PasswordSim />}
                  {selectedSim.id === "stranger-chat" && <ChatSim />}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
