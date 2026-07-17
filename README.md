# 🛡️ SpamGuardian

SpamGuardian is an open-source Discord moderation bot built with **Node.js** and **discord.js**.

It automatically detects users who spam duplicate messages or attachments across one or multiple channels, deletes the spam, timeouts the offender, and logs every moderation action.

---

# ✨ Features

- 🚫 Detects duplicate text messages
- 📷 Detects duplicate attachments (Images, GIFs, Videos, Files)
- 🌐 Works across multiple channels
- 🗑️ Deletes all spam messages
- ⏱️ Automatically timeouts offenders
- 📝 Sends moderation logs to a dedicated channel
- ⚡ Lightweight and easy to deploy
- ☁️ Supports 24/7 hosting with Render

---

# ⚙️ Default Configuration

| Setting | Default |
|---------|---------|
| Duplicate Threshold | 2 |
| Detection Window | 5 Seconds |
| Timeout Duration | 6 Hours |

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/alcatrazchronicle/SpamGuardian.git
cd SpamGuardian
npm install
```

---

# 🤖 Create a Discord Bot

1. Visit https://discord.com/developers/applications
2. Click **New Application**
3. Give your application a name
4. Open the **Bot** tab
5. Click **Add Bot**
6. Copy your **Bot Token**
7. Enable these Privileged Gateway Intents:
   - ✅ Server Members Intent
   - ✅ Message Content Intent

---

# 🔗 Invite the Bot

Go to:

**OAuth2 → URL Generator**

Select:

### Scopes

- bot

### Bot Permissions

- View Channels
- Read Message History
- Send Messages
- Manage Messages
- Moderate Members
- Embed Links

Copy the generated URL into your browser and invite the bot to your server.

---

# 📋 Get Your Mod Log Channel ID

Enable **Developer Mode** in Discord.

```
User Settings
→ Advanced
→ Developer Mode
```

Then:

- Right-click your moderation log channel
- Click **Copy Channel ID**

---

# 💻 Option 1 — Run Locally

Perfect for testing and development.

## Create a `.env` file

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
MOD_LOG_CHANNEL_ID=YOUR_CHANNEL_ID

TIMEOUT_HOURS=6
CHANNEL_THRESHOLD=2
TIME_WINDOW_SECONDS=5
```

## Start the bot

```bash
npm start
```

If everything is configured correctly, your bot should come online.

---

# ☁️ Option 2 — Deploy on Render (24/7)

Perfect if you want your bot online all the time.

## Step 1 — Push to GitHub

```bash
git add .
git commit -m "Initial Commit"
git push
```

---

## Step 2 — Create a Render Account

Visit:

https://render.com

Sign in using GitHub.

---

## Step 3 — Create a Web Service

- Click **New +**
- Select **Web Service**
- Choose your GitHub repository

---

## Step 4 — Configure

| Setting | Value |
|---------|-------|
| Environment | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

---

## Step 5 — Add Environment Variables

Inside **Environment**, add these variables one by one.

| Variable | Value |
|---------|---------|
| TOKEN | Your Discord Bot Token |
| MOD_LOG_CHANNEL_ID | Your Channel ID |
| TIMEOUT_HOURS | 6 |
| CHANNEL_THRESHOLD | 2 |
| TIME_WINDOW_SECONDS | 5 |

> **Do NOT upload your `.env` file.**
>
> Render stores these values securely.

---

## Step 6 — Deploy

Click **Create Web Service**.

Render will automatically:

- Install dependencies
- Build the project
- Start your bot

Whenever you push updates to GitHub, Render will automatically redeploy the latest version.

---

# 📁 Project Structure

```
SpamGuardian/
│
├── index.js
├── package.json
├── README.md
│
├── services/
│   ├── spamDetector.js
│   └── attachmentDetector.js
│
└── .env
```

---

# 🔑 Environment Variables

| Variable | Description |
|---------|-------------|
| TOKEN | Discord Bot Token |
| MOD_LOG_CHANNEL_ID | Moderation Log Channel ID |
| TIMEOUT_HOURS | Timeout duration |
| CHANNEL_THRESHOLD | Duplicate messages before punishment |
| TIME_WINDOW_SECONDS | Detection window |

---

# 🔒 Required Bot Permissions

Your bot must have:

- View Channels
- Read Message History
- Send Messages
- Manage Messages
- Moderate Members
- Embed Links

The bot's role must also be **higher than the members it needs to moderate**.

---

# ❓ Troubleshooting

## Bot is Offline

- Verify your bot token.
- Make sure Message Content Intent is enabled.
- Check Render deployment logs.
- Confirm all environment variables are set correctly.

---

## Bot Cannot Delete Messages

Ensure the bot has:

- Manage Messages
- View Channels
- Read Message History

---

## Bot Cannot Timeout Users

Ensure:

- Moderate Members permission is enabled.
- The bot's highest role is above the user's role.

---

## Environment Variables Not Working

Do **NOT** commit your `.env` file.

Instead, add each variable manually inside Render.

If you change any environment variable, redeploy the service.

---

# 💰 Render Free Plan

SpamGuardian runs on Render's Free plan.

To avoid unexpected charges:

- Keep your service on the **Free** instance type.
- Monitor usage in your Render dashboard.
- Do not upgrade to a paid instance unless you intend to.
- A temporary **$1 authorization hold** may appear when adding a payment method. This is usually a card verification and not a recurring charge.

---

# 🚀 Future Improvements

- Edit message spam detection
- Slash commands
- Per-server configuration
- Database support
- Role & channel whitelist
- Dashboard
- Smarter attachment fingerprinting

---

# 🤝 Contributing

Pull requests, bug reports, and feature suggestions are always welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
