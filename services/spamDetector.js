const { checkAttachments } = require("./attachmentDetector");

const activeTimeouts = new Set();
const userMessages = new Map();

const MOD_LOG_CHANNEL_ID = process.env.MOD_LOG_CHANNEL_ID;

const TIME_WINDOW =
    Number(process.env.TIME_WINDOW_SECONDS) * 1000;

const TIMEOUT_DURATION =
    Number(process.env.TIMEOUT_HOURS) *
    60 *
    60 *
    1000;

const REQUIRED_CHANNELS =
    Number(process.env.CHANNEL_THRESHOLD);

function normalize(text) {

    return text
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

}

async function logToModChannel(
    message,
    type,
    value,
    reason
) {

    const modLog =
        message.guild.channels.cache.get(
            MOD_LOG_CHANNEL_ID
        );

    if (!modLog) return;

    await modLog.send({

        embeds: [

            {

                color: 0xff0000,

                title:
                    "🚨 Spam Detected",

                fields: [

                    {

                        name: "User",

                        value: `${message.author} (${message.author.tag})
${message.author.id}`

                    },

                    {

                        name: "Reason",

                        value: reason,

                        inline: true

                    },

                    {

                        name: "Type",

                        value: type,

                        inline: true

                    },

                    {

                        name: "Content",

                        value:
String(value).substring(0, 1000)

                    }

                ],

                timestamp:
new Date().toISOString()

            }

        ]

    });

}

async function punish(
    message,
    type,
    value,
    reason,
    matches = []
) {

    const userId =
        message.author.id;

    if (activeTimeouts.has(userId))
        return;

    activeTimeouts.add(userId);

    try {

        for (const spam of matches) {

            try {

                if (
                    spam.message &&
                    spam.message.deletable
                ) {

                    await spam.message.delete();

                }

            } catch {}

        }

        try {
                if (message.deletable) {
                    await message.delete();
                }
            } catch {}
        console.log("process.env.TIMEOUT_HOURS:", process.env.TIMEOUT_HOURS);
console.log("TIMEOUT_DURATION:", TIMEOUT_DURATION);

await message.member.timeout(
    21600000,
    reason
)

        await logToModChannel(
            message,
            type,
            value,
            reason
        );

        console.log(
            `🚨 ${reason}: ${message.author.tag}`
        );

    } catch (err) {

        console.error(err);

    }

    setTimeout(() => {

        activeTimeouts.delete(userId);

    },5000);

}
async function checkMessage(message) {

    if (!message.inGuild()) return;
    if (message.author.bot) return;

    const userId = message.author.id;
    const content = normalize(message.content || "");

    // -----------------------------
    // Attachment Spam
    // -----------------------------

    const attachmentSpam =
        await checkAttachments(message);

    if (attachmentSpam) {

        return punish(
            message,
            attachmentSpam.type || "Attachment",
            attachmentSpam.url || "Attachment",
            "Attachment Spam",
            [ 
              {
                 message
              }
            ]  
        );

    }
    // Ignore empty text
    if (content.length < 2) return;

    if (!userMessages.has(userId)) {

        userMessages.set(userId, []);

    }

    const history =
        userMessages.get(userId);

    const now = Date.now();

    const recent = history.filter(

        m =>
            now - m.timestamp <=
            TIME_WINDOW

    );

    recent.push({

        content,
        channelId: message.channel.id,
        channelName: message.channel.name,
        timestamp: now,
        message

    });

    userMessages.set(
        userId,
        recent
    );

    const matches = recent.filter(

        m => m.content === content

    );

    const uniqueChannels = [

        ...new Set(
            matches.map(
                m => m.channelId
            )
        )

    ];

    console.clear();

    console.log(
        "====== USER MESSAGE HISTORY ======"
    );

    console.table(recent);

    if (
        uniqueChannels.length <
        REQUIRED_CHANNELS
    ) {

        return;

    }

    return punish(

        message,

        "Text Spam",

        content,

        "Cross-Channel Spam",

        matches

    );

}

module.exports = {

    checkMessage

};