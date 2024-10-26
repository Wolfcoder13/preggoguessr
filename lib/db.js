import sql from "mssql";

let pool;

export async function connectToDatabase() {
  if (!pool) {
    try {
      pool = await sql.connect({
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        server: process.env.DATABASE_SERVER,
        database: process.env.DATABASE_NAME,
        options: {
          encrypt: true, // Use encryption for Azure SQL
          trustServerCertificate: false, // Only if using self-signed certificates
        },
      });
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }
  return pool;
}
