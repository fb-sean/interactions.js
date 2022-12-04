'use strict';

const User = require("./User.js")

/**
 * Create a formatted Member Object
 *
 * @example
 * ```js
 * const Member = new Member(MemberData);
 * ```
 */
class Member {
    constructor(raw) {
        /**
         * the id of this member
         * @type {number}
         */
        this.id = raw?.user?.id ?? null

        /**
         * the avatar hash of this member
         * @type {string}
         */
        this.avatar = raw?.avatar ?? raw?.user?.avatar ?? null

        /**
         * when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
         * @type {number}
         */
        this.communicationDisabledUntil = raw?.communication_disabled_until ?? null

        /**
         * whether the user is deafened in voice channels
         * @type {boolean}
         */
        this.deaf = raw?.deaf ?? false

        /**
         * 	the flags on a user's account
         * @type {number}
         */
        this.flags = raw?.flags ?? null

        /**
         * whether the user has not yet passed the guild's Membership Screening requirements
         * @type {boolean}
         */
        this.isPending = raw?.is_pending ?? false

        /**
         * 	when the user joined the guild
         * @type {number}
         */
        this.joinedAt = raw?.joined_at ?? null

        /**
         * whether the user is muted in voice channels
         * @type {boolean}
         */
        this.muted = raw?.mute ?? false

        /**
         * this user's guild nickname
         * @type {string}
         */
        this.nickname = raw?.nick ?? null

        /**
         * whether the user has not yet passed the guild's Membership Screening requirements
         * @type {string}
         */
        this.pending = raw?.pending ?? false

        /**
         * total permissions of the member in the channel, including overwrites, returned when in the interaction object
         * @type {object}
         */
        this.permissions = raw?.permissions ?? null

        /**
         * when the user started boosting the guild
         * @type {number}
         */
        this.premiumSince = raw?.premium_since ?? null

        /**
         * array of role object ids
         * @type {array}
         */
        this.roles = raw?.roles ?? null

        /**
         * the avatar url of the member
         * @type {?string}
         */
        this.avatarURL = this?.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith("a_") ? "gif" : "png"}` : null

        /**
         * The date of the member's creation
         * @type {Date}
         */
        this.joinedAtDate = new Date(raw?.joined_at)
    }
}

module.exports = Member;