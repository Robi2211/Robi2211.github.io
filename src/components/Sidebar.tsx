import { LayoutDashboard, BookOpen, GraduationCap, Info, Mail } from 'lucide-react';
import { cn } from './ui/utils';

type SidebarProps = {
  currentPage: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum';
  onNavigate: (page: 'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum') => void;
};

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Module', icon: BookOpen },
    { id: 'subjects', label: 'Fächer', icon: GraduationCap },
    { id: 'about', label: 'Über uns', icon: Info },
    { id: 'contact', label: 'Kontakt', icon: Mail },
  ] as const;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-gray-900">NotenManager</h1>
        <p className="text-gray-500 mt-1">Deine Noten im Überblick</p>
      </div>
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
      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={() => onNavigate('impressum')}
          className="w-full text-left px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          Impressum
        </button>
      </div>
    </div>
  );
}
