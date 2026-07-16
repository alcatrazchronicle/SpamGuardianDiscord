const activeTimeouts = new Set();
const userMessages = new Map();

const TIME_WINDOW = 30 * 1000; // 30 seconds
const TIMEOUT_DURATION = 6 * 60 * 60 * 1000; // 6 hours
const REQUIRED_CHANNELS = 2;

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
}

async function checkMessage(message) {
    if (!message.inGuild()) return;
    if (message.author.bot) return;

    const userId = message.author.id;
    const content = normalize(message.content);

    if (content.length < 2) return;

    if (!userMessages.has(userId)) {
        userMessages.set(userId, []);
    }

    const history = userMessages.get(userId);
    const now = Date.now();

    // Remove messages older than 30 seconds
    const recent = history.filter(m => now - m.timestamp <= TIME_WINDOW);

    recent.push({
        content,
        channelId: message.channel.id,
        channelName: message.channel.name,
        timestamp: now
    });

    userMessages.set(userId, recent);

    // Find matching messages
    const matches = recent.filter(m => m.content === content);

    // Count unique channels
    const uniqueChannels = [...new Set(matches.map(m => m.channelId))];

    console.clear();
    console.log("====== USER MESSAGE HISTORY ======");
    console.table(recent);

    if (uniqueChannels.length < REQUIRED_CHANNELS) return;

    if (activeTimeouts.has(userId)) return;

    activeTimeouts.add(userId);

    try {
        await message.member.timeout(
            TIMEOUT_DURATION,
            "Cross-channel spam"
        );

        console.log("================================");
        console.log("🚨 SPAM DETECTED");
        console.log("User:", message.author.tag);
        console.log("Message:", content);
        console.log("Channels:", uniqueChannels.length);
        console.log("Action: Timed out for 6 hours");
        console.log("================================");

        await message.channel.send(
            `🚨 ${message.author} has been timed out for **6 hours** for cross-channel spam.`
        );

    } catch (err) {
        console.error("Timeout failed:", err);
    }

    setTimeout(() => {
        activeTimeouts.delete(userId);
    }, 5000);
}

module.exports = {
    checkMessage
};