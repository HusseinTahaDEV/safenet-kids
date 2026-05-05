export const unitsData = {
  phishing: {
    title: "التصيد الإلكتروني",
    description: "تعلم كيف تحمي نفسك من رسائل الاحتيال والمواقع المزيفة",
    icon: "🛡️",
    color: "#ef4444",
    colorLight: "rgba(239, 68, 68, 0.1)",
    lessons: [
      {
        id: "phishing-1",
        title: "ما هو التصيد؟",
        description: "تعرف على رسائل التصيد",
        image: "/images/phishing.png",
        duration: "10 دقائق",
        content: [
          { type: "text", text: "التصيد هو محاولة للحصول على معلوماتك الشخصية عبر رسائل مزيفة" },

          { type: "text", text: "المهاجمون يرسلون رسائل تبدو وكأنها من شركات حقيقية" },
          { type: "warning", text: "⚠️ لا تنقر على روابط مشبوهة!" }
        ],
        quiz: [
          { question: "ما هو التصيد؟", options: ["رسالة مزيفة للحصول على معلوماتك", "رسالة من صديق", "إعلان عادي", "بريد إلكتروني آمن"], correct: 0 }
        ]
      },
      {
        id: "phishing-2",
        title: "كيف تتعرف على رسالة تصيد؟",
        description: "علامات تحذيرية",
        image: "/images/phishing.png",
        duration: "15 دقائق",
        content: [
          { type: "text", text: "هناك علامات تحذيرية تدل على رسالة التصيد" },

          { type: "list", items: ["يرسل من بريد غريب", "يطلب معلوماتك الشخصية", "يحتوي على روابط مشبوهة", "يعدك بجوائز"] },
          { type: "tip", text: "💡 تحقق دائماً من عنوان المرسل" }
        ],
        quiz: [
          { question: "أي من هذه علامات التصيد؟", options: ["بريد من صديق", "بريد من مديرك", "بريد من بنك برقم غريب", "بريد من معلمك"], correct: 2 }
        ]
      }
    ]
  },
  stranger: {
    title: "الغرباء على الإنترنت",
    description: "لا تثق بأي شخص غريب وكن حذراً في محادثاتك",
    icon: "👤",
    color: "#f97316",
    colorLight: "rgba(249, 115, 22, 0.1)",
    lessons: [
      {
        id: "stranger-1",
        title: "من هو الغريب؟",
        description: "تعرف على الغرباء",
        image: "/images/stranger.png",
        duration: "8 دقائق",
        content: [
          { type: "text", text: "الغريب هو أي شخص لا تعرفه في الحياة الواقعية" },

          { type: "warning", text: "⚠️ الشخص الذي تتحدث معه على الإنترنت قد لا يكون من يدعي أنه هو!" }
        ],
        quiz: [
          { question: "من هو الغريب؟", options: ["صديق المدرسة", "والدك", "أي شخص لا تعرفه", "معلمك"], correct: 2 }
        ]
      }
    ]
  },
  privacy: {
    title: "الخصوصية",
    description: "حماية معلوماتك الشخصية وصورك",
    icon: "🔒",
    color: "#8b5cf6",
    colorLight: "rgba(139, 92, 246, 0.1)",
    lessons: [
      {
        id: "privacy-1",
        title: "ما هي المعلومات الشخصية؟",
        description: "تعرف على بياناتك",
        image: "/images/privacy.png",
        duration: "10 دقائق",
        content: [
          { type: "text", text: "المعلومات الشخصية هي كل ما يعرف هويتك" },

          { type: "list", items: ["اسمك الكامل", "عنوان بيتك", "رقم هاتفك", "صورتك", "كلمة مرورك"] },
          { type: "tip", text: "💡 هذه المعلومات ثروة - لا تعطها لأي شخص!" }
        ],
        quiz: [
          { question: "أي مما يلي يعتبر معلومات شخصية؟", options: ["اسم فيلمك المفضل", "اسمك الكامل", "لونك المفضل", "طعامك المفضل"], correct: 1 }
        ]
      }
    ]
  },
  password: {
    title: "كلمات المرور",
    description: "إنشاء كلمات مرور قوية لحماية حساباتك",
    icon: "🔑",
    color: "#06b6d4",
    colorLight: "rgba(6, 182, 212, 0.1)",
    lessons: [
      {
        id: "password-1",
        title: "أسرار كلمة المرور",
        description: "لماذا نحتاج كلمة مرور؟",
        image: "/images/password.png",
        duration: "8 دقائق",
        content: [
          { type: "text", text: "كلمة المرور هي المفتاح الذي يحمي حساباتك" },

          { type: "tip", text: "💡 فكر في كلمة مرورك كفرشاة أسنان - لا تشاركها مع أحد!" }
        ],
        quiz: [
          { question: "لماذا نحتاج كلمة مرور قوية؟", options: ["لأنها متعة", "لحماية حسابك", "لأن الجميع لها", "لأن الموقع يطلبها"], correct: 1 }
        ]
      }
    ]
  },
  safety: {
    title: "الأمان الرقمي",
    description: "أساسيات الحماية على الإنترنت والسلوك الإيجابي",
    icon: "🛡️",
    color: "#10b981",
    colorLight: "rgba(16, 185, 129, 0.1)",
    lessons: [
      {
        id: "safety-1",
        title: "قواعد السلوك الرقمي",
        description: "أدب الإنترنت",
        image: "/images/safety.png",
        duration: "10 دقائق",
        content: [
          { type: "text", text: "أدب الإنترنت مثل أدب الطريق - نحتاج قواعد للسلوك" },

          { type: "list", items: ["كن لطيفاً مع الآخرين", "لا تكتب ما لن تقوله وجهاً لوجه", "احترم خصوصية الآخرين", "لا تنشر أشياء ستندم عليها"] },
          { type: "tip", text: "💡 إذا لم تكن متأكداً، لا تكتب!" }
        ],
        quiz: [
          { question: "ماذا تفعل لو رأيت تنمراً إلكترونياً؟", options: ["تتنمر أيضاً", "تنشره للجميع", "تحذر الشخص", "تبلغ شخصاً بالغاً"], correct: 3 }
        ]
      }
    ]
  }
};

export const allUnits = Object.entries(unitsData).map(([id, data]) => ({
  id,
  ...data
}));
