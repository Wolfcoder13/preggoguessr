import { connectToDatabase } from "../../lib/db";
import sql from "mssql";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, sex, weight, birthDate, birthTime, length, dayOfWeek, zodiacSign } = req.body;

    try {
      const pool = await connectToDatabase();
      await pool
        .request()
        .input("fullName", sql.NVarChar, fullName)
        .input("sex", sql.NVarChar, sex)
        .input("weight", sql.Int, weight)
        .input("birthDate", sql.Date, birthDate)
        .input("birthTime", sql.NVarChar, birthTime)
        .input("length", sql.Int, length)
        .input("dayOfWeek", sql.NVarChar, dayOfWeek)
        .input("zodiacSign", sql.NVarChar, zodiacSign)
        .query(
          "INSERT INTO andrivg.Guesses (fullName, sex, weight, birthDate, birthTime, length, dayOfWeek, zodiacSign) VALUES (@fullName, @sex, @weight, @birthDate, @birthTime, @length, @dayOfWeek, @zodiacSign)"
        );

      res.status(200).json({ message: "Guess saved successfully!" });
    } catch (error) {
      console.error("Database insertion failed:", error);
      res.status(500).json({ message: "Error saving guess" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
