# دليل النشر على Vercel

## نظرة عامة

تم إعادة هيكلة المشروع ليعمل بالكامل على Vercel باستخدام Serverless Functions بدلاً من Flask.

## البنية الجديدة

```
drx/
├── api/                          # Vercel Serverless Functions
│   ├── chat.py                   # دردشة مع OpenAI
│   ├── deepseek.py               # دردشة مع DeepSeek
│   ├── models.py                 # قائمة النماذج
│   └── requirements.txt          # متطلبات Python
├── gentle-ai-frontend/           # الواجهة الأمامية (React + Vite)
├── gentle_ai_backend/            # الخادم القديم (Flask) - لم يعد مستخدماً
├── vercel.json                   # تكوين Vercel
├── .env                          # متغيرات البيئة للتطوير المحلي
└── .env.example                  # مثال على متغيرات البيئة
```

## التغييرات الرئيسية

### 1. تحويل Flask إلى Vercel Serverless Functions

تم تحويل جميع routes من Flask إلى Vercel Serverless Functions:

- **`/api/chat`** → `api/chat.py`
- **`/api/chat/deepseek`** → `api/deepseek.py`
- **`/api/models`** → `api/models.py`

### 2. إصلاح الأخطاء

- إصلاح استخدام `deepseek_client` في دالة DeepSeek (كان يستخدم `client` بالخطأ)
- إضافة معالجة CORS بشكل صحيح
- تحسين معالجة الأخطاء

### 3. إضافة ملف vercel.json

تم إنشاء ملف `vercel.json` لتكوين النشر على Vercel:

- تحديد مسارات API
- إعداد rewrites
- تكوين متغيرات البيئة

## خطوات النشر على Vercel

### 1. رفع الكود إلى GitHub

```bash
git add .
git commit -m "Migrate to Vercel Serverless Functions"
git push origin main
```

### 2. ربط المشروع مع Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول أو أنشئ حساب
3. انقر على "Add New Project"
4. اختر المستودع `openaziz00-sudo/drx`
5. اختر إطار العمل: **Other**

### 3. تكوين متغيرات البيئة

في إعدادات المشروع على Vercel، أضف المتغيرات التالية:

#### OpenAI
```
OPENAI_API_KEY=your_openai_api_key_here
```

#### DeepSeek (إذا كان متوفراً)
```
DEEPSEEK_API_KEY=your_deepseek_api_key
```

#### Supabase
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Database (Neon)
```
POSTGRES_URL=your_postgres_url
DATABASE_URL=your_database_url
```

#### Vercel Blob
```
GENTLE_READ_WRITE_TOKEN=your_vercel_blob_token
```

### 4. تكوين Build Settings

في Vercel، تأكد من:

- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: `cd gentle-ai-frontend && pnpm install && pnpm build`
- **Output Directory**: `gentle-ai-frontend/dist`

### 5. النشر

انقر على "Deploy" وانتظر حتى يكتمل النشر.

## الاختبار المحلي

لاختبار المشروع محلياً:

### 1. تثبيت Vercel CLI

```bash
npm install -g vercel
```

### 2. تسجيل الدخول

```bash
vercel login
```

### 3. تشغيل المشروع محلياً

```bash
vercel dev
```

سيتم تشغيل المشروع على `http://localhost:3000`

## نقاط API

بعد النشر، ستكون نقاط API متاحة على:

- **POST** `/api/chat` - دردشة مع OpenAI
- **POST** `/api/deepseek` - دردشة مع DeepSeek
- **GET** `/api/models` - قائمة النماذج المتاحة

## الأمان

- جميع مفاتيح API محمية في متغيرات البيئة
- CORS مفعل للسماح بالطلبات من الواجهة الأمامية
- لا يتم تخزين المفاتيح في الكود

## استكشاف الأخطاء

### خطأ في API

إذا واجهت خطأ في API:

1. تحقق من متغيرات البيئة في Vercel
2. راجع سجلات Vercel (Logs)
3. تأكد من صحة مفاتيح API

### خطأ في البناء

إذا فشل البناء:

1. تحقق من `package.json` في `gentle-ai-frontend`
2. تأكد من تثبيت جميع التبعيات
3. راجع سجل البناء في Vercel

## الدعم

للمزيد من المساعدة، راجع:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## الملاحظات

- الخادم القديم (Flask) في مجلد `gentle_ai_backend` لم يعد مستخدماً
- يمكن حذف مجلد `gentle_ai_backend` إذا أردت
- جميع الوظائف الآن تعمل على Vercel Serverless Functions
