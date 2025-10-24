import { useState } from 'react';
import { Menu, X, LayoutDashboard, BookOpen, GraduationCap, Info, Mail } from 'lucide-react';
import { cn } from './ui/utils';
import { Button } from './ui/button';

type MobileNavProps = {
  currentPage: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum';
  onNavigate: (page: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum') => void;
};

export function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Module', icon: BookOpen },
    { id: 'subjects', label: 'Fächer', icon: GraduationCap },
    { id: 'about', label: 'Über uns', icon: Info },
    { id: 'contact', label: 'Kontakt', icon: Mail },
  ] as const;

  const handleNavigate = (page: typeof currentPage) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-gray-900">NotenManager</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div 
            className="bg-white w-64 h-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h1 className="text-gray-900">Menü</h1>
                <p className="text-gray-500 mt-1">Navigation</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all',
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200 absolute bottom-0 w-full bg-white">
              <button
                onClick={() => handleNavigate('impressum')}
                className="w-full text-left px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Impressum
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
