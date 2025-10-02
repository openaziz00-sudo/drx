import { Zap, Shield, Code, Globe } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'سرعة فائقة',
    description: 'احصل على ردود فورية بفضل البنية التحتية المتقدمة والنماذج المحسّنة.'
  },
  {
    icon: Shield,
    title: 'أمان وخصوصية',
    description: 'نحمي بياناتك بأعلى معايير الأمان والتشفير، مع احترام كامل لخصوصيتك.'
  },
  {
    icon: Code,
    title: 'API قوية',
    description: 'دمج سهل مع تطبيقاتك من خلال واجهة برمجة تطبيقات قوية وموثقة بالكامل.'
  },
  {
    icon: Globe,
    title: 'دعم متعدد اللغات',
    description: 'تواصل بلغتك المفضلة مع دعم شامل للغة العربية والعديد من اللغات الأخرى.'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            ميزات Gentle AI
          </h2>
          <p className="text-lg text-secondary-foreground max-w-2xl mx-auto">
            اكتشف القوة والسهولة في التعامل مع الذكاء الاصطناعي
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
