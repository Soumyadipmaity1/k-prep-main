"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Subject1Notes from "@/components/Resource1stYear/ResourceSchemeA/Subject1Notes";
import { useSearchParams } from "next/navigation";

export type PyqType = {
  resourceTitle: string;
  description: string;
  url: string;
  rating: number;
};

const Subject1 = () => {
  const [pyqs, setPyqs] = useState<PyqType[]>([]);
  const searchParams = useSearchParams();
  const ID = searchParams.get("id");

  useEffect(() => {
    const fetchPyqs = async () => {
      if (ID) {
        try {
          const { data } = await axios.get(`/api/pyq/view-resources?id=${ID}`);
          setPyqs(data.pyqs);
        } catch (error) {
          console.error("Error fetching PYQs:", error);
        }
      }
    };

    fetchPyqs();
  }, [ID]);

  return (
    <div className="w-full h-full bg-[#f8e9f4] overflow-y-auto border rounded-xl border-gray-300">
      <div className="max-h-screen font-bold px-3 py-5 sm:p-10">
        <h1 className="text-center text-4xl">
          <span className="modal-text">Pick your PYQs!</span>
        </h1>
        <div className="sm:mt-10 mt-6">
          <Subject1Notes notes={pyqs} />
        </div>
      </div>
    </div>
  );
};

export default Subject1;
