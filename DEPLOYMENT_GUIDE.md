# دليل النشر - Gentle AI

## نشر التطبيق على Vercel

### المتطلبات الأساسية

1. حساب Vercel
2. حساب GitHub متصل بـ Vercel
3. قاعدة بيانات Neon PostgreSQL
4. مفاتيح API (OpenAI, DeepSeek)

### خطوات النشر

#### 1. إعداد المشروع

```bash
# استنساخ المستودع
git clone https://github.com/openaziz00-sudo/drx.git
cd drx
```

#### 2. إعداد المتغيرات البيئية

في لوحة تحكم Vercel، أضف المتغيرات التالية:

```
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret_key_min_32_chars
PORT=5000
```

#### 3. تكوين Build Settings في Vercel

**Root Directory:** `gentle-ai-backend-nodejs`

**Build Command:**
```bash
cd ../gentle-ai-frontend && npm install --legacy-peer-deps && npm run build && cp -r dist/* ../gentle-ai-backend-nodejs/public/ && cd ../gentle-ai-backend-nodejs && npm install && npx prisma generate
```

**Output Directory:** `.`

**Install Command:**
```bash
npm install
```

#### 4. تكوين قاعدة البيانات

بعد النشر الأول، قم بتشغيل migrations:

```bash
# من لوحة تحكم Vercel أو محلياً
npx prisma migrate deploy
```

#### 5. التحقق من النشر

بعد النشر، تحقق من:
- [ ] الصفحة الرئيسية تعمل
- [ ] صفحة الدردشة تعمل
- [ ] التسجيل وتسجيل الدخول يعملان
- [ ] حفظ المحادثات يعمل
- [ ] جميع الصفحات الجديدة تعمل

### حل المشاكل الشائعة

#### مشكلة: Build يفشل

**الحل:**
- تأكد من أن جميع dependencies مثبتة
- استخدم `--legacy-peer-deps` مع npm install
- تحقق من أن جميع الملفات المطلوبة موجودة

#### مشكلة: قاعدة البيانات لا تعمل

**الحل:**
- تأكد من صحة DATABASE_URL
- قم بتشغيل migrations: `npx prisma migrate deploy`
- تحقق من أن قاعدة البيانات Neon نشطة

#### مشكلة: JWT Authentication يفشل

**الحل:**
- تأكد من وجود JWT_SECRET في المتغيرات البيئية
- JWT_SECRET يجب أن يكون 32 حرف على الأقل
- أعد تشغيل التطبيق بعد إضافة المتغير

#### مشكلة: API Keys لا تعمل

**الحل:**
- تأكد من صحة مفاتيح API
- تحقق من أن المفاتيح لديها رصيد كافٍ
- تأكد من أن المفاتيح مضافة في Vercel Environment Variables

## النشر المحلي (للتطوير)

### 1. إعداد البيئة المحلية

```bash
# تثبيت dependencies
cd gentle-ai-backend-nodejs
npm install

cd ../gentle-ai-frontend
npm install --legacy-peer-deps
```

### 2. إنشاء ملف .env

في مجلد `gentle-ai-backend-nodejs`، أنشئ ملف `.env`:

```env
OPENAI_API_KEY=your_openai_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret_min_32_chars
PORT=5000
```

### 3. إعداد قاعدة البيانات

```bash
cd gentle-ai-backend-nodejs
npx prisma migrate dev
```

### 4. بناء الواجهة الأمامية

```bash
cd gentle-ai-frontend
npm run build
cp -r dist/* ../gentle-ai-backend-nodejs/public/
```

### 5. تشغيل الخادم

```bash
cd gentle-ai-backend-nodejs
npm start
```

التطبيق سيعمل على: `http://localhost:5000`

## التطوير المستمر

### Workflow للتطوير

1. عمل تغييرات في الكود
2. اختبار محلياً
3. Commit التغييرات
4. Push إلى GitHub
5. Vercel سينشر تلقائياً

### أوامر مفيدة

```bash
# تشغيل الواجهة الأمامية في وضع التطوير
cd gentle-ai-frontend
npm run dev

# تشغيل الواجهة الخلفية في وضع التطوير
cd gentle-ai-backend-nodejs
npm run dev  # يتطلب nodemon

# إعادة بناء Prisma Client
npx prisma generate

# إنشاء migration جديد
npx prisma migrate dev --name migration_name

# فتح Prisma Studio
npx prisma studio
```

## الأمان في الإنتاج

### قائمة التحقق الأمني

- [x] ملف .env غير مرفوع إلى Git
- [x] كلمات المرور مشفرة بـ bcrypt
- [x] JWT tokens للمصادقة
- [x] CORS مكون بشكل صحيح
- [x] معالجة الأخطاء شاملة
- [ ] Rate limiting (يُنصح بإضافته)
- [ ] HTTPS فقط في الإنتاج
- [ ] تسجيل الأحداث (Logging)

### توصيات إضافية

1. **Rate Limiting**: أضف express-rate-limit لمنع الإساءة
2. **Helmet**: استخدم helmet.js لحماية HTTP headers
3. **Monitoring**: أضف خدمة مراقبة مثل Sentry
4. **Backups**: قم بعمل نسخ احتياطية منتظمة لقاعدة البيانات
5. **Logging**: أضف نظام تسجيل شامل

## الصيانة

### النسخ الاحتياطي

```bash
# نسخ احتياطي لقاعدة البيانات
pg_dump $DATABASE_URL > backup.sql

# استعادة من نسخة احتياطية
psql $DATABASE_URL < backup.sql
```

### التحديثات

```bash
# تحديث dependencies
npm update

# تحديث Prisma
npm install @prisma/client@latest prisma@latest
npx prisma generate
```

### المراقبة

راقب:
- استخدام قاعدة البيانات
- استخدام API (OpenAI, DeepSeek)
- أخطاء الخادم
- أداء التطبيق

## الدعم

للحصول على المساعدة:
- GitHub Issues: https://github.com/openaziz00-sudo/drx/issues
- البريد الإلكتروني: support@gentel.ai
- التوثيق: في المشروع

---

**آخر تحديث: 3 أكتوبر 2025**
