"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ScaleLoader from "react-spinners/ScaleLoader";

const AddUser = () => {
  console.log("----------------------->")
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if user is not an admin
  // useEffect(() => {
  //   if (session?.user.role !== "admin") {
  //     router.push("/admin");
  //   }
  // }, [session, router]);

  const [subjectTitles, setSubjectTitles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    description: "",
    resourceTitle: "",
    url: "",
    subjectTitle: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch subject titles
  useEffect(() => {
    const getSubjectTitles = async () => {
      try {
        const { data } = await axios.get("/api/note/get-subject");
        setSubjectTitles(data.resource);
        console.log(data)
      } catch (error) {
        console.error("Error fetching subject titles:", error);
      }
    };

    getSubjectTitles();
  }, []);

  console.log(subjectTitles)
  


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      // console.log(formData.subjectTitle)
      const data = {
        description: formData.description,
        resourceTitle: formData.resourceTitle,
        url: formData.url,
        subjectFullNameId: formData.subjectTitle,
      };
      const res = await axios.post("/api/note/add-note", data);
      toast.success(res.data.message); // Show success toast

      // Reset form data
      setFormData({
        description: "",
        resourceTitle: "",
        url: "",
        subjectTitle: "",
      });
    } catch (error: any) {
      console.error("Error adding note:", error);
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="p-6 mx-auto max-w-3xl bg-[#fae8ff] rounded-md shadow-md">
      <h2 className="text-2xl font-bold text-center my-4 mb-8">Add Note</h2>
      <form onSubmit={handleSubmit}>
        {/* Subject Title Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="subjectTitle"
            className="block text-lg font-semibold text-fuchsia-800"
          >
            Subject Title
          </label>
          <select
            id="subjectTitle"
            name="subjectTitle"
            value={formData.subjectTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-600 border rounded-md py-2 px-3"
            required
            disabled={loading} // Disable select when loading
          >
            <option value="">Select Subject Title</option>
            {subjectTitles.map((item) => (
              <option key={item._id} value={item._id}>
                {item.subjectFullname}
              </option>
            ))}
          </select>
        </div>

        {/* Resource Title */}
        <div className="mb-4">
          <label
            htmlFor="resourceTitle"
            className="block text-lg font-semibold text-fuchsia-800"
          >
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
            disabled={loading} // Disable input when loading
          />
        </div>

        {/* Resource Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-fuchsia-800"
          >
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
            disabled={loading} // Disable input when loading
          />
        </div>

        {/* Add URL */}
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-lg font-semibold text-fuchsia-800"
          >
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
            disabled={loading} // Disable input when loading
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-fuchsia-600 rounded-md hover:bg-fuchsia-800"
          disabled={loading} // Disable button when loading
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

export default AddUser;





