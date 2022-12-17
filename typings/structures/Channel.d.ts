export = Channel;
/**
 *
 * Create a formatted Channel Object
 * @example
 * const channel = interaction.channel; // returns the channel object
 * const channelId = interaction.channel.id; // returns the channel id
 */
declare class Channel {
    constructor(options?: {});
    /**
     * the id of this channel
     * @type {number}
     */
    id: number;
    /**
     * the type of channel
     * @type {string}
     */
    type: string;
    /**
     * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
     * @type {number}
     */
    guildId: number;
    /**
     * sorting position of the channel
     * @type {number}
     */
    position: number;
    /**
     * explicit permission overwrites for members and roles
     * @type {array}
     */
    permissionOverwrites: any[];
    /**
     * the name of the channel (1-100 characters)
     * @type {string}
     */
    name: string;
    /**
     * the channel topic (0-1024 characters)
     * @type {string}
     */
    topic: string;
    /**
     * whether the channel is nsfw
     * @type {boolean}
     */
    nsfw: boolean;
    /**
     * the id of the last message sent in this channel (or thread for GUILD_FORUM channels) (may not point to an existing or valid message or thread)
     * @type {number}
     */
    lastMessageId: number;
    /**
     * the bitrate (in bits) of the voice channel
     * @type {number}
     */
    bitrate: number;
    /**
     * the user limit of the voice channel
     * @type {number}
     */
    userLimit: number;
    /**
     * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
     * @type {number}
     */
    ratelimitPerUser: number;
    /**
     * the recipients of the DM
     * @type {array}
     */
    recipients: any[];
    /**
     * icon hash of the group DM
     * @type {string}
     */
    icon: string;
    /**
     * id of the creator of the group DM or thread
     * @type {number}
     */
    ownerId: number;
    /**
     * The application id of the group DM creator if it is bot-created
     * @type {number}
     */
    applicationId: number;
    /**
     * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
     * @type {number}
     */
    parentId: number;
    /**
     * when the last pinned message was pinned.
     * @type {number}
     */
    lastPinTimestamp: number;
    /**
     * voice region id for the voice channel, automatic when set to null
     * @type {string}
     */
    RTCRegion: string;
    /**
     * the camera video quality mode of the voice channel, 1 when not present
     * @type {number}
     */
    videoQualityMode: number;
    /**
     * number of messages (not including the initial message or deleted messages) in a thread (if the thread was created before July 1, 2022, it stops counting at 50)
     * @type {number}
     */
    messageCount: number;
    /**
     * an approximate count of users in a thread, stops counting at 50
     * @type {number}
     */
    memberCount: number;
    /**
     * thread-specific fields not needed by other channels
     * @type {object}
     */
    threadMetaData: object;
    /**
     * thread member object for the current user, if they have joined the thread, only included on certain API endpoints
     * @type {object}
     */
    member: object;
    /**
     * default duration that the clients (not the API) will use for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
     * @type {number}
     */
    defaultAutoArchiveDuration: number;
    /**
     * computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
     * @type {string}
     */
    permissions: string;
    /**
     * 	channel flags combined as a bitfield
     * @type {number}
     */
    flags: number;
    /**
     * number of messages ever sent in a thread, it's similar to message_count on message creation, but will not decrement the number when a message is deleted
     * @type {number}
     */
    totalMessageSent: number;
}
//# sourceMappingURL=Channel.d.ts.map