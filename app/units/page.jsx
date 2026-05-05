"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { allUnits } from "@/data/units";
import { ArrowLeft, PlayCircle, Shield, FileText } from "lucide-react";

export default function UnitsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto space-y-12 pb-32">
      {/* Header */}
      <div className="text-center space-y-4 pt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/20"
        >
          <Shield className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight"
        >
          الدروس التفاعلية
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 text-lg max-w-2xl mx-auto"
        >
          اكتشف عالم السلامة الرقمية من خلال مجموعة من الدروس الممتعة التي تحتوي على فيديوهات، صور، واختبارات قصيرة.
        </motion.p>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allUnits.map((unit, index) => {
          // Get the first image from the lessons as the header image
          const headerImage = unit.lessons[0]?.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800";
          
          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative border-l-8 border border-slate-100 shadow-sm"
              style={{ borderLeftColor: unit.color }}
            >
              {/* Header Image */}
              <div className="h-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/5 z-10" />
                <img 
                  src={headerImage} 
                  alt={unit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 z-20 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-2xl border border-white shadow-lg">
                  {unit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{unit.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed min-h-[40px]">
                    {unit.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                    <FileText size={14} className="text-violet-600" />
                    <span>{unit.lessons.length} دروس</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full">
                    <PlayCircle size={14} className="text-emerald-600" />
                    <span>فيديوهات</span>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={`/lesson?unit=${unit.id}`}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    backgroundColor: unit.color,
                    boxShadow: `0 10px 25px -5px ${unit.color}40`
                  }}
                >
                  بدء التعلم
                  <ArrowLeft size={20} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
