import { AppData } from '../App';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { calculateAverage, calculateOverallGPA } from '../utils/calculations';
import { BookOpen, GraduationCap } from 'lucide-react';

type DashboardProps = {
  data: AppData;
  onAddModuleGrade: (moduleId: string, value: number, weight: number, description?: string) => void;
  onAddSubjectGrade: (subjectId: string, value: number, weight: number, description?: string) => void;
};

export function Dashboard({ data }: DashboardProps) {
  const overallGPA = calculateOverallGPA(data);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Deine Noten im Überblick</p>
      </div>

      {/* Overall Average */}
      <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Gesamtdurchschnitt</p>
            <p className="text-gray-900">{overallGPA?.toFixed(2) || '—'}</p>
          </div>
          <Badge className="rounded-xl bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
            {overallGPA?.toFixed(1) || '—'}
          </Badge>
        </div>
      </Card>

      {/* Modules Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-gray-900">Module</h2>
        </div>

        {data.modules.length === 0 ? (
          <Card className="p-8 rounded-2xl text-center">
            <p className="text-gray-400">Noch keine Module erfasst</p>
          </Card>
        ) : (
          <Card className="p-6 rounded-2xl border-gray-200 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              {data.modules.map((module, index) => {
                const average = calculateAverage(module.grades);
                return (
                  <div key={module.id}>
                    {index > 0 && <div className="border-t border-gray-100 -mx-6 mb-4" />}
                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate">{module.name}</p>
                        <p className="text-gray-500 mt-1">
                          {module.grades.length} Note{module.grades.length !== 1 ? 'n' : ''}
                        </p>
                      </div>
                      <div className="flex items-baseline gap-2 flex-shrink-0">
                        <p className="text-gray-500">Average:</p>
                        <Badge className="rounded-xl bg-blue-50 text-blue-700 border-blue-200">
                          {average?.toFixed(2) || '—'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {/* Subjects Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-gray-900">Fächer</h2>
        </div>

        {data.schoolSubjects.length === 0 ? (
          <Card className="p-8 rounded-2xl text-center">
            <p className="text-gray-400">Noch keine Fächer erfasst</p>
          </Card>
        ) : (
          <Card className="p-6 rounded-2xl border-gray-200 hover:shadow-md transition-shadow">
            <div className="space-y-4">
              {data.schoolSubjects.map((subject, index) => {
                const average = calculateAverage(subject.grades);
                return (
                  <div key={subject.id}>
                    {index > 0 && <div className="border-t border-gray-100 -mx-6 mb-4" />}
                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex items-baseline gap-3 flex-1 min-w-0">
                        <div 
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5" 
                          style={{ backgroundColor: subject.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 truncate">{subject.name}</p>
                          <p className="text-gray-500 mt-1">
                            {subject.grades.length} Note{subject.grades.length !== 1 ? 'n' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 flex-shrink-0">
                        <p className="text-gray-500">Average:</p>
                        <Badge 
                          className="rounded-xl border"
                          style={{ 
                            backgroundColor: `${subject.color}20`, 
                            color: subject.color,
                            borderColor: subject.color 
                          }}
                        >
                          {average?.toFixed(2) || '—'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
