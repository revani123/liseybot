// api/chat.js
const path = require('path');
const fs = require('fs');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  // JSON faylını oxuma
  const faqsPath = path.join(process.cwd(), 'faqs.json');
  const faqsData = JSON.parse(fs.readFileSync(faqsPath, 'utf8'));

  const userQuestion = req.body.question?.toLowerCase() || "";

  const found = faqsData.find((item) =>
    userQuestion.includes(item.question.toLowerCase())
  );

  if (found) {
    res.status(200).json({ answer: found.answer });
  } else {
    res.status(200).json({ answer: 'Üzr istəyirik, bu suala cavab tapa bilmədik.' });
  }
};
}
