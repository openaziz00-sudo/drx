import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Code, Copy, Check, Home } from 'lucide-react';

export default function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, language, id }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 left-2"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              Gentle AI
            </Link>
            <Button variant="ghost" asChild>
              <Link to="/">
                <Home className="h-5 w-5 ml-2" />
                الرئيسية
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">توثيق API</h1>
            <p className="text-xl text-muted-foreground">
              دليل شامل لاستخدام Gentle AI API في تطبيقاتك
            </p>
          </div>

          {/* Getting Started */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>البدء السريع</CardTitle>
              <CardDescription>
                احصل على مفتاح API الخاص بك وابدأ في دقائق
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">1. إنشاء حساب</h3>
                <p className="text-muted-foreground">
                  قم بالتسجيل في Gentle AI للحصول على مفتاح API الخاص بك
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. الحصول على مفتاح API</h3>
                <p className="text-muted-foreground">
                  انتقل إلى لوحة التحكم واحصل على مفتاح API من صفحة الإعدادات
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. إجراء أول طلب</h3>
                <p className="text-muted-foreground">
                  استخدم مفتاح API الخاص بك لإجراء طلبات إلى نقاط النهاية
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>نقاط النهاية (Endpoints)</CardTitle>
              <CardDescription>
                قائمة بجميع نقاط النهاية المتاحة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat">الدردشة</TabsTrigger>
                  <TabsTrigger value="auth">المصادقة</TabsTrigger>
                  <TabsTrigger value="conversations">المحادثات</TabsTrigger>
                </TabsList>

                {/* Chat Endpoint */}
                <TabsContent value="chat" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">POST /api/chat</h3>
                    <p className="text-muted-foreground mb-4">
                      إرسال رسالة إلى نموذج OpenAI والحصول على رد
                    </p>

                    <h4 className="font-semibold mb-2">الطلب (Request)</h4>
                    <CodeBlock
                      id="chat-request"
                      language="json"
                      code={`{
  "messages": [
    {
      "role": "user",
      "content": "ما هو الذكاء الاصطناعي؟"
    }
  ],
  "model": "gpt-4.1-mini",
  "stream": false
}`}
                    />

                    <h4 className="font-semibold mb-2 mt-4">الاستجابة (Response)</h4>
                    <CodeBlock
                      id="chat-response"
                      language="json"
                      code={`{
  "content": "الذكاء الاصطناعي هو...",
  "model": "gpt-4.1-mini",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 50,
    "total_tokens": 60
  }
}`}
                    />

                    <h4 className="font-semibold mb-2 mt-4">مثال بلغة Python</h4>
                    <CodeBlock
                      id="chat-python"
                      language="python"
                      code={`import requests

url = "http://localhost:5000/api/chat"
headers = {"Content-Type": "application/json"}
data = {
    "messages": [
        {"role": "user", "content": "مرحبا"}
    ],
    "model": "gpt-4.1-mini",
    "stream": False
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">POST /api/chat/deepseek</h3>
                    <p className="text-muted-foreground mb-4">
                      إرسال رسالة إلى نموذج DeepSeek للتفكير المتقدم
                    </p>

                    <h4 className="font-semibold mb-2">الطلب (Request)</h4>
                    <CodeBlock
                      id="deepseek-request"
                      language="json"
                      code={`{
  "messages": [
    {
      "role": "user",
      "content": "حل هذه المسألة الرياضية..."
    }
  ],
  "model": "deepseek-reasoner",
  "stream": true
}`}
                    />
                  </div>
                </TabsContent>

                {/* Auth Endpoints */}
                <TabsContent value="auth" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">POST /api/auth/register</h3>
                    <p className="text-muted-foreground mb-4">
                      تسجيل مستخدم جديد
                    </p>

                    <h4 className="font-semibold mb-2">الطلب (Request)</h4>
                    <CodeBlock
                      id="register-request"
                      language="json"
                      code={`{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "اسم المستخدم"
}`}
                    />

                    <h4 className="font-semibold mb-2 mt-4">الاستجابة (Response)</h4>
                    <CodeBlock
                      id="register-response"
                      language="json"
                      code={`{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "اسم المستخدم"
  },
  "token": "jwt_token_here"
}`}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">POST /api/auth/login</h3>
                    <p className="text-muted-foreground mb-4">
                      تسجيل دخول المستخدم
                    </p>

                    <h4 className="font-semibold mb-2">الطلب (Request)</h4>
                    <CodeBlock
                      id="login-request"
                      language="json"
                      code={`{
  "email": "user@example.com",
  "password": "securepassword"
}`}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">GET /api/auth/me</h3>
                    <p className="text-muted-foreground mb-4">
                      الحصول على معلومات المستخدم الحالي
                    </p>

                    <h4 className="font-semibold mb-2">Headers</h4>
                    <CodeBlock
                      id="me-headers"
                      language="text"
                      code={`Authorization: Bearer your_jwt_token_here`}
                    />
                  </div>
                </TabsContent>

                {/* Conversations Endpoints */}
                <TabsContent value="conversations" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">GET /api/conversations</h3>
                    <p className="text-muted-foreground mb-4">
                      الحصول على جميع محادثات المستخدم
                    </p>

                    <h4 className="font-semibold mb-2">Headers</h4>
                    <CodeBlock
                      id="conversations-headers"
                      language="text"
                      code={`Authorization: Bearer your_jwt_token_here`}
                    />

                    <h4 className="font-semibold mb-2 mt-4">الاستجابة (Response)</h4>
                    <CodeBlock
                      id="conversations-response"
                      language="json"
                      code={`{
  "conversations": [
    {
      "id": "conv_id",
      "title": "محادثة جديدة",
      "userId": "user_id",
      "createdAt": "2025-10-03T...",
      "updatedAt": "2025-10-03T...",
      "_count": {
        "messages": 5
      }
    }
  ]
}`}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">POST /api/conversations</h3>
                    <p className="text-muted-foreground mb-4">
                      إنشاء محادثة جديدة
                    </p>

                    <h4 className="font-semibold mb-2">الطلب (Request)</h4>
                    <CodeBlock
                      id="create-conversation-request"
                      language="json"
                      code={`{
  "title": "محادثة جديدة"
}`}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">GET /api/conversations/:id</h3>
                    <p className="text-muted-foreground mb-4">
                      الحصول على محادثة محددة مع جميع الرسائل
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-semibold mb-2">DELETE /api/conversations/:id</h3>
                    <p className="text-muted-foreground mb-4">
                      حذف محادثة
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Rate Limits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>حدود الاستخدام</CardTitle>
              <CardDescription>
                معلومات حول حدود الاستخدام والأسعار
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">الخطة المجانية</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>100 طلب في اليوم</li>
                    <li>دعم نماذج GPT-4.1-mini</li>
                    <li>دعم محدود</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">الخطة الاحترافية</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>10,000 طلب في اليوم</li>
                    <li>دعم جميع النماذج</li>
                    <li>دعم ذو أولوية</li>
                    <li>الاستجابة المتدفقة</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>الدعم والمساعدة</CardTitle>
              <CardDescription>
                هل تحتاج إلى مساعدة؟ نحن هنا لمساعدتك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  إذا كان لديك أي أسئلة أو تحتاج إلى مساعدة في استخدام API، يرجى التواصل معنا:
                </p>
                <div className="flex space-x-4 space-x-reverse">
                  <Button asChild>
                    <Link to="/contact">اتصل بنا</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:support@gentel.ai">support@gentel.ai</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
