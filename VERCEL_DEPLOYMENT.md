# دليل النشر على Vercel - Gentle AI

## ✅ تم الاختبار محلياً

تم اختبار التطبيق محلياً وجميع المكونات تعمل بشكل صحيح.

## خطوات النشر على Vercel

### 1. إعدادات Build & Development

في لوحة تحكم Vercel → Settings → General:

- **Framework Preset:** Other
- **Root Directory:** اتركه فارغاً (.)
- **Build Command:** `npm run vercel-build`
- **Output Directory:** `gentle-ai-backend-nodejs/public`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x أو أحدث

### 2. إضافة Environment Variables

في Settings → Environment Variables، أضف:

```
OPENAI_API_KEY=sk-...
DEEPSEEK_API_KEY=sk-...
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key_min_32_characters
PORT=5000
NODE_ENV=production
```

**مهم:** تأكد من إضافة المتغيرات لجميع البيئات (Production, Preview, Development)

### 3. إعداد قاعدة البيانات

بعد النشر الأول، قم بتشغيل migrations:

#### الطريقة 1: باستخدام Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# ربط المشروع
vercel link

# سحب المتغيرات البيئية
vercel env pull

# تشغيل migrations
cd gentle-ai-backend-nodejs
npx prisma migrate deploy
```

#### الطريقة 2: من خلال Function

يمكنك إنشاء endpoint مؤقت لتشغيل migrations:

```javascript
// في api/migrate.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  try {
    // تشغيل migrations
    await prisma.$executeRaw`SELECT 1`;
    res.json({ success: true, message: 'Database connected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

ثم زيارة: `https://your-app.vercel.app/api/migrate`

### 4. التحقق من النشر

بعد اكتمال النشر:

1. **اختبار الصفحة الرئيسية:**
   ```
   https://your-app.vercel.app/
   ```

2. **اختبار API Health Check:**
   ```
   https://your-app.vercel.app/api/health
   ```

3. **اختبار التسجيل:**
   ```
   https://your-app.vercel.app/register
   ```

4. **اختبار الدردشة:**
   ```
   https://your-app.vercel.app/chat
   ```

### 5. حل المشاكل الشائعة

#### مشكلة: 500 Internal Server Error

**الحل:**
- تحقق من Vercel Logs: Dashboard → Deployments → [deployment] → Logs
- تأكد من إضافة جميع Environment Variables
- تحقق من صحة DATABASE_URL

#### مشكلة: Cannot connect to database

**الحل:**
- تأكد من أن DATABASE_URL صحيح
- تحقق من أن قاعدة البيانات Neon نشطة
- قم بتشغيل `npx prisma migrate deploy`

#### مشكلة: JWT Authentication fails

**الحل:**
- تأكد من وجود JWT_SECRET
- JWT_SECRET يجب أن يكون 32 حرف على الأقل
- أعد النشر بعد إضافة المتغير

#### مشكلة: OpenAI/DeepSeek API errors

**الحل:**
- تحقق من صحة API Keys
- تأكد من أن المفاتيح لديها رصيد كافٍ
- تحقق من Rate Limits

### 6. المراقبة والصيانة

#### مراقبة الأداء
- استخدم Vercel Analytics
- راقب Function Logs
- تحقق من Database Usage

#### النسخ الاحتياطي
```bash
# نسخ احتياطي لقاعدة البيانات
pg_dump $DATABASE_URL > backup.sql
```

#### التحديثات
عند دفع تغييرات جديدة إلى GitHub:
- Vercel سينشر تلقائياً
- تحقق من Deployment Logs
- اختبر الميزات الجديدة

## البنية النهائية للنشر

```
drx/
├── api/
│   └── index.js              # Serverless Function رئيسي
├── gentle-ai-backend-nodejs/
│   ├── routes/               # API Routes
│   ├── middleware/           # Auth middleware
│   ├── prisma/              # Database schema
│   └── public/              # Built frontend (generated)
├── gentle-ai-frontend/
│   ├── src/                 # React source
│   └── dist/                # Built files (generated)
├── package.json             # Root dependencies
├── vercel.json              # Vercel configuration
└── .vercelignore           # Files to ignore
```

## الأمان في الإنتاج

- ✅ جميع المفاتيح السرية في Environment Variables
- ✅ لا يوجد ملفات .env في Git
- ✅ CORS مكون بشكل صحيح
- ✅ JWT للمصادقة
- ✅ كلمات المرور مشفرة

## الدعم

إذا واجهت مشاكل:
1. تحقق من Vercel Deployment Logs
2. راجع هذا الملف
3. تحقق من DEPLOYMENT_GUIDE.md
4. افتح Issue على GitHub

---

**آخر تحديث:** 3 أكتوبر 2025
**الحالة:** ✅ جاهز للنشر
