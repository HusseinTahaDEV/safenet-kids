"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  BookOpen, 
  Trophy,
  PlayCircle,
  ArrowLeft,
  CheckCircle2,
  Users,
  Lock,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      
      {/* Background Patterns */}
      <div className="fixed inset-0 z-0 bg-grid opacity-[0.2]" />
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-violet-400/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-1/2 h-1/2 bg-rose-400/10 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-32 space-y-24">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-right space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-bold mb-2">
              <ShieldCheck size={18} />
              <span>منصة تعليمية آمنة</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              تعلم أساسيات <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">السلامة الرقمية</span>
              <br />بمتعة وتفاعل
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              موقع ويب تعليمي تفاعلي يهدف لتوعية الأطفال بأساسيات السلامة الرقمية من خلال بيئة متكاملة تجمع بين التعلم النظري والتطبيق العملي.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Link 
                href="/units"
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
              >
                ابدأ رحلة التعلم <ArrowLeft size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 w-full max-w-lg lg:max-w-none relative aspect-video"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500 to-indigo-500 rounded-[3rem] rotate-3 opacity-20 blur-lg" />
            <div className="relative rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden w-full h-full bg-slate-100">
              <iframe 
                src="https://www.youtube.com/embed/kIZdWVLOGzo?autoplay=1&loop=1&playlist=kIZdWVLOGzo&controls=1&modestbranding=1" 
                title="Digital Safety Hero Video"
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>

        {/* Platform Sections */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">أقسام المنصة</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">بيئة تعليمية متكاملة تتكون من ثلاثة أقسام رئيسية صممت خصيصاً لبناء مهاراتك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Lessons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-6">
                <BookOpen className="text-violet-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">الدروس التفاعلية</h3>
              <p className="text-slate-600 flex-1 leading-relaxed mb-6">
                دروس ممتعة ومبسطة تشمل مقاطع فيديو وصور توضيحية لتعلم كيفية حماية نفسك على الإنترنت.
              </p>
              <Link 
                href="/units"
                className="text-violet-600 font-bold flex items-center gap-2 hover:gap-4 transition-all"
              >
                تصفح الدروس <ArrowLeft size={18} />
              </Link>
            </motion.div>

            {/* Lab */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mb-6">
                <ShieldCheck className="text-rose-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">المعامل التطبيقية</h3>
              <p className="text-slate-600 flex-1 leading-relaxed mb-6">
                تدرب على ما تعلمته في بيئة محاكاة آمنة، واكتشف المخاطر بنفسك قبل مواجهتها في الواقع.
              </p>
              <Link 
                href="/lab"
                className="text-rose-600 font-bold flex items-center gap-2 hover:gap-4 transition-all"
              >
                دخول المعمل <ArrowLeft size={18} />
              </Link>
            </motion.div>

            {/* Quiz */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
                <Trophy className="text-amber-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">الاختبار النهائي</h3>
              <p className="text-slate-600 flex-1 leading-relaxed mb-6">
                تحدَّ نفسك واختبر معلوماتك التي اكتسبتها لتحصل على شارة "بطل السلامة الرقمية".
              </p>
              <Link 
                href="/quiz"
                className="text-amber-600 font-bold flex items-center gap-2 hover:gap-4 transition-all"
              >
                بدء الاختبار <ArrowLeft size={18} />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Why Learn Digital Safety Section */}
        <div className="bg-violet-600 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black leading-tight">لماذا نتعلم السلامة الرقمية في سن مبكر؟</h2>
              <p className="text-violet-100 text-lg leading-relaxed">
                الإنترنت عالم مليء بالفرص، ولكنه يحتوي أيضاً على مخاطر. تعليم الأطفال كيفية حماية أنفسهم يبني جيلاً واعياً ومسؤولاً.
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  { icon: <Lock size={20} />, text: "حماية المعلومات الشخصية من السرقة" },
                  { icon: <Users size={20} />, text: "التعامل الآمن مع الغرباء على الإنترنت" },
                  { icon: <Globe size={20} />, text: "تصفح الويب بأمان وتجنب المواقع الضارة" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-bold text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src="/images/safety.png" 
                alt="Kids learning safely" 
                className="rounded-3xl shadow-2xl border-4 border-white/20 rotate-3 hover:rotate-0 transition-transform duration-500 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center space-y-6 py-12 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-900">هل أنت مستعد لتصبح خبيراً؟</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            انضم إلى آلاف الأبطال الذين تعلموا كيفية تصفح الإنترنت بأمان.
          </p>
          <Link 
            href="/units"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
          >
            ابدأ مجاناً الآن <PlayCircle size={20} />
          </Link>
        </div>

      </main>
    </div>
  );
}
