# Gentle AI - منصة ذكاء اصطناعي متقدمة

![Gentle AI Logo](./assets/logo.svg)

منصة ذكاء اصطناعي حديثة مبنية على React و Vercel Serverless Functions، توفر تجربة دردشة متقدمة مع نماذج OpenAI و DeepSeek.

---

## ✨ المميزات

- 🤖 **دردشة ذكية** - تكامل مع OpenAI GPT-4 و DeepSeek
- ⚡ **أداء عالي** - بنية Serverless على Vercel
- 🎨 **واجهة حديثة** - مبنية بـ React و Tailwind CSS
- 🔒 **آمنة** - حماية متغيرات البيئة والمفاتيح
- 📱 **متجاوبة** - تعمل على جميع الأجهزة
- 🌍 **عالمية** - CDN سريع للتوزيع

---

## 🚀 نشر سريع (5 دقائق)

### الخيار 1: النشر على Vercel (موصى به)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/openaziz00-sudo/drx)

أو اتبع الدليل المفصل: [DEPLOY_NOW.md](./DEPLOY_NOW.md)

### الخيار 2: التطوير المحلي

```bash
# استنساخ المشروع
git clone https://github.com/openaziz00-sudo/drx.git
cd drx

# تثبيت التبعيات
cd gentle-ai-frontend
pnpm install

# تشغيل التطوير المحلي
pnpm dev
```

---

## 📁 بنية المشروع

```
drx/
├── api/                          # Vercel Serverless Functions
│   ├── chat.py                   # دردشة OpenAI
│   ├── deepseek.py               # دردشة DeepSeek
│   └── models.py                 # قائمة النماذج
├── gentle-ai-frontend/           # الواجهة الأمامية (React)
│   ├── src/
│   │   ├── components/           # مكونات React
│   │   └── lib/                  # دوال مساعدة
│   └── dist/                     # ملفات البناء
├── vercel.json                   # تكوين Vercel
├── DEPLOY_NOW.md                 # دليل النشر خطوة بخطوة
└── README.md                     # هذا الملف
```

---

## 🔧 التقنيات المستخدمة

### الواجهة الأمامية
- **React 19** - مكتبة UI
- **Vite 6** - أداة البناء
- **Tailwind CSS 4** - التصميم
- **Radix UI** - مكونات UI
- **React Router** - التوجيه

### الخادم
- **Python 3.9** - لغة البرمجة
- **OpenAI SDK** - تكامل AI
- **Vercel Functions** - Serverless

### البنية التحتية
- **Vercel** - الاستضافة والنشر
- **Supabase** - قاعدة البيانات
- **Neon** - PostgreSQL
- **Upstash** - Redis
- **Vercel Blob** - تخزين الملفات

---

## 🌐 نقاط API

| Endpoint | Method | الوصف |
|----------|--------|-------|
| `/api/chat` | POST | دردشة مع OpenAI GPT-4 |
| `/api/deepseek` | POST | دردشة مع DeepSeek Reasoner |
| `/api/models` | GET | قائمة النماذج المتاحة |

### مثال على الاستخدام

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'مرحباً' }
    ],
    model: 'gpt-4o-mini',
    stream: false
  })
});

const data = await response.json();
console.log(data.content);
```

---

## ⚙️ متغيرات البيئة

### مطلوب
- `OPENAI_API_KEY` - مفتاح OpenAI API

### اختياري
- `DEEPSEEK_API_KEY` - مفتاح DeepSeek API
- `SUPABASE_URL` - رابط Supabase
- `SUPABASE_ANON_KEY` - مفتاح Supabase
- `POSTGRES_URL` - رابط قاعدة البيانات
- `GENTLE_READ_WRITE_TOKEN` - مفتاح Vercel Blob

راجع [.env.example](./.env.example) لجميع المتغيرات.

---

## 📚 الوثائق

- 📖 [DEPLOY_NOW.md](./DEPLOY_NOW.md) - دليل النشر خطوة بخطوة
- 🚀 [QUICK_START.md](./QUICK_START.md) - البدء السريع
- 📘 [README-DEPLOYMENT.md](./README-DEPLOYMENT.md) - دليل النشر الكامل
- 📊 [MIGRATION_REPORT.md](./MIGRATION_REPORT.md) - تقرير الترحيل

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى:

1. Fork المشروع
2. إنشاء فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 📝 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

---

## 🙏 شكر وتقدير

- [OpenAI](https://openai.com) - نماذج الذكاء الاصطناعي
- [Vercel](https://vercel.com) - الاستضافة والنشر
- [Supabase](https://supabase.com) - قاعدة البيانات
- [Tailwind CSS](https://tailwindcss.com) - التصميم

---

## 📞 الدعم

- 📧 البريد الإلكتروني: support@gentle.ai
- 🐛 المشاكل: [GitHub Issues](https://github.com/openaziz00-sudo/drx/issues)
- 💬 المناقشات: [GitHub Discussions](https://github.com/openaziz00-sudo/drx/discussions)

---

## 🔗 روابط مفيدة

- [الموقع الرسمي](https://drx.vercel.app)
- [التوثيق](https://docs.gentle.ai)
- [المدونة](https://blog.gentle.ai)

---

**صنع بـ ❤️ بواسطة فريق Gentle AI**
