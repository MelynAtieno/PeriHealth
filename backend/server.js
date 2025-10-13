import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => res.send("API running"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Backend URL: http://localhost:${PORT}`);
});
