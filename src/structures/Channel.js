const Utils = require("../utils/Utils.js");
const Util = new Utils();

const Member = require("../structures/Member.js");

const ChannelTypes = {
    0: "GUILD_TEXT",
    1: "DM",
    2: "GUILD_VOICE",
    3: "GROUP_DM",
    4: "GUILD_CATEGORY",
    5: "GUILD_ANNOUNCEMENT",
    10: "ANNOUNCEMENT_THREAD",
    11: "PUBLIC_THREAD",
    12: "PRIVATE_THREAD",
    13: "GUILD_STAGE_VOICE",
    14: "GUILD_DIRECTORY",
    15: "GUILD_FORUM",
};

/**
 *
 * Create a formatted Channel Object
 *
 * @example
 * const channel = new Channel(ResolvedChannel);
 *
 * @private
 */
class Channel {
    constructor(options = {}) {

        /**
         * the id of this channel
         * @type {number}
         */
        this.id = options?.id ?? null

        /**
         * the type of channel
         * @type {string}
         */
        this.type = ChannelTypes[options?.type] ?? null

        /**
         * the id of the guild (may be missing for some channel objects received over gateway guild dispatches)
         * @type {number}
         */
        this.guildId = options?.guild_id ?? null

        /**
         * sorting position of the channel
         * @type {number}
         */
        this.position = options?.position ?? null

        /**
         * explicit permission overwrites for members and roles
         * @type {array}
         */
        this.permissionOverwrites = options?.permission_overwrites ?? []

        /**
         * the name of the channel (1-100 characters)
         * @type {string}
         */
        this.name = options?.name ?? null

        /**
         * the channel topic (0-1024 characters)
         * @type {string}
         */
        this.topic = options?.topic ?? null

        /**
         * whether the channel is nsfw
         * @type {boolean}
         */
        this.nsfw = options?.nsfw ?? false

        /**
         * the id of the last message sent in this channel (or thread for GUILD_FORUM channels) (may not point to an existing or valid message or thread)
         * @type {number}
         */
        this.lastMessageId = options?.last_message_id ?? null

        /**
         * the bitrate (in bits) of the voice channel
         * @type {number}
         */
        this.bitrate = options?.bitrate ?? null

        /**
         * the user limit of the voice channel
         * @type {number}
         */
        this.userLimit = options?.user_limit ?? null

        /**
         * amount of seconds a user has to wait before sending another message (0-21600); bots, as well as users with the permission manage_messages or manage_channel, are unaffected
         * @type {number}
         */
        this.ratelimitPerUser = options?.rate_limit_per_user ?? null

        /**
         * the recipients of the DM
         * @type {array}
         */
        this.recipients = options?.recipients ?? null

        /**
         * icon hash of the group DM
         * @type {string}
         */
        this.icon = options?.icon ?? null

        /**
         * id of the creator of the group DM or thread
         * @type {number}
         */
        this.ownerId = options?.owner_id ?? null

        /**
         * The application id of the group DM creator if it is bot-created
         * @type {number}
         */
        this.applicationId = options?.application_id ?? null

        /**
         * for guild channels: id of the parent category for a channel (each parent category can contain up to 50 channels), for threads: id of the text channel this thread was created
         * @type {number}
         */
        this.parentId = options?.parent_id ?? null

        /**
         * when the last pinned message was pinned.
         * @type {number}
         */
        this.lastPinTimestamp = options?.last_pin_timestamp ?? null

        /**
         * voice region id for the voice channel, automatic when set to null
         * @type {string}
         */
        this.RTCRegion = options?.rtc_region ?? null

        /**
         * the camera video quality mode of the voice channel, 1 when not present
         * @type {number}
         */
        this.videoQualityMode = options?.video_quality_mode ?? null

        /**
         * number of messages (not including the initial message or deleted messages) in a thread (if the thread was created before July 1, 2022, it stops counting at 50)
         * @type {number}
         */
        this.messageCount = options?.message_count ?? null

        /**
         * an approximate count of users in a thread, stops counting at 50
         * @type {number}
         */
        this.memberCount = options?.member_count ?? null

        /**
         * thread-specific fields not needed by other channels
         * @type {object}
         */
        this.threadMetaData = options?.thread_metadata ?? null


        /**
         * thread member object for the current user, if they have joined the thread, only included on certain API endpoints
         * @type {object}
         */
        this.member = options?.member ? new Member(options?.member) : null

        /**
         * default duration that the clients (not the API) will use for newly created threads, in minutes, to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080
         * @type {number}
         */
        this.defaultAutoArchiveDuration = options?.default_auto_archive_duration ?? null

        /**
         * computed permissions for the invoking user in the channel, including overwrites, only included when part of the resolved data received on a slash command interaction
         * @type {string}
         */
        this.permissions = options?.permissions ?? null

        /**
         * 	channel flags combined as a bitfield
         * @type {number}
         */
        this.flags = options?.flags ?? null

        /**
         * number of messages ever sent in a thread, it's similar to message_count on message creation, but will not decrement the number when a message is deleted
         * @type {number}
         */
        this.totalMessageSent = options?.total_message_sent ?? null
    }
}

module.exports = Channel;
