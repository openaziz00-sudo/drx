import { Button } from '@/components/ui/button.jsx'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">مدعوم بأحدث تقنيات الذكاء الاصطناعي</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Gentle AI: الدردشة الذكية
            <br />
            <span className="text-primary">البسيطة مع AI</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-secondary-foreground max-w-3xl mx-auto leading-relaxed">
            تجربة محادثة سلسة وذكية، مدعومة بأحدث تقنيات الذكاء الاصطناعي.
            <br />
            استمتع بردود دقيقة وسريعة مع واجهة بسيطة وسهلة الاستخدام.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/chat">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground group"
              >
                ابدأ الآن
                <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border hover:bg-secondary"
            >
              اطّلع على API
            </Button>
          </div>

          {/* Visual Representation */}
          <div className="pt-12">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
                {/* Mock Chat Interface */}
                <div className="bg-secondary p-4 border-b border-border flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <div className="w-3 h-3 rounded-full bg-chart-4"></div>
                    <div className="w-3 h-3 rounded-full bg-chart-3"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Gentle AI Chat</span>
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-input text-foreground rounded-lg px-4 py-3 max-w-md">
                      مرحباً! كيف يمكنني استخدام Gentle AI؟
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary text-foreground rounded-lg px-4 py-3 max-w-md">
                      مرحباً بك في Gentle AI! يمكنك البدء بطرح أي سؤال أو طلب المساعدة في أي موضوع. 
                      أنا هنا لمساعدتك بردود دقيقة وسريعة.
                    </div>
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
