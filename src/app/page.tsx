"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  fullName: string;
  sex: string;
  weight: string;
  birthDate: string;
  birthTime: string;
  length: string;
}

interface Guess {
  id: number;
  fullName: string;
  sex: string;
  weight: number;
  birthDate: string;
  birthTime: string;
  length: number;
  createdAt: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    sex: "",
    weight: "",
    birthDate: "2024-04-11", // Default to April 11th, 2024
    birthTime: "",
    length: "",
  });

  const [, setGuesses] = useState<Guess[]>([]);

  useEffect(() => {
    async function fetchGuesses() {
      const response = await fetch("/api/get-guesses");
      const data = await response.json();
      setGuesses(data);
    }
    fetchGuesses();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        setFormData({
          fullName: "",
          sex: "",
          weight: "",
          birthDate: "2024-04-11", // Reset to April 11th, 2024
          birthTime: "",
          length: "",
        });
      } else {
        alert("Failed to submit guess.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition duration-300">
      {/* Responsive Container */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Image (Desktop) */}
        <div className="hidden lg:flex md:flex-col md:w-1/4 items-center justify-between p-4">

          <Image
            src="/photo3.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
          <Image
            src="/photo1.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
          <Image
            src="/photo4.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
          <Image
            src="/photo2.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          {/* Introduction Text */}
          <div className="w-full p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg mb-6 space-y-5">
            <h2 className="text-3xl font-bold text-center text-pink-500 dark:text-pink-400 mb-4">
              Welcome to Our Baby Guessing Game!
            </h2>
            <p className="text-center text-blue-500 dark:text-blue-400 mb-4">
              👶{" "}
              <strong>
                Join us in the excitement as we await the arrival of our little
                bundle of joy!
              </strong>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Hello dear friends and family,
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              As we count down the days until our baby's arrival, we thought it
              would be delightful to share the joy and anticipation with you
              all. We invite you to participate in a fun and friendly guessing
              game!
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Think you can predict:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-2">
              <li>
                The <strong>sex</strong> of our baby?
              </li>
              <li>
                The exact <strong>date</strong> and <strong>time</strong>
                they'll make their grand entrance?
              </li>
              <li>
                How much they'll <strong>weigh</strong> and how{" "}
                <strong>long</strong> they'll be at birth?
              </li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Put on your prediction hats and submit your best guesses! You'll
              earn points based on how close your predictions are—the closer
              your guesses are to the actual results, the more points you'll
              receive. The person with the highest total points will win a
              special prize from us!
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              To keep things fair, we want everybody to know the{" "}
              <span className="font-bold underline">
                due date is April 11th, 2025
              </span>
              . We can't wait to see who comes closest to the actual details
              when the big day arrives!
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              Thank you for being a part of this special journey. We can't wait
              to see your guesses and share the joy when the big day arrives!
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              With love and excitement,
              <br />
              <em>Andri and Pan</em>
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
          >
            <h1 className="text-2xl font-bold text-center text-pink-500 dark:text-blue-400">
              Baby Guessing Game
            </h1>
            <p className="text-center text-blue-500 dark:text-pink-400">
              Submissions close on December 1st, 2024. Good luck! 🎉
            </p>

            {/* Participant Information */}
            <div className="space-y-4 mt-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-pink-300 dark:border-blue-500 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Guess Details */}
            <div className="space-y-4 mt-6">
              <div className="flex justify-center">
                <h2 className="text-xl font-semibold text-pink-500 dark:text-blue-400">
                  Guess Details
                </h2>
              </div>

              <div>
                <label
                  htmlFor="sex"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Sex
                </label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 dark:border-pink-500 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400"
                  required
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Boy</option>
                  <option value="Female">Girl</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="weight"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Weight (in grams)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Enter weight in grams"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full p-2 border border-pink-300 dark:border-blue-500 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="length"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Length at Birth (in cm)
                </label>
                <input
                  type="number"
                  id="length"
                  name="length"
                  placeholder="Enter length in cm"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 dark:border-pink-500 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="Date of Birth"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-pink-300 dark:border-blue-500 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-blue-400"
                  min="2024-04-11" // Sets the minimum selectable date to April 11, 2024
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="birthTime"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Time of Birth
                </label>
                <input
                  type="time"
                  id="birthTime"
                  name="birthTime"
                  placeholder="Time of Birth"
                  value={formData.birthTime}
                  onChange={handleChange}
                  className="w-full p-2 border border-blue-300 dark:border-pink-500 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-6 rounded bg-blue-500 hover:bg-blue-600 dark:bg-pink-500 dark:hover:bg-pink-600 text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-pink-400 focus:ring-opacity-50 transition duration-300"
            >
              Submit Guess
            </button>
          </form>
        </div>

        {/* Right Image (Desktop) */}
        <div className="hidden lg:flex md:flex-col md:w-1/4 items-center justify-between p-4">
          <Image
            src="/photo2.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
          <Image
            src="/photo4.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
          <Image
            src="/photo1.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
          <Image
            src="/photo3.jpg" // Replace with your image filename
            alt="Baby Image Left"
            width={600}
            height={1000}
            className="object-contain"
          />
        </div>
      </div>

      {/* Bottom Images (Mobile) */}
      <div className="flex lg:hidden w-full justify-around m-4 p-4">
        <Image
          src="/photo3.jpg" // Replace with your image filename
          alt="Baby Image Left"
          width={600}
          height={1000}
          className="object-contain w-full rounded-lg"
        />
      </div>
    </div>
  );
}
