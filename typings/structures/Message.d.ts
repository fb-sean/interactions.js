export = Message;
/**
 * Create a formatted Message Object
 * @return {Message}
 * @example
 * const message = interaction.message; // returns the message object
 * const mentions = interaction.message.mentions; // returns the message mentions
 */
declare class Message {
    constructor(raw: any);
    /**
     * the type of the message
     * @type {number}
     */
    type: number;
    /**
     * if the message is a tts message or not
     * @type {boolean}
     */
    tts: boolean;
    /**
     * the timestamp the message was sent at
     * @type {null}
     */
    timestamp: any;
    /**
     * if the message is pinned or not
     * @type {boolean}
     */
    pinned: boolean;
    /**
     * an array of mentions in the message
     * @type {array}
     */
    mentions: any[];
    /**
     * the role mentions in the message
     * @type {array}
     */
    mentionRoles: any[];
    /**
     * if the message mention everyone or not
     * @type {boolean}
     */
    mentionEveryone: boolean;
    /**
     * the message id
     * @type {number|null}
     */
    id: number | null;
    /**
     * the message flags
     * @type {number}
     */
    flags: number;
    /**
     * an array of embeds in the message
     * @type {array}
     */
    embeds: any[];
    /**
     * a timestamp when the message got edited if the message got edited
     * @type {string|null}
     */
    editTimestamp: string | null;
    /**
     * the message content
     * @type {string|null}
     */
    content: string | null;
    /**
     * an array of components in the message
     * @type {array}
     */
    components: any[];
    /**
     * the channel id the message was sent in
     * @type {number|null}
     */
    channelId: number | null;
    /**
     * a user object of the message author
     * @type {User}
     */
    author: User;
    /**
     * an array of attachments in the message
     * @type {array}
     */
    attachments: any[];
}
import User = require("./User");
//# sourceMappingURL=Message.d.ts.map