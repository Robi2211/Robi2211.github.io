import { AppData, Grade } from '../App';

export function calculateAverage(grades: Grade[]): number | null {
  if (grades.length === 0) return null;

  const totalWeight = grades.reduce((sum, grade) => sum + grade.weight, 0);
  
  if (totalWeight === 0) return null;

  const weightedSum = grades.reduce((sum, grade) => sum + (grade.value * grade.weight), 0);
  
  return weightedSum / totalWeight;
}

export function calculateOverallGPA(data: AppData): number | null {
  const allGrades = [
    ...data.modules.flatMap(m => m.grades),
    ...data.schoolSubjects.flatMap(s => s.grades),
  ];

  return calculateAverage(allGrades);
}
