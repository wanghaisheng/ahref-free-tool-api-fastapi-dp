"use client";
import React, { useState, useEffect } from "react";
import { useAhrefsStore } from "./ahrefdata";

const Ahref = () => {
  const [keywords, setKeywords] = useState(""); // State to store the search keywords
  const { ahrefData, ahrefError, fetchAhrefs } = useAhrefsStore(); // Destructure state and actions
  const [inputHint, setInputHint] = useState(""); // State to store input hints
  const MAX_KEYWORD_LENGTH = 100;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedKeywords = keywords.trim();

    // Check if the input is empty or exceeds the maximum length
    if (trimmedKeywords === "") {
      setInputHint("Please enter some keywords.");
      return;
    } else if (trimmedKeywords.length > MAX_KEYWORD_LENGTH) {
      setInputHint(
        `Please reduce the length of keywords. Maximum allowed is ${MAX_KEYWORD_LENGTH} characters.`
      );
      return;
    }

    // Clear the hint when the input is valid
    setInputHint("");
    await fetchAhrefs(trimmedKeywords); // Pass the array of keywords
  };
  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="keywords" className="sr-only">
          Enter Keywords:
        </label>
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Type keywords here"
          className="p-2 border border-gray-300 rounded-md mb-4"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {ahrefError && (
        <div className="text-red-600 mt-2">Error: {ahrefError}</div>
      )}

      {ahrefData && ahrefData.length > 0 && (
        <table className="min-w-full mt-4">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2">Keyword</th>
              <th className="px-4 py-2">KD</th>
              <th className="px-4 py-2">Domain Authority (DA)</th>
            </tr>
          </thead>
          <tbody>
            {ahrefData.map((data, index) => (
              <tr key={`ahref_${index}`} className="border-b">
                <td className="px-4 py-2">{data.keyword}</td>
                <td className="px-4 py-2">{data.kd}</td>
                <td className="px-4 py-2">{data.des}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ahref;
