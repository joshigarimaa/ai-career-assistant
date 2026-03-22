const express = require("express");
const multer = require("multer");
require("dotenv").config();

const { extractText } = require("./utils/pdfParser");
const { analyzeResume } = require("./services/aiService"); 

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
});

app.get("/", (req, res) => {
  res.send("Heyaaaaaaaa");
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    console.log("File:", req.file.originalname);
    const text = await extractText(req.file.buffer);
    const analysis = await analyzeResume(text);
    console.log(analysis);
    res.send(analysis);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).send("Error processing resume");
  }
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});