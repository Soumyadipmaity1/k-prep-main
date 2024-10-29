"use client";

import Footer from "@/components/Footer/footer";
import Navbar from "@/components/Menubar/Navbar/Navbar";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setQuery(searchParams.get("query") || "");
    }
  }, []);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/note/search-note?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data.results || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [query]);

  const highlightText = (text: any, query: any) => {
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part: any, index: number) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-[#fdf4f9]">
      <Navbar />

      <main className="max-w-7xl mx-auto min-h-[80vh] px-4 sm:px-6 lg:px-8 py-5 pt-10">
        <div className="mb-5">
          <div className="flex items-center space-x-3 mb-6">
            <FiSearch className="w-8 h-8 text-[#843AB1]" />
            <h1 className="text-4xl font-bold text-scheme">Search Results</h1>
          </div>

          <div className="subject-card p-6 rounded-2xl">
            <p className="text-white text-xl">
              Showing results for: &ldquo;{query}&rdquo;
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse">
                  <div className="bg-[#EE85BB]/20 rounded-2xl h-20"></div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((note: any) => (
                <div
                  key={note.id}
                  className="p-4 bg-white rounded-2xl shadow-md flex flex-col"
                >
                  {/* Dummy Card Image */}
                  {/* <img
                    src=""
                    alt="Dummy"
                    className="rounded-xl w-full mb-4"
                  /> */}

                  {/* Title with highlighted match */}
                  <h3 className="text-xl font-bold text-[#843AB1]">
                    {highlightText(note.resourceTitle, query)}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {`${note.subjectFullNameId.subjectFullname} (Credit: ${note.subjectFullNameId.credit} )`}
                    
                  </p>

                  {/* PDF View Button */}
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-[#843AB1] text-white py-2 px-4 rounded-xl text-center"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center py-5">
              <div className="bg-recommended rounded-3xl p-8">
                <FiSearch className="w-12 h-12 mx-auto mb-4 text-[#843AB1]" />
                <h3 className="text-2xl font-bold text-[#843AB1] mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try searching with different keywords
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default SearchPage;
