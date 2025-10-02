import { Button } from '@/components/ui/button.jsx'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logo} alt="Gentle AI" className="h-8 w-auto" />
            <span className="text-xl font-bold text-foreground">Gentle AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-secondary-foreground hover:text-foreground transition-colors">
              الميزات
            </a>
            <a href="#api" className="text-secondary-foreground hover:text-foreground transition-colors">
              API
            </a>
            <a href="#pricing" className="text-secondary-foreground hover:text-foreground transition-colors">
              التسعير
            </a>
            <a href="#about" className="text-secondary-foreground hover:text-foreground transition-colors">
              من نحن
            </a>
            <a href="#blog" className="text-secondary-foreground hover:text-foreground transition-colors">
              المدونة
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-secondary-foreground hover:text-foreground">
              تسجيل الدخول
            </Button>
            <Link to="/chat">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                ابدأ الآن
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#features" className="block text-secondary-foreground hover:text-foreground transition-colors">
              الميزات
            </a>
            <a href="#api" className="block text-secondary-foreground hover:text-foreground transition-colors">
              API
            </a>
            <a href="#pricing" className="block text-secondary-foreground hover:text-foreground transition-colors">
              التسعير
            </a>
            <a href="#about" className="block text-secondary-foreground hover:text-foreground transition-colors">
              من نحن
            </a>
            <a href="#blog" className="block text-secondary-foreground hover:text-foreground transition-colors">
              المدونة
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="w-full">
                تسجيل الدخول
              </Button>
              <Link to="/chat" className="w-full">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  ابدأ الآن
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
