"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import ScaleLoader from "react-spinners/ScaleLoader";

const AddNoteForm: React.FC = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<string>("");
  const [semesterOptions, setSemesterOptions] = useState<string[]>([]);
  const [creditOptions] = useState<string[]>(["1", "2", "3", "4"]);

  const [subjectFullname, setSubjectFullName] = useState<string>("");
  const [subjectcode, setSubjectCode] = useState<string>(""); // Changed to subjectcode
  const [credit, setCredit] = useState<string>("");
  const [semister, setSemister] = useState<string>(""); // Changed to semister
  const [scheme, setScheme] = useState<string>("");

  const [error, setError] = useState<string>("");

  const handleYearChange = (selectedYear: string) => {
    setYear(selectedYear);
    const semesterMapping: Record<string, string[]> = {
      "1": ["1st Sem", "2nd Sem"],
      "2": ["3rd Sem", "4th Sem"],
      "3": ["5th Sem", "6th Sem"],
    };
    setSemesterOptions(semesterMapping[selectedYear] || []);
  };

  const validateForm = () => {
    const isValid =
      subjectFullname &&
      subjectcode && // Updated validation
      credit &&
      year &&
      semister && // Updated validation
      (year !== "1" || scheme);

    if (!isValid) {
      toast.error("Please fill in all fields.");
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisable(true);
    setLoading(true);

    if (!validateForm()) {
      setIsDisable(false);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        subjectFullname,
        subjectcode, // Updated to subjectcode
        credit,
        year,
        semister, // Updated to semister
        ...(year === "1" && { scheme }),
      };

      const res = await fetch("/api/note/add-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSubjectFullName("");
        setSubjectCode(""); // Updated to subjectcode
        setCredit("");
        setYear("");
        setSemister(""); // Updated to semister
        setScheme("");
        setSemesterOptions([]);

        toast.success("Note added successfully");
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    }

    setIsDisable(false);
    setLoading(false);
  };

  const inputStyles = isDisable
    ? "w-full px-4 py-2 border border-gray-400 bg-gray-100 text-gray-400 rounded-md focus:outline-none"
    : "w-full px-4 py-2 border border-fuchsia-500 bg-fuchsia-50 rounded-md focus:ring-1 focus:ring-fuchsia-500";

  return (
    <form
      className="max-w-3xl bg-fuchsia-100 p-8 rounded-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-center mb-10">Add New Resource</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Subject Full Name */}
        <div>
          <label className="block text-fuchsia-900 text-lg font-semibold mb-2">
            Subject Full Name:
          </label>
          <input
            disabled={isDisable}
            type="text"
            className={inputStyles}
            placeholder="Enter Subject Full Name"
            value={subjectFullname}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSubjectFullName(e.target.value)
            }
          />
        </div>

        {/* Credit */}
        <div>
          <label className="block text-fuchsia-900 text-lg font-semibold mb-2">
            Credit:
          </label>
          <select
            disabled={isDisable}
            className={inputStyles}
            value={credit}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCredit(e.target.value)
            }
          >
            <option value="">Select Credit</option>
            {creditOptions.map((creditValue) => (
              <option key={creditValue} value={creditValue}>
                {creditValue}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Code */}
        <div>
          <label className="block text-fuchsia-900 text-lg font-semibold mb-2">
            Subject Code:
          </label>
          <input
            disabled={isDisable}
            type="text"
            className={inputStyles}
            placeholder="Enter Subject Code"
            value={subjectcode} // Updated to subjectcode
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSubjectCode(e.target.value) // Updated to subjectcode
            }
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-fuchsia-900 text-lg font-semibold mb-2">
            Year:
          </label>
          <select
            disabled={isDisable}
            className={inputStyles}
            value={year}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleYearChange(e.target.value)
            }
          >
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-fuchsia-900 text-lg font-semibold mb-2">
            Semester:
          </label>
          <select
            disabled={isDisable}
            className={inputStyles}
            value={semister} // Updated to semister
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSemister(e.target.value) // Updated to semister
            }
          >
            <option value="">Select Semester</option>
            {semesterOptions.map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Scheme Selection (Only for 1st Year) */}
        {year === "1" && (
          <div>
            <label className="block text-fuchsia-900 text-lg font-semibold mb-2">
              Scheme:
            </label>
            <select
              disabled={isDisable}
              className={inputStyles}
              value={scheme}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setScheme(e.target.value)
              }
            >
              <option value="">Select Scheme</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          disabled={isDisable}
          className="bg-fuchsia-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-fuchsia-600 disabled:bg-fuchsia-300"
        >
          {loading ? <ScaleLoader color="#fff" height={20} /> : "Add Subject"}
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;
