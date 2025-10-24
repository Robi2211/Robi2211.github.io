import { useState } from 'react';
import { Module, Grade } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Plus, Trash2, Pencil, ChevronDown, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { calculateAverage } from '../utils/calculations';

type ModulesPageProps = {
  modules: Module[];
  onAddModule: (name: string) => void;
  onDeleteModule: (id: string) => void;
  onAddGrade: (moduleId: string, value: number, weight: number, description?: string) => void;
  onDeleteGrade: (moduleId: string, gradeId: string) => void;
  onUpdateGrade: (moduleId: string, gradeId: string, value: number, weight: number, description?: string) => void;
};

export function ModulesPage({
  modules,
  onAddModule,
  onDeleteModule,
  onAddGrade,
  onDeleteGrade,
  onUpdateGrade,
}: ModulesPageProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(modules.map(m => m.id)));
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [moduleName, setModuleName] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [gradeWeight, setGradeWeight] = useState('');
  const [gradeDescription, setGradeDescription] = useState('');
  const [editingGrade, setEditingGrade] = useState<{ moduleId: string; gradeId: string; value: string; weight: string; description: string } | null>(null);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddModule = () => {
    if (!moduleName.trim()) {
      toast.error('Bitte einen Modulnamen eingeben');
      return;
    }
    onAddModule(moduleName);
    setModuleName('');
    setModuleDialogOpen(false);
    toast.success('Modul erfolgreich hinzugefügt');
  };

  const handleAddGrade = () => {
    const value = parseFloat(gradeValue);
    const weight = parseFloat(gradeWeight);

    if (!selectedModuleId) {
      toast.error('Bitte ein Modul auswählen');
      return;
    }
    if (isNaN(value) || value < 1 || value > 6) {
      toast.error('Note muss zwischen 1 und 6 liegen');
      return;
    }
    if (isNaN(weight) || weight <= 0 || weight > 100) {
      toast.error('Gewichtung muss zwischen 0 und 100 liegen');
      return;
    }

    onAddGrade(selectedModuleId, value, weight, gradeDescription || undefined);
    setSelectedModuleId('');
    setGradeValue('');
    setGradeWeight('');
    setGradeDescription('');
    setGradeDialogOpen(false);
    toast.success('Note erfolgreich hinzugefügt');
  };

  const handleEditGrade = () => {
    if (!editingGrade) return;

    const value = parseFloat(editingGrade.value);
    const weight = parseFloat(editingGrade.weight);

    if (isNaN(value) || value < 1 || value > 6) {
      toast.error('Note muss zwischen 1 und 6 liegen');
      return;
    }
    if (isNaN(weight) || weight <= 0 || weight > 100) {
      toast.error('Gewichtung muss zwischen 0 und 100 liegen');
      return;
    }

    onUpdateGrade(editingGrade.moduleId, editingGrade.gradeId, value, weight, editingGrade.description || undefined);
    setEditingGrade(null);
    setEditDialogOpen(false);
    toast.success('Note erfolgreich aktualisiert');
  };

  const openEditDialog = (moduleId: string, grade: Grade) => {
    setEditingGrade({
      moduleId,
      gradeId: grade.id,
      value: grade.value.toString(),
      weight: grade.weight.toString(),
      description: grade.description || '',
    });
    setEditDialogOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Module</h1>
          <p className="text-gray-500">Verwalte deine Modulnoten</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-2xl">
                <Plus className="w-4 h-4" />
                Note hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Note hinzufügen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="module-select">Modul</Label>
                  <select
                    id="module-select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                  >
                    <option value="">Modul auswählen</option>
                    {modules.map(module => (
                      <option key={module.id} value={module.id}>
                        {module.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade-value">Note (1-6)</Label>
                  <Input
                    id="grade-value"
                    type="number"
                    step="0.1"
                    min="1"
                    max="6"
                    placeholder="z.B. 5.5"
                    className="rounded-xl"
                    value={gradeValue}
                    onChange={(e) => setGradeValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade-weight">Gewichtung (%)</Label>
                  <Input
                    id="grade-weight"
                    type="number"
                    step="1"
                    min="1"
                    max="100"
                    placeholder="z.B. 50"
                    className="rounded-xl"
                    value={gradeWeight}
                    onChange={(e) => setGradeWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade-description">Beschreibung (optional)</Label>
                  <Textarea
                    id="grade-description"
                    placeholder="z.B. Abschlussprüfung, Projektarbeit"
                    className="rounded-xl"
                    value={gradeDescription}
                    onChange={(e) => setGradeDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="rounded-2xl" onClick={() => setGradeDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button className="rounded-2xl" onClick={handleAddGrade}>Hinzufügen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-2xl">
                <Plus className="w-4 h-4" />
                Modul hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Neues Modul</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="module-name">Modulname</Label>
                  <Input
                    id="module-name"
                    placeholder="z.B. Modul 294 – Applikationsentwicklung"
                    className="rounded-xl"
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddModule()}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="rounded-2xl" onClick={() => setModuleDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button className="rounded-2xl" onClick={handleAddModule}>Hinzufügen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Edit Grade Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Note bearbeiten</DialogTitle>
          </DialogHeader>
          {editingGrade && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-grade-value">Note (1-6)</Label>
                <Input
                  id="edit-grade-value"
                  type="number"
                  step="0.1"
                  min="1"
                  max="6"
                  className="rounded-xl"
                  value={editingGrade.value}
                  onChange={(e) => setEditingGrade({ ...editingGrade, value: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-grade-weight">Gewichtung (%)</Label>
                <Input
                  id="edit-grade-weight"
                  type="number"
                  step="1"
                  min="1"
                  max="100"
                  className="rounded-xl"
                  value={editingGrade.weight}
                  onChange={(e) => setEditingGrade({ ...editingGrade, weight: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-grade-description">Beschreibung (optional)</Label>
                <Textarea
                  id="edit-grade-description"
                  placeholder="z.B. Abschlussprüfung, Projektarbeit"
                  className="rounded-xl"
                  value={editingGrade.description}
                  onChange={(e) => setEditingGrade({ ...editingGrade, description: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="rounded-2xl" onClick={() => setEditDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button className="rounded-2xl" onClick={handleEditGrade}>Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Overview Table */}
      {modules.length > 0 && (
        <Card className="rounded-2xl overflow-hidden mb-6">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200">
            <h2 className="text-gray-900">Modul-Übersicht</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Modul</th>
                  <th className="px-6 py-3 text-left text-gray-700">Anzahl Noten</th>
                  <th className="px-6 py-3 text-left text-gray-700">Durchschnitt</th>
                  <th className="px-6 py-3 text-left text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {modules.map(module => {
                  const average = calculateAverage(module.grades);
                  const status = average ? (average >= 5.5 ? 'Sehr gut' : average >= 4.0 ? 'Bestanden' : 'Nicht bestanden') : 'Keine Daten';
                  const statusColor = average ? (average >= 5.5 ? 'text-emerald-600' : average >= 4.0 ? 'text-blue-600' : 'text-red-600') : 'text-gray-400';
                  
                  return (
                    <tr key={module.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">{module.name}</td>
                      <td className="px-6 py-4 text-gray-600">{module.grades.length}</td>
                      <td className="px-6 py-4">
                        <Badge className="rounded-xl bg-blue-100 text-blue-700 border-blue-200">
                          {average?.toFixed(2) || '—'}
                        </Badge>
                      </td>
                      <td className={`px-6 py-4 ${statusColor}`}>
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {modules.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl">
            <p className="text-gray-500 mb-4">Noch keine Module erfasst</p>
            <Button onClick={() => setModuleDialogOpen(true)} className="gap-2 rounded-2xl">
              <Plus className="w-4 h-4" />
              Erstes Modul hinzufügen
            </Button>
          </Card>
        ) : (
          modules.map(module => {
            const isExpanded = expandedModules.has(module.id);
            const average = calculateAverage(module.grades);

            return (
              <Card key={module.id} className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                      <div className="flex-1">
                        <p className="text-gray-900">{module.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-gray-500">
                            {module.grades.length} Note{module.grades.length !== 1 ? 'n' : ''}
                          </p>
                          <span className="text-gray-300">•</span>
                          <p className="text-gray-500">
                            Durchschnitt: {average?.toFixed(2) || '—'}
                          </p>
                        </div>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
                      <Badge className="rounded-xl bg-blue-100 text-blue-700 border-blue-200">
                        {average?.toFixed(2) || '—'}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                        onClick={() => {
                          if (confirm(`Modul "${module.name}" wirklich löschen?`)) {
                            onDeleteModule(module.id);
                            toast.success('Modul gelöscht');
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5">
                    {module.grades.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        Noch keine Noten für dieses Modul
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {module.grades.map(grade => (
                          <div
                            key={grade.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge className="rounded-xl bg-blue-100 text-blue-700 border-blue-200">
                                  {grade.value.toFixed(1)}
                                </Badge>
                                <Badge variant="secondary" className="rounded-xl">
                                  {grade.weight}%
                                </Badge>
                              </div>
                              {grade.description && (
                                <p className="text-gray-600 mt-1">{grade.description}</p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl h-8 w-8"
                                onClick={() => openEditDialog(module.id, grade)}
                              >
                                <Pencil className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl h-8 w-8"
                                onClick={() => {
                                  if (confirm('Note wirklich löschen?')) {
                                    onDeleteGrade(module.id, grade.id);
                                    toast.success('Note gelöscht');
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
