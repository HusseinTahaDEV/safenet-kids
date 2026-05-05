import { Tajawal } from "next/font/google"
import "./globals.css"
import NavigationDock from "@/components/NavigationDock"

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
})

export const metadata = {
  title: "SafeNet Kids | منصة التعليم الرقمي الآمن",
  description: "منصة تعليمية تفاعلية لتعليم الأطفال السلامة الرقمية",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} font-sans antialiased min-h-screen relative overflow-x-hidden`}>
        {/* Animated Background Gradients (Light) */}
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-400/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-rose-400/10 blur-[100px]" />
          <div className="absolute inset-0 bg-grid opacity-[0.05]" />
        </div>

        <main className="pb-32">
          {children}
        </main>
        
        <NavigationDock />
      </body>
    </html>
  )
}