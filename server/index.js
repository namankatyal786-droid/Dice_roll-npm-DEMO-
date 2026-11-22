const express = require('express');
const cors = require('cors');
const { rollDice } = require('naman-dice');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/roll', (req, res) => {
  const result = rollDice();
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
