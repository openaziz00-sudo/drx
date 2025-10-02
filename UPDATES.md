# Gentle AI - التحديثات الجديدة

## تاريخ التحديث: 3 أكتوبر 2025

تم إضافة مجموعة من المزايا الجديدة والمتقدمة إلى منصة Gentle AI لتحسين تجربة المستخدم وتوفير إمكانيات أكثر قوة.

## المزايا الجديدة المضافة

### 1. نظام المصادقة والتسجيل ✅

تم إضافة نظام مصادقة كامل يتضمن:

- **تسجيل المستخدمين الجدد**: إنشاء حسابات جديدة بأمان
- **تسجيل الدخول**: نظام آمن باستخدام JWT tokens
- **إدارة الجلسات**: الحفاظ على جلسات المستخدمين بشكل آمن
- **تحديث الملف الشخصي**: إمكانية تعديل معلومات الحساب
- **تغيير كلمة المرور**: نظام آمن لتغيير كلمة المرور

**API Endpoints:**
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/auth/me` - الحصول على معلومات المستخدم الحالي
- `PUT /api/auth/profile` - تحديث الملف الشخصي
- `POST /api/auth/change-password` - تغيير كلمة المرور

### 2. لوحة تحكم المستخدم ✅

لوحة تحكم شاملة تتضمن:

- **عرض المحادثات السابقة**: قائمة بجميع محادثات المستخدم
- **إحصائيات الاستخدام**: عدد الرسائل والمحادثات
- **إدارة المحادثات**: إمكانية حذف وتعديل المحادثات
- **روابط سريعة**: الوصول السريع للميزات الرئيسية
- **معلومات الحساب**: عرض تفاصيل الحساب

**المسار:** `/dashboard`

### 3. حفظ المحادثات في قاعدة البيانات ✅

نظام متكامل لحفظ واسترجاع المحادثات:

- **حفظ تلقائي**: حفظ جميع الرسائل تلقائياً
- **استرجاع المحادثات**: إمكانية العودة للمحادثات السابقة
- **تنظيم المحادثات**: ترتيب حسب التاريخ والنشاط
- **بحث في المحادثات**: (قريباً)

**قاعدة البيانات:**
- PostgreSQL (Neon)
- Prisma ORM
- جداول: Users, Conversations, Messages, ApiKeys

**API Endpoints:**
- `GET /api/conversations` - الحصول على جميع المحادثات
- `GET /api/conversations/:id` - الحصول على محادثة محددة
- `POST /api/conversations` - إنشاء محادثة جديدة
- `PUT /api/conversations/:id` - تحديث عنوان المحادثة
- `DELETE /api/conversations/:id` - حذف محادثة
- `POST /api/conversations/:id/messages` - إضافة رسالة

### 4. دعم الاستجابة المتدفقة (Streaming) ✅

تم تفعيل الاستجابة المتدفقة في الواجهة الأمامية:

- **استجابة فورية**: عرض الرد أثناء كتابته
- **تجربة أفضل**: تفاعل أكثر طبيعية مع الذكاء الاصطناعي
- **دعم جميع النماذج**: يعمل مع OpenAI وDeepSeek
- **إمكانية الإيقاف**: إيقاف الاستجابة في أي وقت

### 5. تكامل DeepSeek AI ✅

تكامل كامل مع نموذج DeepSeek للتفكير المتقدم:

- **نموذج DeepSeek Reasoner**: للتفكير والتحليل المتقدم
- **اختيار النموذج**: إمكانية التبديل بين النماذج
- **API منفصل**: `/api/chat/deepseek`
- **دعم Streaming**: استجابة متدفقة

**النماذج المتاحة:**
- GPT-4.1-mini (OpenAI)
- GPT-4.1-nano (OpenAI)
- DeepSeek Reasoner (DeepSeek)

### 6. صفحة API والوثائق ✅

صفحة توثيق شاملة للمطورين:

- **دليل البدء السريع**: خطوات سريعة للبدء
- **توثيق كامل للـ API**: جميع endpoints مع أمثلة
- **أمثلة بلغات مختلفة**: Python, JavaScript, cURL
- **معلومات حدود الاستخدام**: Rate limits لكل خطة
- **أمثلة عملية**: نماذج جاهزة للاستخدام

**المسار:** `/api-docs`

### 7. صفحة "حول" و"الأسعار" ✅

صفحات معلوماتية احترافية:

#### صفحة About (`/about`)
- رؤية ورسالة الشركة
- معلومات عن الفريق
- التقنيات المستخدمة
- ما يميز Gentle AI

#### صفحة Pricing (`/pricing`)
- ثلاث خطط: مجانية، احترافية، مؤسسات
- مقارنة تفصيلية للميزات
- أسئلة شائعة عن الأسعار
- أزرار الاشتراك المباشر

#### صفحة Contact (`/contact`)
- نموذج اتصال تفاعلي
- معلومات التواصل
- أوقات الاستجابة
- روابط للموارد الإضافية

## البنية التقنية المحدثة

### الواجهة الخلفية (Backend)

```
gentle-ai-backend-nodejs/
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── chat.js              # Chat endpoints (OpenAI & DeepSeek)
│   ├── auth.js              # Authentication endpoints
│   └── conversations.js     # Conversations management
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── .env                     # Environment variables (NOT in git)
├── .gitignore              # Git ignore rules
├── package.json
└── server.js               # Main server file
```

### الواجهة الأمامية (Frontend)

```
gentle-ai-frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Register.jsx        # Registration page
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx       # User dashboard
│   │   ├── ui/                     # Shadcn UI components
│   │   ├── ChatPageNew.jsx         # Updated chat page
│   │   ├── ApiDocs.jsx            # API documentation
│   │   ├── About.jsx              # About page
│   │   ├── Pricing.jsx            # Pricing page
│   │   └── Contact.jsx            # Contact page
│   ├── lib/
│   │   └── utils.js               # Utility functions
│   └── App.jsx                    # Main app with routes
└── package.json
```

## قاعدة البيانات (Database Schema)

### جدول Users
- `id` - معرف فريد
- `email` - البريد الإلكتروني (فريد)
- `password` - كلمة المرور المشفرة
- `name` - اسم المستخدم
- `stackUserId` - معرف Stack Auth (اختياري)
- `createdAt` - تاريخ الإنشاء
- `updatedAt` - تاريخ آخر تحديث

### جدول Conversations
- `id` - معرف فريد
- `title` - عنوان المحادثة
- `userId` - معرف المستخدم
- `createdAt` - تاريخ الإنشاء
- `updatedAt` - تاريخ آخر تحديث

### جدول Messages
- `id` - معرف فريد
- `conversationId` - معرف المحادثة
- `role` - دور الرسالة (user/assistant)
- `content` - محتوى الرسالة
- `model` - النموذج المستخدم
- `tokens` - عدد التوكنات
- `createdAt` - تاريخ الإنشاء

### جدول ApiKeys
- `id` - معرف فريد
- `key` - مفتاح API
- `name` - اسم المفتاح
- `userId` - معرف المستخدم
- `isActive` - حالة التفعيل
- `lastUsed` - آخر استخدام
- `createdAt` - تاريخ الإنشاء

## المتغيرات البيئية المطلوبة

يجب إنشاء ملف `.env` في مجلد `gentle-ai-backend-nodejs` مع المتغيرات التالية:

```env
# API Keys
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key

# Database (Neon PostgreSQL)
DATABASE_URL=your_database_url

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Server Port
PORT=5000

# Stack Auth (Optional)
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
STACK_SECRET_SERVER_KEY=your_stack_secret_key

# Vercel Blob (Optional)
BLOB_READ_WRITE_TOKEN=your_blob_token
```

**⚠️ مهم:** لا تقم أبداً برفع ملف `.env` إلى GitHub!

## التثبيت والتشغيل

### 1. تثبيت Dependencies

```bash
# Backend
cd gentle-ai-backend-nodejs
npm install

# Frontend
cd ../gentle-ai-frontend
npm install --legacy-peer-deps
```

### 2. إعداد قاعدة البيانات

```bash
cd gentle-ai-backend-nodejs
npx prisma migrate dev
```

### 3. بناء الواجهة الأمامية

```bash
cd gentle-ai-frontend
npm run build

# نسخ الملفات إلى الواجهة الخلفية
cp -r dist/* ../gentle-ai-backend-nodejs/public/
```

### 4. تشغيل الخادم

```bash
cd gentle-ai-backend-nodejs
npm start
```

الخادم سيعمل على: `http://localhost:5000`

## المسارات المتاحة

- `/` - الصفحة الرئيسية
- `/chat` - صفحة الدردشة
- `/chat/:conversationId` - محادثة محددة
- `/login` - تسجيل الدخول
- `/register` - التسجيل
- `/dashboard` - لوحة التحكم
- `/api-docs` - توثيق API
- `/about` - عن Gentle AI
- `/pricing` - الأسعار
- `/contact` - اتصل بنا

## الأمان

تم اتخاذ إجراءات أمان شاملة:

- ✅ تشفير كلمات المرور باستخدام bcrypt
- ✅ JWT tokens للمصادقة
- ✅ حماية endpoints باستخدام middleware
- ✅ التحقق من صحة المدخلات
- ✅ عدم رفع المفاتيح السرية إلى Git
- ✅ CORS configuration
- ✅ معالجة الأخطاء الشاملة

## النشر على Vercel

يمكن نشر التطبيق على Vercel باتباع الخطوات:

1. ربط المستودع مع Vercel
2. إضافة المتغيرات البيئية في لوحة تحكم Vercel
3. تكوين Build Settings:
   - Build Command: `cd gentle-ai-frontend && npm install --legacy-peer-deps && npm run build && cp -r dist/* ../gentle-ai-backend-nodejs/public/`
   - Output Directory: `gentle-ai-backend-nodejs`
4. النشر

## التحسينات المستقبلية

- [ ] نظام البحث في المحادثات
- [ ] تصدير المحادثات
- [ ] دعم الملفات والصور
- [ ] إحصائيات متقدمة
- [ ] نظام الإشعارات
- [ ] تطبيق الهاتف المحمول
- [ ] دعم المزيد من النماذج
- [ ] نماذج مخصصة للمستخدمين

## المساهمة

نرحب بالمساهمات! يرجى:
1. عمل Fork للمشروع
2. إنشاء فرع جديد للميزة
3. Commit التغييرات
4. Push إلى الفرع
5. فتح Pull Request

## الدعم

للحصول على الدعم:
- البريد الإلكتروني: support@gentel.ai
- التوثيق: `/api-docs`
- GitHub Issues

---

**تم التطوير بواسطة فريق Gentle AI**
