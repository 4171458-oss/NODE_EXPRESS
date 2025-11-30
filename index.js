import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// DEBUG – לוודא שהטוקן נטען
console.log("=== DEBUG: Render API Token ===");
console.log("Exists:", !!process.env.RENDER_API_KEY);
console.log("First 6 chars:", process.env.RENDER_API_KEY?.substring(0, 6));
console.log("================================");

app.get("/services", async (req, res) => {
  try {
    const response = await fetch("https://api.render.com/v1/services", {
      headers: {
        "Authorization": `Bearer ${process.env.RENDER_API_KEY}`,
        "Accept": "application/json"
      }
    });

    // אם קרה שגיאה מצד ה-API
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        error: "Render API error",
        status: response.status,
        message: text
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
