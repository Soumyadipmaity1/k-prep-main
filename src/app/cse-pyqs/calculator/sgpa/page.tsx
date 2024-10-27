"use client"
import { useState } from 'react';
import { FiAward, FiBarChart2 } from 'react-icons/fi';

type Subject = {
  name: string;
  credits: number;
  grade: number | null;
};

const subjects: Subject[] = [
  { name: 'SE', credits: 4, grade: null },
  { name: 'CN', credits: 3, grade: null },
  { name: 'CN LAB', credits: 1, grade: null },
  { name: 'DAA', credits: 3, grade: null },
  { name: 'DAA LAB', credits: 1, grade: null },
  { name: 'EE', credits: 3, grade : null },
  { name: 'HPC/DOS', credits: 3, grade: null },
  { name: 'DMDW/CI/Compiler', credits: 3, grade: null },
];

const gradeToPoint = {
  'O': 10,
  'E': 9,
  'A': 8,
  'B': 7,
  'C': 6,
  'D': 5,
  'F': 0,
};

const getMotivationalMessage = (sgpa: number) => {
  if (sgpa >= 9) return {
    emoji: '🎯',
    title: 'Exceptional Performance!',
    message: 'You are among the top performers. Keep maintaining this excellence!'
  };
  if (sgpa >= 8) return {
    emoji: '⭐',
    title: 'Outstanding Work!',
    message: 'Your hard work is clearly showing. Keep this momentum!'
  };
  if (sgpa >= 7) return {
    emoji: '📈',
    title: 'Good Progress!',
    message: 'You\'re doing well! Push a little more for excellence.'
  };
  if (sgpa >= 6) return {
    emoji: '💪',
    title: 'Steady Progress!',
    message: 'Keep working hard, you\'re on the right path!'
  };
  return {
    emoji: '🎯',
    title: 'Time to Focus',
    message: 'Every challenge is an opportunity to improve!'
  };
};

const SGPACalculator = () => {
  const [grades, setGrades] = useState<{ [key: string]: number | null }>({});
  const [sgpa, setSgpa] = useState<number | null>(null);

  const handleGradeChange = (subjectName: string, grade: string) => {
    const gradePoint = gradeToPoint[grade as keyof typeof gradeToPoint] || 0;
    setGrades((prevGrades) => ({ ...prevGrades, [subjectName]: gradePoint }));
  };

  const calculateSGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach((subject) => {
      const gradePoint = grades[subject.name] || 0;
      totalPoints += gradePoint * subject.credits;
      totalCredits += subject.credits;
    });

    setSgpa(totalCredits ? totalPoints / totalCredits : 0);
  };

  return (
    <div className="w-full h-full bg-[#f8e9f4] overflow-y-auto border rounded-xl border-gray-300 ">
      <div className="max-w-7xl max-h-screen mx-auto p-4 px-3 pb-6 sm:p-10">
        <div className="subject-card p-6 rounded-2xl mb-6">
          <div className="flex items-center justify-center gap-3">
            <FiBarChart2 className="w-7 h-7 text-white" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              SGPA Calculator
            </h1>
          </div>
          <p className="text-white/90 text-center text-sm mt-2">
            Calculate your Semester Grade Point Average with ease
          </p>
        </div>

        {/* Rest of the calculator UI */}
        {/* ... (same as your notes calculator) ... */}
      </div>
    </div>
  );
};

export default SGPACalculator;
