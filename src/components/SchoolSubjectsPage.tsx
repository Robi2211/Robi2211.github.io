import { useState } from 'react';
import { SchoolSubject, Grade } from '../App';
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

type SchoolSubjectsPageProps = {
  subjects: SchoolSubject[];
  onAddSubject: (name: string) => void;
  onDeleteSubject: (id: string) => void;
  onAddGrade: (subjectId: string, value: number, weight: number, description?: string) => void;
  onDeleteGrade: (subjectId: string, gradeId: string) => void;
  onUpdateGrade: (subjectId: string, gradeId: string, value: number, weight: number, description?: string) => void;
};

export function SchoolSubjectsPage({
  subjects,
  onAddSubject,
  onDeleteSubject,
  onAddGrade,
  onDeleteGrade,
  onUpdateGrade,
}: SchoolSubjectsPageProps) {
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set(subjects.map(s => s.id)));
  const [subjectDialogOpen, setSubjectDialogOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [gradeWeight, setGradeWeight] = useState('');
  const [gradeDescription, setGradeDescription] = useState('');
  const [editingGrade, setEditingGrade] = useState<{ subjectId: string; gradeId: string; value: string; weight: string; description: string } | null>(null);

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAddSubject = () => {
    if (!subjectName.trim()) {
      toast.error('Bitte einen Fachnamen eingeben');
      return;
    }
    onAddSubject(subjectName);
    setSubjectName('');
    setSubjectDialogOpen(false);
    toast.success('Fach erfolgreich hinzugefügt');
  };

  const handleAddGrade = () => {
    const value = parseFloat(gradeValue);
    const weight = parseFloat(gradeWeight);

    if (!selectedSubjectId) {
      toast.error('Bitte ein Fach auswählen');
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

    onAddGrade(selectedSubjectId, value, weight, gradeDescription || undefined);
    setSelectedSubjectId('');
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

    onUpdateGrade(editingGrade.subjectId, editingGrade.gradeId, value, weight, editingGrade.description || undefined);
    setEditingGrade(null);
    setEditDialogOpen(false);
    toast.success('Note erfolgreich aktualisiert');
  };

  const openEditDialog = (subjectId: string, grade: Grade) => {
    setEditingGrade({
      subjectId,
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
          <h1 className="text-gray-900 mb-2">Fächer</h1>
          <p className="text-gray-500">Verwalte deine Schulnoten</p>
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
                  <Label htmlFor="subject-select">Fach</Label>
                  <select
                    id="subject-select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                  >
                    <option value="">Fach auswählen</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
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
                    placeholder="z.B. Klassenarbeit, Mündliche Prüfung"
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

          <Dialog open={subjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-2xl">
                <Plus className="w-4 h-4" />
                Fach hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Neues Fach</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject-name">Fachname</Label>
                  <Input
                    id="subject-name"
                    placeholder="z.B. Mathematik, Englisch, Sport"
                    className="rounded-xl"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="rounded-2xl" onClick={() => setSubjectDialogOpen(false)}>
                  Abbrechen
                </Button>
                <Button className="rounded-2xl" onClick={handleAddSubject}>Hinzufügen</Button>
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
                  placeholder="z.B. Klassenarbeit, Mündliche Prüfung"
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

      <div className="space-y-3">
        {subjects.length === 0 ? (
          <Card className="p-12 text-center rounded-2xl">
            <p className="text-gray-500 mb-4">Noch keine Fächer erfasst</p>
            <Button onClick={() => setSubjectDialogOpen(true)} className="gap-2 rounded-2xl">
              <Plus className="w-4 h-4" />
              Erstes Fach hinzufügen
            </Button>
          </Card>
        ) : (
          subjects.map(subject => {
            const isExpanded = expandedSubjects.has(subject.id);
            const average = calculateAverage(subject.grades);

            return (
              <Card key={subject.id} className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="p-5 border-b border-gray-200"
                  style={{ 
                    background: `linear-gradient(to right, ${subject.color}10, white)` 
                  }}
                >
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleSubject(subject.id)}
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: subject.color }}
                      />
                      <div className="flex-1">
                        <p className="text-gray-900">{subject.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-gray-500">
                            {subject.grades.length} Note{subject.grades.length !== 1 ? 'n' : ''}
                          </p>
                          <span className="text-gray-300">•</span>
                          <p className="text-gray-500">
                            Durchschnitt: {average?.toFixed(2) || '—'}
                          </p>
                        </div>
                      </div>
                    </button>
                    <div className="flex items-center gap-2">
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl"
                        onClick={() => {
                          if (confirm(`Fach "${subject.name}" wirklich löschen?`)) {
                            onDeleteSubject(subject.id);
                            toast.success('Fach gelöscht');
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
                    {subject.grades.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        Noch keine Noten für dieses Fach
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {subject.grades.map(grade => (
                          <div
                            key={grade.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  className="rounded-xl border"
                                  style={{ 
                                    backgroundColor: `${subject.color}20`, 
                                    color: subject.color,
                                    borderColor: subject.color 
                                  }}
                                >
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
                                onClick={() => openEditDialog(subject.id, grade)}
                              >
                                <Pencil className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-xl h-8 w-8"
                                onClick={() => {
                                  if (confirm('Note wirklich löschen?')) {
                                    onDeleteGrade(subject.id, grade.id);
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
