import { useState, useEffect } from 'react';
import { DesktopNav } from './components/DesktopNav';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { ModulesPage } from './components/ModulesPage';
import { SchoolSubjectsPage } from './components/SchoolSubjectsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { ImpressumPage } from './components/ImpressumPage';
import { Toaster } from './components/ui/sonner';

export type Grade = {
  id: string;
  value: number;
  weight: number;
  description?: string;
};

export type Module = {
  id: string;
  name: string;
  grades: Grade[];
};

export type SchoolSubject = {
  id: string;
  name: string;
  color: string;
  grades: Grade[];
};

export type AppData = {
  modules: Module[];
  schoolSubjects: SchoolSubject[];
};

const SUBJECT_COLORS = [
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#06b6d4', // cyan
];

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'modules' | 'subjects' | 'about' | 'contact' | 'impressum'>('dashboard');
  const [data, setData] = useState<AppData>(() => {
    try {
      const savedData = localStorage.getItem('appData');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Fehler beim Lesen der App-Daten aus dem localStorage:', error);
    }
    // Fallback auf initiale Beispieldaten
    return {
      modules: [
        {
          id: '1',
          name: 'Modul 294 – Applikationsentwicklung',
          grades: [
            { id: '1', value: 5.5, weight: 60, description: 'Projektarbeit' },
            { id: '2', value: 4.8, weight: 40, description: 'Abschlussprüfung' },
          ],
        },
        {
          id: '2',
          name: 'Modul 117 – Netzwerke',
          grades: [{ id: '3', value: 5.2, weight: 100, description: 'Gesamtnote' }],
        },
        {
          id: '3',
          name: 'Modul 231 – Datenschutz und Datensicherheit',
          grades: [
            { id: '8', value: 5.0, weight: 50, description: 'Test 1' },
            { id: '9', value: 5.3, weight: 50, description: 'Test 2' },
          ],
        },
      ],
      schoolSubjects: [
        {
          id: '1',
          name: 'Mathematik',
          color: SUBJECT_COLORS[0],
          grades: [
            { id: '4', value: 5.0, weight: 50, description: 'Test 1' },
            { id: '5', value: 5.5, weight: 50, description: 'Test 2' },
          ],
        },
        { id: '2', name: 'Englisch', color: SUBJECT_COLORS[1], grades: [{ id: '6', value: 4.5, weight: 100 }] },
        { id: '3', name: 'Sport', color: SUBJECT_COLORS[2], grades: [{ id: '7', value: 5.8, weight: 100 }] },
        { id: '4', name: 'ABU', color: SUBJECT_COLORS[3], grades: [{ id: '10', value: 4.9, weight: 100 }] },
      ],
    };
  });

  // Speichere Daten bei jeder Änderung im localStorage
  useEffect(() => {
    try {
      localStorage.setItem('appData', JSON.stringify(data));
    } catch (error) {
      console.error('Fehler beim Speichern der App-Daten im localStorage:', error);
    }
  }, [data]);

  const addModule = (name: string) => {
    const newModule: Module = {
      id: Date.now().toString(),
      name,
      grades: [],
    };
    setData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const deleteModule = (id: string) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== id),
    }));
  };

  const addSchoolSubject = (name: string) => {
    const colorIndex = data.schoolSubjects.length % SUBJECT_COLORS.length;
    const newSubject: SchoolSubject = {
      id: Date.now().toString(),
      name,
      color: SUBJECT_COLORS[colorIndex],
      grades: [],
    };
    setData(prev => ({ ...prev, schoolSubjects: [...prev.schoolSubjects, newSubject] }));
  };

  const deleteSchoolSubject = (id: string) => {
    setData(prev => ({
      ...prev,
      schoolSubjects: prev.schoolSubjects.filter(s => s.id !== id),
    }));
  };

  const addModuleGrade = (moduleId: string, value: number, weight: number, description?: string) => {
    const newGrade: Grade = {
      id: Date.now().toString(),
      value,
      weight,
      description,
    };
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId ? { ...m, grades: [...m.grades, newGrade] } : m
      ),
    }));
  };

  const addSubjectGrade = (subjectId: string, value: number, weight: number, description?: string) => {
    const newGrade: Grade = {
      id: Date.now().toString(),
      value,
      weight,
      description,
    };
    setData(prev => ({
      ...prev,
      schoolSubjects: prev.schoolSubjects.map(s =>
        s.id === subjectId ? { ...s, grades: [...s.grades, newGrade] } : s
      ),
    }));
  };

  const deleteModuleGrade = (moduleId: string, gradeId: string) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId ? { ...m, grades: m.grades.filter(g => g.id !== gradeId) } : m
      ),
    }));
  };

  const deleteSubjectGrade = (subjectId: string, gradeId: string) => {
    setData(prev => ({
      ...prev,
      schoolSubjects: prev.schoolSubjects.map(s =>
        s.id === subjectId ? { ...s, grades: s.grades.filter(g => g.id !== gradeId) } : s
      ),
    }));
  };

  const updateModuleGrade = (moduleId: string, gradeId: string, value: number, weight: number, description?: string) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId
          ? {
              ...m,
              grades: m.grades.map(g =>
                g.id === gradeId ? { ...g, value, weight, description } : g
              ),
            }
          : m
      ),
    }));
  };

  const updateSubjectGrade = (subjectId: string, gradeId: string, value: number, weight: number, description?: string) => {
    setData(prev => ({
      ...prev,
      schoolSubjects: prev.schoolSubjects.map(s =>
        s.id === subjectId
          ? {
              ...s,
              grades: s.grades.map(g =>
                g.id === gradeId ? { ...g, value, weight, description } : g
              ),
            }
          : s
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navigation - Sidebar links, nur auf Desktop (ab lg = 1024px) */}
      <div className="hidden lg:block">
        <DesktopNav currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>
      
      {/* Main Content mit Margin für Desktop Sidebar */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Navigation - Hamburger Menü, nur auf Handy/Tablet (unter lg) */}
        <div className="lg:hidden">
          <MobileNav currentPage={currentPage} onNavigate={setCurrentPage} />
        </div>
        
        {/* Main Content */}
        <main className="flex-1">
          {currentPage === 'dashboard' && (
            <Dashboard 
              data={data} 
              onAddModuleGrade={addModuleGrade}
              onAddSubjectGrade={addSubjectGrade}
            />
          )}
          {currentPage === 'modules' && (
            <ModulesPage
              modules={data.modules}
              onAddModule={addModule}
              onDeleteModule={deleteModule}
              onAddGrade={addModuleGrade}
              onDeleteGrade={deleteModuleGrade}
              onUpdateGrade={updateModuleGrade}
            />
          )}
          {currentPage === 'subjects' && (
            <SchoolSubjectsPage
              subjects={data.schoolSubjects}
              onAddSubject={addSchoolSubject}
              onDeleteSubject={deleteSchoolSubject}
              onAddGrade={addSubjectGrade}
              onDeleteGrade={deleteSubjectGrade}
              onUpdateGrade={updateSubjectGrade}
            />
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'impressum' && <ImpressumPage />}
        </main>
        
        {/* Footer */}
        <Footer onNavigate={setCurrentPage} />
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
