import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-2xl mb-4">CITY HOSTEL</h3>
            <p className="font-paragraph text-base opacity-90 mb-4">
              Your trusted home away from home in Bhawarkua, Indore. Providing safe, clean, and comfortable accommodation for students.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                Home
              </Link>
              <Link to="/about" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </Link>
              <Link to="/rooms-facilities" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                Rooms & Facilities
              </Link>
              <Link to="/gallery" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                Gallery
              </Link>
              <Link to="/contact" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl mb-4">Contact Information</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="font-paragraph text-base opacity-90">
                  Bhawarkua, Indore, Madhya Pradesh, India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href="tel:+919691630277" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                  +91 96916 30277
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a href="mailto:info@cityhostel.com" className="font-paragraph text-base opacity-90 hover:opacity-100 transition-opacity">
                  info@cityhostel.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="font-paragraph text-sm opacity-80">
            © {new Date().getFullYear()} CITY HOSTEL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
