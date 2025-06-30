const express = require('express');
const app = express();
const port = 3000;

const faqs = require('./faqs.json');

app.use(express.json());
app.use(express.static('public'));

// FAQ sualları
app.get('/api/faqs', (req, res) => {
  const questions = faqs.map(item => item.question);
  res.json(questions);
});

// Chat endpoint
app.post('/api/chat', (req, res) => {
  const userQuestion = req.body.question.toLowerCase();

  const found = faqs.find(faq =>
    userQuestion.includes(faq.question.toLowerCase())
  );

  if (found) {
    res.json({ reply: found.answer });
  } else {
    res.json({ reply: 'Üzr istəyirik, bu suala cavab tapa bilmədik.' });
  }
});

app.listen(port, () => {
  console.log(`Server ${port}-də işləyir...`);
});
