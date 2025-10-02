import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Home, Target, Users, Zap, Shield, Globe } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'سرعة فائقة',
      description: 'استجابة فورية وأداء عالي باستخدام أحدث التقنيات',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'أمان وخصوصية',
      description: 'حماية بياناتك ومحادثاتك بأعلى معايير الأمان',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'دعم متعدد اللغات',
      description: 'دعم كامل للغة العربية والعديد من اللغات الأخرى',
    },
  ];

  const team = [
    {
      name: 'فريق التطوير',
      role: 'مهندسو البرمجيات',
      description: 'فريق متخصص في تطوير تطبيقات الذكاء الاصطناعي',
    },
    {
      name: 'فريق البحث',
      role: 'باحثو الذكاء الاصطناعي',
      description: 'خبراء في نماذج اللغة الكبيرة والتعلم العميق',
    },
    {
      name: 'فريق الدعم',
      role: 'دعم العملاء',
      description: 'فريق متفاني لمساعدتك في أي وقت',
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
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold mb-6">عن Gentle AI</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              نحن نؤمن بأن الذكاء الاصطناعي يجب أن يكون متاحاً للجميع. Gentle AI هي منصة
              متقدمة تجمع بين قوة نماذج اللغة الكبيرة وسهولة الاستخدام لتقديم تجربة فريدة
              في التفاعل مع الذكاء الاصطناعي.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl text-center">رؤيتنا ورسالتنا</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">الرؤية</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    أن نكون المنصة الرائدة في مجال الذكاء الاصطناعي التفاعلي في العالم العربي،
                    ونساهم في تمكين الأفراد والمؤسسات من الاستفادة من قوة الذكاء الاصطناعي في
                    حياتهم اليومية وأعمالهم.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">الرسالة</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    نسعى لتوفير منصة ذكاء اصطناعي متقدمة وسهلة الاستخدام تدعم اللغة العربية
                    بشكل كامل، مع التركيز على الأمان والخصوصية والأداء العالي. نهدف إلى جعل
                    التفاعل مع الذكاء الاصطناعي تجربة طبيعية وممتعة للجميع.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">ما يميزنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:border-primary transition-colors">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 mx-auto text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">فريقنا</h2>
              <p className="text-xl text-muted-foreground">
                فريق متخصص من المهندسين والباحثين المتحمسين للذكاء الاصطناعي
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-sm text-primary">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">التقنيات المستخدمة</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 text-primary">نماذج اللغة</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• OpenAI GPT-4.1</li>
                      <li>• DeepSeek Reasoner</li>
                      <li>• نماذج مخصصة للغة العربية</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-primary">البنية التحتية</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• React & Node.js</li>
                      <li>• PostgreSQL Database</li>
                      <li>• Vercel Deployment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">هل أنت مستعد للبدء؟</h2>
            <p className="text-xl text-muted-foreground mb-8">
              انضم إلى آلاف المستخدمين الذين يستفيدون من Gentle AI يومياً
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <Button size="lg" asChild>
                <Link to="/register">ابدأ مجاناً</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">عرض الأسعار</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
