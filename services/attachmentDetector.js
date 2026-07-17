const attachmentHistory = new Map();

function getAttachmentKey(attachment) {
    return `${attachment.name}_${attachment.size}`;
}

async function checkAttachments(message) {
    if (!message.attachments.size) return null;

    const now = Date.now();
    const userId = message.author.id;

    if (!attachmentHistory.has(userId)) {
        attachmentHistory.set(userId, []);
    }

    const history = attachmentHistory.get(userId);

    const recent = history.filter(
        a => now - a.timestamp <= Number(process.env.TIME_WINDOW_SECONDS) * 1000
    );

    for (const attachment of message.attachments.values()) {

        const key = getAttachmentKey(attachment);

        recent.push({
            key,
            channelId: message.channel.id,
            timestamp: now,
            type: attachment.contentType || "unknown",
            url: attachment.url
        });

        const matches = recent.filter(a => a.key === key);

        const uniqueChannels = [...new Set(matches.map(a => a.channelId))];

        if (
            uniqueChannels.length >= Number(process.env.CHANNEL_THRESHOLD)
        ) {
            attachmentHistory.set(userId, recent);

            return {
                spam: true,
                type: attachment.contentType || "attachment",
                url: attachment.url
            };
        }
    }

    attachmentHistory.set(userId, recent);

    return null;
}

module.exports = {
    checkAttachments
};