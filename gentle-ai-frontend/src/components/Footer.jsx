import { Twitter, Linkedin, Github } from 'lucide-react'
import logo from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Gentle AI" className="h-8 w-auto" />
              <span className="text-xl font-bold text-foreground">Gentle AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              الدردشة الذكية البسيطة مع AI
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  الميزات
                </a>
              </li>
              <li>
                <a href="#api" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  الوثائق
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  التسعير
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  المدونة
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">الشركة</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  الوظائف
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">قانوني</h3>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  سياسة الخصوصية
                </a>
              </li>
              <li>
                <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  الشروط والأحكام
                </a>
              </li>
              <li>
                <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  الأمان
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 Gentle AI. جميع الحقوق محفوظة.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
