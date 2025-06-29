const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const faqsPath = path.join(__dirname, "faqs.json");
const faqs = JSON.parse(fs.readFileSync(faqsPath, "utf-8"));

function findBestMatch(question) {
  question = question.toLowerCase();
  let maxMatches = 0;
  let bestAnswer = "Üzr istəyirəm, bu sual üçün hazır cavabımız yoxdur.";

  for (const faq of faqs) {
    const faqQuestion = faq.question.toLowerCase();
    const questionWords = question.split(" ");
    const faqWords = faqQuestion.split(" ");

    const matches = questionWords.filter(word => faqWords.includes(word)).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestAnswer = faq.answer;
    }
  }

  return bestAnswer;
}

app.post("/api/chat", (req, res) => {
  const userQuestion = req.body.question || "";
  const answer = findBestMatch(userQuestion);
  res.json({ reply: answer });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});
