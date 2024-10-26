"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  fullName: string;
  sex: string;
  weight: string;
  birthDate: string;
  birthTime: string;
  length: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    sex: "",
    weight: "",
    birthDate: "",
    birthTime: "",
    length: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Guess submitted successfully!");
      } else {
        alert("Failed to submit guess.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 transition duration-300">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Baby Guessing Game</h1>
        <p className="text-center text-gray-700 dark:text-gray-200">Expected Date: April 11th</p>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="sex"
          value={formData.sex}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Veldu Kyn / Select Sex</option>
          <option value="Boy">Strákur / Boy</option>
          <option value="Female">Stelpa / Girl</option>
        </select>

        <input
          type="number"
          name="weight"
          placeholder="Weight (in grams)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="date"
          name="birthDate"
          placeholder="Date of Birth"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="time"
          name="birthTime"
          placeholder="Time of Birth"
          value={formData.birthTime}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          name="length"
          placeholder="Length at birth (in cm)"
          value={formData.length}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button type="submit" className="w-full py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
          Submit Guess
        </button>
      </form>
    </div>
  );
}
