const User = require("./User");

/**
 * Create a formatted Message Object
 * @return {Message}
 * @example
 * const message = interaction.message; // returns the message object
 * const mentions = interaction.message.mentions; // returns the message mentions
 */
class Message {
    constructor(raw) {
        /**
         * the type of the message
         * @type {number}
         */
        this.type = raw.type ?? 0;

        /**
         * if the message is a tts message or not
         * @type {boolean}
         */
        this.tts = raw.tts ?? false;

        /**
         * the timestamp the message was sent at
         * @type {null}
         */
        this.timestamp = raw.timestamp ?? null;

        /**
         * if the message is pinned or not
         * @type {boolean}
         */
        this.pinned = raw.pinned ?? false;

        /**
         * an array of mentions in the message
         * @type {array}
         */
        this.mentions = raw.mentions ?? [];

        /**
         * the role mentions in the message
         * @type {array}
         */
        this.mentionRoles = raw.mention_roles ?? [];

        /**
         * if the message mention everyone or not
         * @type {boolean}
         */
        this.mentionEveryone = raw.mention_everyone ?? false;

        /**
         * the message id
         * @type {number|null}
         */
        this.id = raw.id ?? null;

        /**
         * the message flags
         * @type {number}
         */
        this.flags = raw.flags ?? 0;

        /**
         * an array of embeds in the message
         * @type {array}
         */
        this.embeds = raw.embeds ?? [];

        /**
         * a timestamp when the message got edited if the message got edited
         * @type {string|null}
         */
        this.editTimestamp = raw.edited_timestamp ?? null;

        /**
         * the message content
         * @type {string|null}
         */
        this.content = raw.content ?? null;

        /**
         * an array of components in the message
         * @type {array}
         */
        this.components = raw.components ?? [];

        /**
         * the channel id the message was sent in
         * @type {number|null}
         */
        this.channelId = raw.channel_id ?? null;

        /**
         * a user object of the message author
         * @type {User}
         */
        this.author = new User(raw.author);

        /**
         * an array of attachments in the message
         * @type {array}
         */
        this.attachments = raw.attachments ?? [];
    }
}

module.exports = Message;
