"use client";
import React, { useState, useEffect } from "react";
import { NoteType } from "@/app/cse-notes/2nd-year/3rdSem/[subjectName]/page";

const Subject1Notes = ({ notes }: { notes: NoteType[] }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading effect for demonstration (you can adjust based on actual data loading)
  useEffect(() => {
    if (notes) {
      setLoading(false);
    }
  }, [notes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-purple-600 font-semibold">
          Loading notes...
        </p>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-purple-600 font-semibold">
          No notes available for this subject.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center py-2">
      {notes.map((resource, index) => (
        <div
          key={index}
          className="sm:max-w-sm p-6 m-4 bg-white rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-5">
            <h2 className="text-xl font-bold text-purple-700">
              {resource.resourceTitle}
            </h2>
          </div>
          <p className="mt-2 font-thin text-gray-600">{resource.description}</p>

          <div className="mt-4">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
            >
              View Note
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Subject1Notes;
