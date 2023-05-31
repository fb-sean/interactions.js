'use strict';

/**
 * Create a formatted User Object
 * @return {User}
 * @example
 * const user = interaction.user; // returns the user object
 * const username = interaction.user.username; // returns the username
 */
class User {
    constructor(data) {
        /**
         * the id of this user
         * @type {string}
         */
        this.id = data?.id ?? null;

        /**
         * the avatar hash of this user
         * @type {string}
         */
        this.avatar = data?.avatar ?? null;

        /**
         * the avatar decoration of this user
         * @type {string}
         */
        this.avatarDecoration = data?.avatar_decoration ?? null;

        /**
         * the discriminator of this user
         * @type {string}
         */
        this.disc = data?.discriminator ?? null;

        /**
         * the tag of this user
         * @type {string}
         */
        this.tag = `${data?.username}#${data?.discriminator}`;

        /**
         * the public flags of this user
         * @type {number}
         */
        this.publicFlags = data?.public_flags;

        /**
         * the username of this user
         * @type {string}
         */
        this.username = data?.username;

        /**
         * the avatar url of the user
         * @type {?string}
         */
        this.avatarURL = this?.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.avatar.startsWith("a_") ? "gif" : "png"}` : null;
    }
}

module.exports = User;
