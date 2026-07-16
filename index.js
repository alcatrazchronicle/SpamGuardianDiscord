require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const { checkMessage } = require("./services/spamDetector");

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
        await checkMessage(message);
    } catch (err) {
        console.error("Message handler error:", err);
    }
});

client.on("error", console.error);

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.TOKEN);