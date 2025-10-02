import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Home, Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <MessageSquare className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-xl text-muted-foreground">
              نحن هنا لمساعدتك. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>أرسل لنا رسالة</CardTitle>
                <CardDescription>
                  املأ النموذج أدناه وسنتواصل معك قريباً
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted && (
                  <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-green-800 dark:text-green-200">
                      تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                    </p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="أدخل اسمك"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="موضوع الرسالة"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="اكتب رسالتك هنا..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      rows={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      'جاري الإرسال...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 ml-2" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات الاتصال</CardTitle>
                  <CardDescription>
                    يمكنك التواصل معنا عبر القنوات التالية
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                      <a
                        href="mailto:support@gentel.ai"
                        className="text-muted-foreground hover:text-primary"
                      >
                        support@gentel.ai
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">الدعم الفني</h3>
                      <p className="text-muted-foreground">
                        متاح من السبت إلى الخميس، 9 صباحاً - 5 مساءً
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>أوقات الاستجابة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-1">الخطة المجانية</h3>
                    <p className="text-sm text-muted-foreground">
                      خلال 48 ساعة عمل
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">الخطة الاحترافية</h3>
                    <p className="text-sm text-muted-foreground">
                      خلال 24 ساعة عمل
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">خطة المؤسسات</h3>
                    <p className="text-sm text-muted-foreground">
                      دعم فوري 24/7
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الأسئلة الشائعة</CardTitle>
                  <CardDescription>
                    قد تجد إجابة سريعة لسؤالك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/api-docs">عرض الأسئلة الشائعة</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">موارد إضافية</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>التوثيق</CardTitle>
                  <CardDescription>
                    دليل شامل لاستخدام API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link to="/api-docs">عرض التوثيق</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>الأسعار</CardTitle>
                  <CardDescription>
                    خطط تناسب جميع الاحتياجات
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link to="/pricing">عرض الأسعار</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:border-primary transition-colors">
                <CardHeader>
                  <CardTitle>عن Gentle AI</CardTitle>
                  <CardDescription>
                    تعرف على فريقنا ورؤيتنا
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild>
                    <Link to="/about">من نحن</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
