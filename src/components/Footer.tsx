import { Mail, MapPin, Phone } from 'lucide-react';

type FooterProps = {
  onNavigate: (page: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum') => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-gray-900 mb-3">NotenManager</h3>
            <p className="text-gray-600">
              Die einfache Lösung zur Verwaltung deiner Schulnoten und Modulprüfungen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 mb-3">Quick Links:</h3>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('dashboard')}
                className="block text-gray-600 hover:text-blue-600 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="block text-gray-600 hover:text-blue-600 transition-colors"
              >
                Über uns
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="block text-gray-600 hover:text-blue-600 transition-colors"
              >
                Kontakt
              </button>
              <button
                onClick={() => onNavigate('impressum')}
                className="block text-gray-600 hover:text-blue-600 transition-colors"
              >
                Impressum
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 mb-3">Kontakt:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>info@notenmanager.ch</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+41 44 123 45 67</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Bern, Schweiz</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500">
            © 2025 NotenManager. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
