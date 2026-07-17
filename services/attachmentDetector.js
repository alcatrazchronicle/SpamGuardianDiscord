const attachmentHistory = new Map();

const TIME_WINDOW = (parseInt(process.env.TIME_WINDOW_SECONDS, 10) || 5) * 1000;

const REQUIRED_MATCHES = parseInt(process.env.CHANNEL_THRESHOLD, 10) || 2;

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

  const recent = history.filter((a) => now - a.timestamp <= TIME_WINDOW);

  for (const attachment of message.attachments.values()) {
    const key = getAttachmentKey(attachment);

    recent.push({
      key,
      channelId: message.channel.id,
      timestamp: now,
      type: attachment.contentType || "Attachment",
      url: attachment.url,
      message,
    });

    const matches = recent.filter((a) => a.key === key);

    if (matches.length >= REQUIRED_MATCHES) {
      attachmentHistory.set(userId, recent);

      return {
        spam: true,
        type: attachment.contentType || "Attachment",
        url: attachment.url,
        matches,
      };
    }
  }

  attachmentHistory.set(userId, recent);

  return null;
}

module.exports = {
  checkAttachments,
};
