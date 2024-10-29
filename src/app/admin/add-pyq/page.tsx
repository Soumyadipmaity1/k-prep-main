"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useQuery } from "@tanstack/react-query";

interface FormData {
  description: string;
  resourceTitle: string;
  url: string;
  subjectTitle: string;
  year: string;
  session: string;
}

interface Note {
  _id: string;
  subjectFullname: string;
}

const AddPYq: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    resourceTitle: "",
    url: "",
    subjectTitle: "",
    year: "",
    session: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { isLoading, isError, data } = useQuery<{ notes: Note[] }>({
    queryKey: ["notes"],
    queryFn: () => axios.get("/api/note/view-note").then((res) => res.data),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        description: formData.description,
        title: formData.resourceTitle,
        url: formData.url,
        subjectFullNameId: formData.subjectTitle,
        year: formData.year,
        session: formData.session,
      };
      const res = await axios.post("/api/pyq/add-pyq", postData);
      toast.success(res.data.message);

      setFormData({
        description: "",
        resourceTitle: "",
        url: "",
        subjectTitle: "",
        year: "",
        session: "",
      });
    } catch (error: any) {
      console.error("Error adding note:", error);
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-auto max-w-3xl bg-[#fae8ff] rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center my-4 mb-8">Add Note</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Subject Title Dropdown */}
        <div className="mb-4">
          <label htmlFor="subjectTitle" className="block text-lg font-semibold text-fuchsia-800">
            PYQ Subject Name ({data?.notes.length ?? 0})
          </label>
          <select
            id="subjectTitle"
            name="subjectTitle"
            value={formData.subjectTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading}
          >
            <option value="">Select Subject Title</option>
            {data?.notes.map((item: Note) => (
              <option key={item._id} value={item._id}>
                {item.subjectFullname}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="mb-4">
          <label htmlFor="year" className="block text-lg font-semibold text-fuchsia-800">
            Year
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading}
          >
            <option value="">Select Year</option>
            {[...Array(12).keys()].map(i => (
              <option key={2013 + i} value={2013 + i}>
                {2013 + i}
              </option>
            ))}
          </select>
        </div>

        {/* Session Dropdown */}
        <div className="mb-4">
          <label htmlFor="session" className="block text-lg font-semibold text-fuchsia-800">
            Session
          </label>
          <select
            id="session"
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading}
          >
            <option value="">Select Session</option>
            <option value="autumn">Autumn</option>
            <option value="spring">Spring</option>
          </select>
        </div>

        {/* Resource Title */}
        <div className="mb-4">
          <label htmlFor="resourceTitle" className="block text-lg font-semibold text-fuchsia-800">
            Resource Title
          </label>
          <input
            type="text"
            id="resourceTitle"
            name="resourceTitle"
            value={formData.resourceTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading}
          />
        </div>

        {/* Resource Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-semibold text-fuchsia-800">
            Resource Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading}
          />
        </div>

        {/* Add URL */}
        <div className="mb-4">
          <label htmlFor="url" className="block text-lg font-semibold text-fuchsia-800">
            Add URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-fuchsia-600 rounded-md hover:bg-fuchsia-800"
          disabled={loading}
        >
          {loading ? (
            <ScaleLoader color="#ffffff" height={10} width={2} />
          ) : (
            "Add Note"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddPYq;
