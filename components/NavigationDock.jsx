"use client";

import { motion } from "framer-motion";
import { Home, BookOpen, ShieldAlert, MessageSquare, Trophy, Settings, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "home", icon: <Home size={24} />, label: "الرئيسية", href: "/" },
  { id: "units", icon: <BookOpen size={24} />, label: "الدروس", href: "/units" },
  { id: "lab", icon: <ShieldAlert size={24} />, label: "المعمل", href: "/lab" },
  { id: "quiz", icon: <Star size={24} />, label: "الاختبار", href: "/quiz" },
];

export default function NavigationDock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-2 flex items-center gap-2 max-w-fit"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-200" 
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -top-1 w-1.5 h-1.5 bg-violet-600 rounded-full"
                  />
                )}
                <span className="sr-only">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
