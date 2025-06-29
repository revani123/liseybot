const faqs = require('../faqs.json');

module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnız POST sorğuları icazəlidir.' });
  }

  const userQuestion = req.body.question?.toLowerCase() || '';

  const found = faqs.find(item =>
    userQuestion.includes(item.question.toLowerCase())
  );

  if (found) {
    res.status(200).json({ answer: found.answer });
  } else {
    res.status(200).json({ answer: 'Üzr istəyirik, bu suala cavab tapa bilmədik.' });
  }
};
