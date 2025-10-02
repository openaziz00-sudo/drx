import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Home, Check, Zap, Crown, Rocket } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'المجانية',
      icon: <Zap className="h-8 w-8" />,
      price: '0',
      description: 'مثالية للاستخدام الشخصي والتجربة',
      features: [
        '100 طلب في اليوم',
        'دعم نماذج GPT-4.1-mini',
        'حفظ المحادثات',
        'دعم اللغة العربية',
        'دعم عبر البريد الإلكتروني',
      ],
      notIncluded: [
        'الاستجابة المتدفقة',
        'نماذج DeepSeek',
        'API Access',
        'دعم ذو أولوية',
      ],
      cta: 'ابدأ مجاناً',
      ctaVariant: 'outline',
      popular: false,
    },
    {
      name: 'الاحترافية',
      icon: <Crown className="h-8 w-8" />,
      price: '29',
      description: 'للمحترفين والشركات الصغيرة',
      features: [
        '10,000 طلب في اليوم',
        'جميع نماذج OpenAI',
        'نماذج DeepSeek',
        'الاستجابة المتدفقة',
        'API Access',
        'حفظ غير محدود للمحادثات',
        'دعم ذو أولوية',
        'تحليلات متقدمة',
      ],
      notIncluded: [],
      cta: 'اشترك الآن',
      ctaVariant: 'default',
      popular: true,
    },
    {
      name: 'المؤسسات',
      icon: <Rocket className="h-8 w-8" />,
      price: 'مخصص',
      description: 'حلول مخصصة للمؤسسات الكبيرة',
      features: [
        'طلبات غير محدودة',
        'جميع النماذج المتاحة',
        'نماذج مخصصة',
        'API غير محدود',
        'دعم مخصص 24/7',
        'SLA مضمون',
        'تدريب الفريق',
        'تكامل مخصص',
        'أمان متقدم',
      ],
      notIncluded: [],
      cta: 'اتصل بنا',
      ctaVariant: 'outline',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'هل يمكنني تغيير خطتي لاحقاً؟',
      answer: 'نعم، يمكنك الترقية أو التخفيض في أي وقت. سيتم تطبيق التغييرات فوراً.',
    },
    {
      question: 'هل توجد رسوم إضافية؟',
      answer: 'لا، جميع الأسعار شاملة. لا توجد رسوم خفية أو رسوم إضافية.',
    },
    {
      question: 'ما هي طرق الدفع المتاحة؟',
      answer: 'نقبل جميع بطاقات الائتمان الرئيسية وPayPal والتحويل البنكي للمؤسسات.',
    },
    {
      question: 'هل يمكنني إلغاء اشتراكي؟',
      answer: 'نعم، يمكنك إلغاء اشتراكك في أي وقت دون أي رسوم إلغاء.',
    },
  ];

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
            <h1 className="text-5xl font-bold mb-6">خطط تناسب احتياجاتك</h1>
            <p className="text-xl text-muted-foreground">
              اختر الخطة المناسبة لك وابدأ في استخدام Gentle AI اليوم
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? 'border-primary border-2 shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      الأكثر شعبية
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 mx-auto text-primary">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.price === 'مخصص' ? plan.price : `$${plan.price}`}
                    </span>
                    {plan.price !== 'مخصص' && (
                      <span className="text-muted-foreground">/شهرياً</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 space-x-reverse">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <li
                        key={`not-${i}`}
                        className="flex items-start space-x-2 space-x-reverse text-muted-foreground"
                      >
                        <span className="text-sm line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.ctaVariant}
                    size="lg"
                    asChild
                  >
                    <Link to={plan.price === 'مخصص' ? '/contact' : '/register'}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">مقارنة الميزات</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4">الميزة</th>
                        <th className="text-center py-3 px-4">المجانية</th>
                        <th className="text-center py-3 px-4">الاحترافية</th>
                        <th className="text-center py-3 px-4">المؤسسات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">عدد الطلبات اليومية</td>
                        <td className="text-center py-3 px-4">100</td>
                        <td className="text-center py-3 px-4">10,000</td>
                        <td className="text-center py-3 px-4">غير محدود</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">نماذج OpenAI</td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">نماذج DeepSeek</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">API Access</td>
                        <td className="text-center py-3 px-4">-</td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                        <td className="text-center py-3 px-4">
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">الدعم</td>
                        <td className="text-center py-3 px-4">البريد</td>
                        <td className="text-center py-3 px-4">ذو أولوية</td>
                        <td className="text-center py-3 px-4">24/7 مخصص</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">هل لديك أسئلة أخرى؟</h2>
            <p className="text-xl text-muted-foreground mb-8">
              فريقنا جاهز لمساعدتك في اختيار الخطة المناسبة
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button size="lg" asChild>
                <Link to="/contact">اتصل بنا</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/api-docs">عرض التوثيق</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
