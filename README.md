# 🛡️ SpamGuardian

SpamGuardian is a lightweight, open-source Discord moderation bot built with **Node.js** and **discord.js**.

It automatically detects duplicate text messages and repeated attachments posted across one or multiple channels, removes the spam, temporarily timeouts offenders, and logs every moderation action to a dedicated moderation channel.

---

# ✨ Features

- 🚫 Detects duplicate text messages
- 📷 Detects duplicate attachments (Images, GIFs, Videos & Files)
- 🌐 Cross-channel spam detection
- 🗑️ Deletes all matching spam messages
- ⏱️ Automatically timeouts offenders
- 📝 Moderation logging
- ⚡ Lightweight with no database required
- ☁️ Easy deployment on Render
- 🔧 Configurable through environment variables

---

# ⚙️ Default Configuration

| Setting | Default |
|----------|---------|
| Duplicate Threshold | 2 |
| Detection Window | 5 Seconds |
| Timeout Duration | 6 Hours |

---

# 📦 Installation

Clone the repository.

```bash
git clone https://github.com/alcatrazchronicle/SpamGuardianDiscord.git
cd SpamGuardianDiscord
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
7. Enable the following Privileged Gateway Intents:
   - ✅ Server Members Intent
   - ✅ Message Content Intent

---

# 🔗 Invite the Bot

Open:

**OAuth2 → URL Generator**

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

# 📋 Get Your Moderation Log Channel ID

Enable **Developer Mode**.

```
Discord
→ User Settings
→ Advanced
→ Developer Mode
```

Then:

- Right-click your moderation log channel
- Click **Copy Channel ID**

---

# 💻 Run Locally

Create a `.env` file.

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
MOD_LOG_CHANNEL_ID=YOUR_CHANNEL_ID

TIMEOUT_HOURS=6
CHANNEL_THRESHOLD=2
TIME_WINDOW_SECONDS=5
```

Start the bot.

```bash
npm start
```

---

# ☁️ Deploy on Render

## Step 1 — Push to GitHub

```bash
git add .
git commit -m "Initial Commit"
git push origin main
```

---

## Step 2 — Create a Render Account

Visit:

https://render.com

Sign in with GitHub.

---

## Step 3 — Create a Web Service

- Click **New +**
- Select **Web Service**
- Choose your GitHub repository

---

## Step 4 — Configure

| Setting | Value |
|----------|-------|
| Runtime | Node |
| Build Command | `npm install` |
| Start Command | `npm start` |

---

## Step 5 — Environment Variables

Add the following variables.

| Variable | Value |
|----------|-------|
| TOKEN | Discord Bot Token |
| MOD_LOG_CHANNEL_ID | Channel ID |
| TIMEOUT_HOURS | 6 |
| CHANNEL_THRESHOLD | 2 |
| TIME_WINDOW_SECONDS | 5 |

> Do **NOT** upload your `.env` file.
>
> Configure these values inside Render.

---

## Step 6 — Deploy

Click **Create Web Service**.

Render will automatically:

- Install dependencies
- Build the project
- Start the bot

Whenever you push new commits to GitHub, Render will automatically redeploy the latest version.

---

# 🔄 Updating the Bot (VS Code)

Whenever you make changes to the project:

Open the project in **Visual Studio Code**.

Open the integrated terminal.

Stage your changes.

```bash
git add .
```

Commit them.

```bash
git commit -m "Describe your changes"
```

Push them to GitHub.

```bash
git push origin main
```

If Auto Deploy is enabled, Render will automatically deploy the latest version.

You can monitor deployment progress from the **Render → Deploys** page.

---

# 📡 Optional: UptimeRobot

> **Note**
>
> UptimeRobot is an uptime monitoring service. It periodically checks your application and can notify you if it becomes unavailable. While some users use it to send regular HTTP requests, it does **not guarantee** that a Render Free service will stay online continuously.

## Create a Monitor

1. Create a free account at:
   https://uptimerobot.com

2. Click **Add New Monitor**

3. Select:

```
HTTP(s)
```

4. Enter your Render URL.

```
https://spamguardiandiscord.onrender.com/
```

5. Leave the monitoring interval on the free plan (5 minutes).

6. Save the monitor.

---

# 📁 Project Structure

```text
SpamGuardianDiscord/
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
|----------|-------------|
| TOKEN | Discord Bot Token |
| MOD_LOG_CHANNEL_ID | Moderation Log Channel ID |
| TIMEOUT_HOURS | Timeout duration |
| CHANNEL_THRESHOLD | Duplicate threshold |
| TIME_WINDOW_SECONDS | Detection window |

---

# 🔒 Required Bot Permissions

The bot requires:

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
- Enable Message Content Intent.
- Check Render deployment logs.
- Verify all environment variables are configured correctly.

---

## Bot Cannot Delete Messages

Ensure the bot has:

- Manage Messages
- View Channels
- Read Message History

---

## Bot Cannot Timeout Members

Ensure:

- Moderate Members permission is enabled.
- The bot role is above the member's role.

---

## Environment Variables Not Working

Do **NOT** commit your `.env` file.

Instead, configure all environment variables inside Render.

If you change any variable, redeploy the service.

---

# 💰 Render Free Plan

SpamGuardian works on Render's Free plan.

Please note that free services may spin down after periods of inactivity depending on Render's current policies. If continuous uptime is required, consider upgrading to a paid Render plan or using another hosting provider. Some users choose to use UptimeRobot to send periodic HTTP requests to their application. This may help keep the service active in some situations, but **it is not guaranteed** and is **not officially supported by Render**.

## Step 1 — Create a Free Account

Go to:

https://uptimerobot.com

Create a free account.

---

## Step 2 — Add a New Monitor

Click:

```
+ Add New Monitor
```

---

## Step 3 — Configure the Monitor

| Setting | Value |
|---------|-------|
| Monitor Type | HTTP(s) |
| Friendly Name | SpamGuardian |
| URL | `https://spamguardiandiscord.onrender.com/` |
| Monitoring Interval | 5 Minutes (Free Plan) |

---

## Step 4 — Save

Click **Create Monitor**.

UptimeRobot will automatically send an HTTP request to your Render application every 5 minutes and notify you if the service becomes unavailable.

> **Note**
>
> This setup is optional. It does **not** guarantee that a Render Free service will remain online continuously, but it may help keep the application active depending on Render's current platform behavior.

---

# 🚀 Roadmap

Planned features:

- Slash Commands
- Per-server configuration
- Dashboard
- Database support
- Role & Channel whitelist
- Edit message detection
- Smarter attachment fingerprinting
- Configurable rate limits

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you found SpamGuardian useful, consider giving the repository a ⭐ on GitHub. It helps others discover the project and supports future development.
