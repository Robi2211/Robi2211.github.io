import { LayoutDashboard, BookOpen, GraduationCap, Info, Mail } from 'lucide-react';
import { cn } from './ui/utils';

type DesktopNavProps = {
  currentPage: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum';
  onNavigate: (page: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum') => void;
};

export function DesktopNav({ currentPage, onNavigate }: DesktopNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Module', icon: BookOpen },
    { id: 'subjects', label: 'Fächer', icon: GraduationCap },
    { id: 'about', label: 'Über uns', icon: Info },
    { id: 'contact', label: 'Kontakt', icon: Mail },
  ] as const;

  const today = new Date().toLocaleDateString('de-CH', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shadow-sm z-50">
      {/* Header mit Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-gray-900">NotenManager</h1>
        </div>
        <p className="text-gray-500">{today}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
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

      {/* Impressum Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={() => onNavigate('impressum')}
          className="w-full text-left px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-50"
        >
          Impressum
        </button>
      </div>
    </aside>
  );
}
