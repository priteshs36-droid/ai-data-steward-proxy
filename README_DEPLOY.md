# 🚀 AI Data Steward Vercel Proxy (GPT-4.1-nano)

This project is a simple proxy API that connects your web app to OpenAI securely via Vercel.

---
## ⚙️ Steps to Deploy on Vercel

### 1️⃣ Create a GitHub Repo
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/ai-data-steward-proxy.git
git push -u origin main
```

### 2️⃣ Deploy on Vercel
- Go to https://vercel.com/
- Click **Add New → Project → Import Git Repository**
- Choose your repo
- Build Command: `npm install`
- Start Command: `npm start`

### 3️⃣ Add Environment Variable
Go to **Settings → Environment Variables** and add:
```
OPENAI_KEY = sk-xxxxxx
```

### 4️⃣ Test Endpoint
Once deployed, test with:
```
https://<your-project>.vercel.app/api/chat
```

### 5️⃣ Connect to Your Chatbot
Update your HTML:
```js
const proxyURL = "https://<your-project>.vercel.app/api/chat";
```
Then enjoy your live AI Data Steward Assistant 🧠💬