require("dotenv").config();

const http = require("http");
const { Client, GatewayIntentBits } = require("discord.js");
const { checkMessage } = require("./services/spamDetector");

// Required for Render
const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("SpamGuardian is running!");
}).listen(PORT, () => {
    console.log(`🌐 HTTP server listening on port ${PORT}`);
});

// Discord Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.once("clientReady", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    try {
        if (message.author.bot) return;
        await checkMessage(message);
    } catch (err) {
        console.error("Message handler error:", err);
    }
});

client.on("error", console.error);

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.TOKEN);