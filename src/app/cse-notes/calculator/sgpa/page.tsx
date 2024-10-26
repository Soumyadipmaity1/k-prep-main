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

const FifthSemSGPACalculator = () => {
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
              5th Semester SGPA Calculator
            </h1>
          </div>
          <p className="text-white/90 text-center text-sm mt-2">
            Calculate your Semester Grade Point Average with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {subjects.map((subject) => (
            <div key={subject.name} 
              className="bg-recommended rounded-xl p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-[#843AB1]">{subject.name}</h3>
                  <span className="text-sm text-[#843AB1]/80">{subject.credits} Credits</span>
                </div>
                <select
                  aria-label={`Select grade for ${subject.name}`}
                  className="w-full sm:w-auto px-3 py-2 rounded-lg bg-white border border-[#EE85BB]/20
                           text-[#843AB1] focus:border-[#843AB1] focus:outline-none
                           hover:border-[#843AB1] transition-colors"
                  onChange={(e) => handleGradeChange(subject.name, e.target.value)}
                >
                  <option value="">Grade</option>
                  {Object.keys(gradeToPoint).map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pb-6">
          <button 
            onClick={calculateSGPA} 
            className="subject-card px-8 py-3 rounded-xl font-medium
                     hover:opacity-90 transition-all duration-300
                     flex items-center gap-2"
          >
            <FiAward className="w-5 h-5" />
            Calculate SGPA
          </button>
        </div>

        {sgpa !== null && (
          <div className="bg-recommended rounded-xl p-6 mb-5 max-w-2xl mx-auto">
            <div className="text-center mb-4">
              <span className="text-[#843AB1]/80 text-sm">Your SGPA</span>
              <h3 className="text-5xl font-bold text-[#843AB1] mt-1">
                {sgpa.toFixed(2)}
              </h3>
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-[#843AB1]">
                {getMotivationalMessage(sgpa).emoji} {getMotivationalMessage(sgpa).title}
              </p>
              <p className="text-[#843AB1]/80 text-sm">
                {getMotivationalMessage(sgpa).message}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FifthSemSGPACalculator;
