import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


import app from "./app.js";
import connectDB from "./db/db.js";

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ App is Listening At http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection error:", err);
    process.exit(1);
  });
