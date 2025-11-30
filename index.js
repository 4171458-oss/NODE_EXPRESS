import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/services", async (req, res) => {
  try {
    const response = await fetch("https://api.render.com/v1/services", {
      headers: {
        "Authorization": `Bearer ${process.env.RENDER_API_TOKEN}`,
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
