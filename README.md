# 🛡️ SpamGuardian

SpamGuardian is a lightweight Discord moderation bot built with **Node.js** and **discord.js** that automatically detects and removes spam across multiple channels.

## Features

- 🚫 Detects duplicate text messages
- 📷 Detects duplicate attachments (images, GIFs, videos, files)
- 🗑️ Deletes all detected spam messages
- ⏱️ Automatically timeouts offenders
- 📝 Logs moderation actions to a dedicated mod-log channel
- ⚡ Lightweight and easy to deploy on Render

---

## Detection Logic

SpamGuardian detects spam when a user sends the **same message or attachment** multiple times within a configurable time window.

Default configuration:

| Setting | Default |
|---------|---------|
| Time Window | 5 seconds |
| Threshold | 2 duplicate messages/attachments |
| Timeout | 6 hours |

---

## Tech Stack

- Node.js
- discord.js
- Express (for Render health checks)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/SpamGuardian.git

cd SpamGuardian
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
MOD_LOG_CHANNEL_ID=YOUR_MOD_LOG_CHANNEL_ID

TIMEOUT_HOURS=6
CHANNEL_THRESHOLD=2
TIME_WINDOW_SECONDS=5
```

Start the bot:

```bash
npm start
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| TOKEN | Discord Bot Token |
| MOD_LOG_CHANNEL_ID | Channel ID for moderation logs |
| TIMEOUT_HOURS | User timeout duration |
| CHANNEL_THRESHOLD | Number of duplicate messages required |
| TIME_WINDOW_SECONDS | Detection window |

---

## Required Bot Permissions

The bot requires:

- View Channels
- Read Message History
- Send Messages
- Manage Messages
- Moderate Members
- Embed Links

---

## Deploying to Render

1. Fork or clone this repository.
2. Create a new **Web Service** on Render.
3. Connect your GitHub repository.
4. Add the required Environment Variables.
5. Deploy.

---

## Project Structure

```
SpamGuardian/
│
├── index.js
├── package.json
├── services/
│   ├── spamDetector.js
│   └── attachmentDetector.js
└── README.md
```

---

## Future Improvements

- Edit message spam detection
- Smarter attachment fingerprinting
- Per-server configuration
- Slash commands
- Dashboard
- Database support
- Whitelist roles/channels

---

## License

MIT License

---

## Author

Created by **Alcatraz-Hammad**.
