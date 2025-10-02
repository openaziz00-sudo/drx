# 🚀 انشر التطبيق الآن - خطوة بخطوة

## ✅ التطبيق جاهز تماماً للنشر!

تم إعداد كل شيء. اتبع هذه الخطوات البسيطة:

---

## الخطوة 1: اذهب إلى Vercel

افتح المتصفح واذهب إلى: **https://vercel.com**

---

## الخطوة 2: سجل الدخول أو أنشئ حساب

- إذا كان لديك حساب: سجل الدخول
- إذا لم يكن لديك حساب: أنشئ حساب جديد (مجاني)

---

## الخطوة 3: أنشئ مشروع جديد

1. انقر على زر **"Add New Project"**
2. اختر **"Import Git Repository"**
3. إذا لم يكن GitHub متصل، اتصل به
4. ابحث عن المستودع: **`openaziz00-sudo/drx`**
5. انقر على **"Import"**

---

## الخطوة 4: تكوين المشروع

في صفحة التكوين:

### Framework Preset
اختر: **"Other"**

### Root Directory
اتركه: **`./`** (الافتراضي)

### Build Command
```bash
cd gentle-ai-frontend && pnpm install && pnpm build
```

### Output Directory
```
gentle-ai-frontend/dist
```

### Install Command
اتركه فارغاً أو: **`pnpm install`**

---

## الخطوة 5: أضف متغيرات البيئة

انقر على **"Environment Variables"**

### المتغير المطلوب (إلزامي):

**Name**: `OPENAI_API_KEY`  
**Value**: `<انسخ من ملف VERCEL_ENV_VARS.txt>`

### المتغيرات الاختيارية (يمكن إضافتها لاحقاً):

انظر ملف `VERCEL_ENV_VARS.txt` لجميع المتغيرات

---

## الخطوة 6: انشر!

انقر على زر **"Deploy"**

⏱️ سيستغرق النشر حوالي 2-3 دقائق

---

## الخطوة 7: اختبر التطبيق

بعد اكتمال النشر:

1. ستحصل على رابط مثل: `https://drx-xxx.vercel.app`
2. افتح الرابط
3. اذهب إلى `/chat` لاختبار الدردشة
4. جرب إرسال رسالة

---

## 🎉 تم! التطبيق الآن على الإنترنت

### نقاط API المتاحة:

- `POST /api/chat` - دردشة مع OpenAI
- `POST /api/deepseek` - دردشة مع DeepSeek
- `GET /api/models` - قائمة النماذج

---

## 🔧 استكشاف الأخطاء

### إذا فشل النشر:

1. تحقق من سجلات البناء (Build Logs)
2. تأكد من Build Command صحيح
3. تأكد من Output Directory صحيح
4. تحقق من إضافة `OPENAI_API_KEY`

### إذا كان API لا يعمل:

1. اذهب إلى Settings → Environment Variables
2. تأكد من إضافة `OPENAI_API_KEY`
3. أعد النشر (Redeploy)

---

## 📱 النشر التلقائي

بعد النشر الأول، كل مرة تقوم فيها بـ push إلى GitHub:
- سيتم النشر تلقائياً
- ستحصل على preview deployment للفروع الأخرى
- الـ main branch سينشر إلى production

---

## 📚 ملفات مفيدة

- `VERCEL_ENV_VARS.txt` - جميع متغيرات البيئة
- `QUICK_START.md` - دليل سريع
- `README-DEPLOYMENT.md` - دليل مفصل
- `MIGRATION_REPORT.md` - تقرير شامل

---

## 🆘 هل تحتاج مساعدة؟

راجع الوثائق:
- Vercel: https://vercel.com/docs
- المشروع على GitHub: https://github.com/openaziz00-sudo/drx

---

**✨ حظاً موفقاً!**
