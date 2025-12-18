import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Rooms & Facilities', path: '/rooms-facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-heading text-2xl text-primary">
            CITY HOSTEL
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-base transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/919302777888"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                WhatsApp Us
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 font-paragraph text-base ${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/919302777888"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4"
            >
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                WhatsApp Us
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
