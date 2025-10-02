# دليل البدء السريع - نشر التطبيق على Vercel

## الخطوات السريعة (5 دقائق)

### 1️⃣ ربط المشروع مع Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول أو أنشئ حساب جديد
3. انقر على **"Add New Project"**
4. اختر المستودع: **`openaziz00-sudo/drx`**
5. انقر على **"Import"**

### 2️⃣ تكوين المشروع

في صفحة التكوين:

**Framework Preset**: اختر **"Other"**

**Root Directory**: اتركه كما هو (`./`)

**Build Settings**:
- Build Command: `cd gentle-ai-frontend && pnpm install && pnpm build`
- Output Directory: `gentle-ai-frontend/dist`

### 3️⃣ إضافة متغيرات البيئة

انقر على **"Environment Variables"** وأضف المتغيرات التالية:

**مطلوب (Required)**:
```
OPENAI_API_KEY=<your_openai_key>
```

**اختياري (Optional)**:
```
DEEPSEEK_API_KEY=<your_deepseek_key>
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_anon_key>
POSTGRES_URL=<your_postgres_url>
```

> 💡 **ملاحظة**: القيم الفعلية موجودة في ملف `.env` المحلي

### 4️⃣ النشر

انقر على **"Deploy"** وانتظر 2-3 دقائق

### 5️⃣ اختبار التطبيق

بعد اكتمال النشر:
1. انقر على رابط التطبيق
2. اذهب إلى صفحة الدردشة `/chat`
3. جرب إرسال رسالة

---

## نقاط API المتاحة

| Endpoint | الوصف |
|----------|-------|
| `POST /api/chat` | دردشة مع OpenAI |
| `POST /api/deepseek` | دردشة مع DeepSeek |
| `GET /api/models` | قائمة النماذج |

---

## استكشاف الأخطاء السريع

### ❌ خطأ: "API key not configured"
**الحل**: تحقق من إضافة `OPENAI_API_KEY` في متغيرات البيئة

### ❌ خطأ: "Build failed"
**الحل**: تأكد من Build Command صحيح:
```
cd gentle-ai-frontend && pnpm install && pnpm build
```

### ❌ خطأ: "404 Not Found"
**الحل**: تحقق من Output Directory:
```
gentle-ai-frontend/dist
```

---

## الدعم

للمزيد من التفاصيل، راجع:
- 📖 [README-DEPLOYMENT.md](./README-DEPLOYMENT.md) - دليل النشر الكامل
- 📊 [MIGRATION_REPORT.md](./MIGRATION_REPORT.md) - تقرير الترحيل الشامل

---

**تم! التطبيق الآن على الإنترنت** 🎉
