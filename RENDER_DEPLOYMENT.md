# دليل النشر على Render.com - Gentle AI

## لماذا Render.com؟

- ✅ يدعم Node.js/Express بشكل كامل
- ✅ مجاني للمشاريع الصغيرة (750 ساعة/شهر)
- ✅ نشر تلقائي من GitHub
- ✅ PostgreSQL مجاني (90 يوم)
- ✅ لا يحتاج تعديلات على الكود
- ✅ SSL مجاني

## خطوات النشر

### 1. إنشاء حساب على Render

1. اذهب إلى: https://render.com
2. سجل باستخدام GitHub
3. اربط حساب GitHub الخاص بك

### 2. إنشاء قاعدة بيانات PostgreSQL

1. من Dashboard، اضغط **New +** → **PostgreSQL**
2. املأ البيانات:
   - **Name:** `gentle-ai-db`
   - **Database:** `gentle_ai`
   - **User:** `gentle_ai_user`
   - **Region:** Singapore (أو الأقرب لك)
   - **Plan:** Free
3. اضغط **Create Database**
4. انتظر حتى تصبح الحالة **Available**
5. **احفظ Internal Database URL** - ستحتاجه لاحقاً

### 3. إنشاء Web Service

1. من Dashboard، اضغط **New +** → **Web Service**
2. اختر **Build and deploy from a Git repository**
3. اختر المستودع: `openaziz00-sudo/drx`
4. املأ البيانات:

#### Basic Settings:
- **Name:** `gentle-ai`
- **Region:** Singapore (نفس منطقة قاعدة البيانات)
- **Branch:** `main`
- **Root Directory:** اتركه فارغاً
- **Runtime:** Node
- **Build Command:**
  ```bash
  cd gentle-ai-frontend && npm install --legacy-peer-deps && npm run build && mkdir -p ../gentle-ai-backend-nodejs/public && cp -r dist/* ../gentle-ai-backend-nodejs/public/ && cd ../gentle-ai-backend-nodejs && npm install && npx prisma generate
  ```
- **Start Command:**
  ```bash
  cd gentle-ai-backend-nodejs && npx prisma migrate deploy && node server.js
  ```

#### Advanced Settings:
- **Plan:** Free
- **Auto-Deploy:** Yes

### 4. إضافة Environment Variables

في صفحة Web Service، اذهب إلى **Environment** وأضف:

```
NODE_ENV=production
PORT=5000
OPENAI_API_KEY=sk-your-openai-key
DEEPSEEK_API_KEY=sk-your-deepseek-key
DATABASE_URL=postgresql://gentle_ai_user:password@hostname/gentle_ai
JWT_SECRET=your_jwt_secret_min_32_characters
```

**مهم:** استخدم **Internal Database URL** من الخطوة 2 لـ `DATABASE_URL`

### 5. النشر

1. اضغط **Create Web Service**
2. Render سيبدأ البناء والنشر تلقائياً
3. راقب Logs للتأكد من عدم وجود أخطاء
4. انتظر حتى تظهر الحالة **Live** (قد يستغرق 5-10 دقائق)

### 6. الوصول للتطبيق

بعد اكتمال النشر:

- **URL:** `https://gentle-ai.onrender.com` (أو الاسم الذي اخترته)
- **API Health:** `https://gentle-ai.onrender.com/api/health`

## الاختبار

### 1. اختبار الصفحة الرئيسية
```bash
curl https://gentle-ai.onrender.com/
```

### 2. اختبار API
```bash
curl https://gentle-ai.onrender.com/api/health
```

### 3. اختبار التسجيل
افتح: `https://gentle-ai.onrender.com/register`

### 4. اختبار الدردشة
افتح: `https://gentle-ai.onrender.com/chat`

## حل المشاكل

### مشكلة: Build يفشل

**الحل:**
- تحقق من Logs في Render Dashboard
- تأكد من صحة Build Command
- تحقق من أن جميع dependencies موجودة

### مشكلة: Cannot connect to database

**الحل:**
- تأكد من صحة DATABASE_URL
- استخدم **Internal Database URL** وليس External
- تحقق من أن قاعدة البيانات في نفس المنطقة

### مشكلة: Application crashes

**الحل:**
- تحقق من Logs
- تأكد من إضافة جميع Environment Variables
- تحقق من أن PORT=5000 أو استخدم `process.env.PORT`

### مشكلة: Prisma migrations fail

**الحل:**
- قم بتشغيل migrations يدوياً:
  ```bash
  # في Shell من Render Dashboard
  cd gentle-ai-backend-nodejs
  npx prisma migrate deploy
  ```

## المزايا الإضافية

### Custom Domain
يمكنك ربط نطاق خاص:
1. Settings → Custom Domains
2. أضف النطاق
3. اتبع التعليمات لتحديث DNS

### Auto-Deploy
عند دفع تغييرات إلى GitHub:
- Render سينشر تلقائياً
- راقب Logs للتأكد من النجاح

### Monitoring
- راقب Metrics في Dashboard
- تحقق من Response Times
- راقب استخدام الموارد

### Logs
- الوصول للـ Logs في الوقت الفعلي
- تصفية حسب النوع (Error, Info, etc.)
- تنزيل Logs للتحليل

## الخطة المجانية - القيود

- **750 ساعة/شهر** (كافية لمشروع واحد)
- **Sleep بعد 15 دقيقة** من عدم النشاط
- **Wake-up time:** 30-60 ثانية
- **Bandwidth:** 100 GB/شهر
- **Build time:** 500 دقيقة/شهر

**نصيحة:** لتجنب Sleep، استخدم خدمة Ping مثل:
- UptimeRobot (مجاني)
- Cron-job.org (مجاني)

## الترقية

للحصول على أداء أفضل:
- **Starter Plan:** $7/شهر
  - لا يوجد Sleep
  - 1 GB RAM
  - استجابة فورية

## النسخ الاحتياطي

### قاعدة البيانات
```bash
# من Render Shell
pg_dump $DATABASE_URL > backup.sql
```

### الكود
- الكود محفوظ في GitHub
- Render يحتفظ بـ Build History

## الأمان

- ✅ SSL/HTTPS تلقائي
- ✅ Environment Variables مشفرة
- ✅ قاعدة البيانات محمية
- ✅ Firewall مدمج

## الدعم

- **Documentation:** https://render.com/docs
- **Community:** https://community.render.com
- **Status:** https://status.render.com

---

## ملخص الأوامر

### Build Command:
```bash
cd gentle-ai-frontend && npm install --legacy-peer-deps && npm run build && mkdir -p ../gentle-ai-backend-nodejs/public && cp -r dist/* ../gentle-ai-backend-nodejs/public/ && cd ../gentle-ai-backend-nodejs && npm install && npx prisma generate
```

### Start Command:
```bash
cd gentle-ai-backend-nodejs && npx prisma migrate deploy && node server.js
```

---

**آخر تحديث:** 3 أكتوبر 2025
**الحالة:** ✅ جاهز للنشر على Render
