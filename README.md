# Gentle AI - منصة الذكاء الاصطناعي المتقدمة

![Gentle AI Logo](./assets/logo.svg)

## نظرة عامة

**Gentle AI** هو تطبيق ويب متقدم للذكاء الاصطناعي يجمع بين قوة نماذج OpenAI اللغوية الكبيرة (LLMs) وتصميم واجهة مستخدم حديث ومتجاوب. يوفر التطبيق تجربة دردشة تفاعلية مع الذكاء الاصطناعي، مع دعم للمحادثات المتقدمة وإنشاء المحتوى. تم تطوير الواجهة الخلفية باستخدام **Node.js و Express** لضمان الأداء العالي وقابلية التوسع.

## الميزات الرئيسية

### 🚀 **قدرات متقدمة**
- **دردشة تفاعلية**: واجهة دردشة سلسة وسريعة مع الذكاء الاصطناعي
- **نماذج متعددة**: دعم لنماذج OpenAI المختلفة (GPT-4.1-mini، GPT-4.1-nano، Gemini-2.5-flash)
- **استجابة فورية**: ردود سريعة ودقيقة على استفساراتك
- **واجهة عربية**: دعم كامل للغة العربية في الواجهة والمحادثات

### 🎨 **تصميم احترافي**
- **واجهة مستخدم حديثة**: تصميم مستوحى من OpenAI Chat
- **تصميم متجاوب**: يعمل بشكل مثالي على جميع الأجهزة (سطح المكتب، الأجهزة اللوحية، الهواتف)
- **ألوان متناسقة**: نظام ألوان داكن مريح للعين
- **تجربة مستخدم سلسة**: انتقالات سلسة وتفاعلات دقيقة

### 🔒 **أمان وموثوقية**
- **API آمن**: جميع الاتصالات مشفرة ومحمية
- **إدارة المفاتيح**: تخزين آمن لمفاتيح API
- **معالجة الأخطاء**: معالجة شاملة للأخطاء ورسائل واضحة للمستخدم

## البنية المعمارية

```
gentle-ai-project/
├── gentle-ai-frontend/          # تطبيق React للواجهة الأمامية
│   ├── src/
│   │   ├── components/          # مكونات React
│   │   │   ├── Navbar.jsx       # شريط التنقل
│   │   │   ├── HeroSection.jsx  # قسم البطل
│   │   │   ├── FeaturesSection.jsx  # قسم الميزات
│   │   │   ├── Footer.jsx       # التذييل
│   │   │   └── ChatPage.jsx     # صفحة الدردشة
│   │   ├── App.jsx              # المكون الرئيسي
│   │   └── App.css              # الأنماط العامة
│   ├── public/
│   │   └── assets/              # الأصول (الشعارات، الأيقونات)
│   └── package.json
│
├── gentle-ai-backend-nodejs/    # تطبيق Node.js/Express للواجهة الخلفية
│   ├── routes/                  # مسارات API للدردشة
│   │   └── chat.js
│   ├── .env                     # متغيرات البيئة (مفاتيح API)
│   ├── server.js                # نقطة الدخول الرئيسية
│   └── package.json             # تبعيات Node.js
│
├── design-ref/                  # صور مرجعية للتصميم
├── assets/                      # أصول المشروع (الشعارات)
├── design-analysis.md           # تحليل التصميم
├── openai-tools-notes.md        # ملاحظات حول أدوات OpenAI
├── requirements-breakdown.md    # تفكيك المتطلبات
├── architecture-and-technical-solutions.md  # الحلول المعمارية
├── detailed-plan-and-recommendations.md     # خطة العمل المفصلة
├── design-system.md             # نظام التصميم
├── Home_Landing_Page_Mockup.md  # تصميم الصفحة الرئيسية
├── Chat_Interface_Mockup.md     # تصميم واجهة الدردشة
└── README.md                    # هذا الملف
```

## التقنيات المستخدمة

### الواجهة الأمامية (Frontend)
- **React 18**: مكتبة JavaScript لبناء واجهات المستخدم
- **React Router**: للتنقل بين الصفحات
- **Vite**: أداة بناء سريعة وحديثة
- **CSS3**: للتصميم والأنماط

### الواجهة الخلفية (Backend)
- **Node.js**: بيئة تشغيل JavaScript
- **Express.js**: إطار عمل Node.js لبناء واجهات برمجة التطبيقات
- **OpenAI API**: للوصول إلى نماذج اللغة الكبيرة
- **cors**: لإدارة CORS
- **dotenv**: لإدارة متغيرات البيئة

### النماذج اللغوية (LLMs)
- **GPT-4.1-mini**: نموذج OpenAI للمحادثة وإنشاء المحتوى
- **GPT-4.1-nano**: نموذج خفيف وسريع
- **Gemini-2.5-flash**: نموذج Google للمحادثات السريعة
- **DeepSeek-Reasoner**: نموذج متخصص في التفكير والتحليل

## التثبيت والإعداد

### المتطلبات الأساسية
- **Node.js** (الإصدار 18 أو أحدث)
- **npm** أو **yarn**
- **مفتاح OpenAI API**
- **مفتاح DeepSeek API**

### خطوات التثبيت

#### 1. استنساخ المشروع
```bash
cd /home/ubuntu/gentle-ai-project
```

#### 2. إعداد الواجهة الأمامية
```bash
cd gentle-ai-frontend
npm install
npm run build
```

#### 3. إعداد الواجهة الخلفية (Node.js)
```bash
cd ../gentle-ai-backend-nodejs
npm install
```

#### 4. تكوين متغيرات البيئة
قم بتحرير ملف `.env` في مجلد `gentle-ai-backend-nodejs` وأضف مفاتيح API الخاصة بك:

```env
OPENAI_API_KEY=your_openai_api_key_here
GENTLE_API_KEY=your_admin_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
PORT=5000

# Neon Database
DATABASE_URL=your_neon_database_url
DATABASE_URL_UNPOOLED=your_neon_database_url_unpooled
PGHOST=your_pghost
PGHOST_UNPOOLED=your_pghost_unpooled
PGUSER=your_pguser
PGDATABASE=your_pgdatabase
PGPASSWORD=your_pgpassword
POSTGRES_URL=your_postgres_url
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling
POSTGRES_USER=your_postgres_user
POSTGRES_HOST=your_postgres_host
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
POSTGRES_URL_NO_SSL=your_postgres_url_no_ssl
POSTGRES_PRISMA_URL=your_postgres_prisma_url
NEXT_PUBLIC_STACK_PROJECT_ID=your_stack_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_stack_publishable_client_key
STACK_SECRET_SERVER_KEY=your_stack_secret_server_key

# Vercel Blob Storage
gentle_READ_WRITE_TOKEN=your_vercel_blob_read_write_token

# Upstash Redis
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token

# Supabase
POSTGRES_URL_SUPABASE=your_supabase_postgres_url
POSTGRES_USER_SUPABASE=your_supabase_postgres_user
POSTGRES_HOST_SUPABASE=your_supabase_postgres_host
SUPABASE_JWT_SECRET=your_supabase_jwt_secret
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
POSTGRES_PRISMA_URL_SUPABASE=your_supabase_postgres_prisma_url
POSTGRES_PASSWORD_SUPABASE=your_supabase_postgres_password
POSTGRES_DATABASE_SUPABASE=your_supabase_postgres_database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY_SUPABASE=your_supabase_anon_key_supabase
NEXT_PUBLIC_SUPABASE_URL=your_next_public_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
POSTGRES_URL_NON_POOLING_SUPABASE=your_supabase_postgres_url_non_pooling
```

## التشغيل

### تشغيل الواجهة الخلفية (Node.js)
```bash
cd gentle-ai-backend-nodejs
npm start
```
الخادم سيعمل على: `http://localhost:5000`

### تشغيل الواجهة الأمامية (React)
(الواجهة الأمامية يتم تقديمها بواسطة خادم Node.js)

- قم بزيارة `http://localhost:5000` لرؤية الصفحة الرئيسية والتطبيق بالكامل.

## استخدام التطبيق

### الصفحة الرئيسية
- قم بزيارة `http://localhost:5000` لرؤية الصفحة الرئيسية
- انقر على "ابدأ الآن" للانتقال إلى صفحة الدردشة

### صفحة الدردشة
- اكتب سؤالك أو رسالتك في حقل الإدخال
- انقر على "إرسال" أو اضغط Enter
- انتظر الرد من Gentle AI
- يمكنك بدء محادثة جديدة بالنقر على "محادثة جديدة"

## API Endpoints

### POST /api/chat
**الوصف**: إرسال رسالة إلى الذكاء الاصطناعي والحصول على رد باستخدام نماذج OpenAI

**الطلب**:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "ما هو الذكاء الاصطناعي؟"
    }
  ],
  "model": "gpt-4.1-mini",
  "stream": false
}
```

**الاستجابة**:
```json
{
  "content": "الذكاء الاصطناعي هو...",
  "model": "gpt-4.1-mini",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}
```

### POST /api/chat/deepseek
**الوصف**: إرسال رسالة إلى نموذج DeepSeek للتفكير والتحليل

**الطلب**: نفس تنسيق `/api/chat`

## نظام التصميم

### لوحة الألوان
- **الخلفية الرئيسية**: `#1a1a1a`
- **الخلفية الثانوية**: `#171717`
- **الحدود**: `#2d2d2d`
- **النص الأساسي**: `#ffffff`
- **النص الثانوي**: `#d1d5db`
- **النص الباهت**: `#9ca3af`
- **اللون المميز**: `#10b981` (أخضر زمردي)
- **اللون المميز (hover)**: `#059669`

### الطباعة
- **الخط الأساسي**: System UI (Arial, Helvetica, sans-serif)
- **أحجام الخط**:
  - العناوين الكبيرة: 48px
  - العناوين المتوسطة: 24px
  - النص العادي: 14px
  - النص الصغير: 12px

### المكونات
- **الأزرار**: زوايا مستديرة (8px)، تأثيرات hover سلسة
- **البطاقات**: خلفية داكنة، حدود رفيعة، ظل خفيف
- **حقول الإدخال**: خلفية داكنة، حدود رفيعة، تركيز واضح

## المشاكل الشائعة والحلول

### 1. خطأ "Insufficient credits"
**المشكلة**: رصيد حساب OpenAI API قد نفد
**الحل**: قم بإضافة رصيد إلى حساب OpenAI API الخاص بك

### 2. خطأ CORS
**المشكلة**: المتصفح يمنع الطلبات بسبب CORS
**الحل**: تم تكوين `cors` في الواجهة الخلفية Node.js لمعالجة هذه المشكلة.

### 3. خطأ "Port already in use"
**المشكلة**: المنفذ مستخدم من قبل عملية أخرى
**الحل**: أوقف العملية القديمة أو استخدم منفذ مختلف

## خارطة الطريق

### المرحلة الحالية ✅
- [x] تصميم الواجهة الأمامية
- [x] تطوير صفحة الدردشة
- [x] تكامل OpenAI API (مع Node.js)
- [x] معالجة الأخطاء الأساسية
- [x] تحويل الواجهة الخلفية إلى Node.js/Express

### المرحلة القادمة 🚧
- [ ] إضافة نظام المصادقة والتسجيل
- [ ] لوحة تحكم المستخدم
- [ ] حفظ المحادثات في قاعدة البيانات
- [ ] دعم الاستجابة المتدفقة (عند توفر API مناسب)
- [ ] تكامل DeepSeek AI للتفكير المتقدم
- [ ] صفحة API والوثائق
- [ ] صفحة "حول" و"الأسعار"

### المستقبل 🔮
- [ ] تطبيق الهاتف المحمول (React Native)
- [ ] دعم الصور والملفات
- [ ] مساعد صوتي
- [ ] تكامل مع أدوات خارجية
- [ ] نماذج مخصصة للمستخدمين

## المساهمة

نرحب بالمساهمات! إذا كنت ترغب في المساهمة في تطوير Gentle AI:

1. قم بعمل Fork للمشروع
2. أنشئ فرع جديد (`git checkout -b feature/AmazingFeature`)
3. قم بعمل Commit لتغييراتك (`git commit -m \'Add some AmazingFeature\' `)
4. ادفع إلى الفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## الاتصال والدعم

- **الموقع الإلكتروني**: [Gentel.ai](https://gentel.ai)
- **البريد الإلكتروني**: support@gentel.ai
- **GitHub**: [github.com/gentel-ai](https://github.com/gentel-ai)

## الشكر والتقدير

- **OpenAI**: لتوفير نماذج اللغة الكبيرة القوية
- **React**: لإطار العمل الرائع
- **Node.js/Express**: لإطار العمل القوي والمرن
- **المجتمع**: لجميع المساهمين والمستخدمين

---

**صنع بـ ❤️ بواسطة فريق Gentle AI**

