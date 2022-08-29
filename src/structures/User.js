'use strict';

/**
 * Create a formatted User Object
 *
 * @example
 * ```js
 * const User = new User(UserData);
 * ```
 */
class User {
    constructor(raw) {
        /**
         * the id of this user
         * @type {number}
         */
        this.id = raw?.id ?? null

        /**
         * the avatar hash of this user
         * @type {string}
         */
        this.avatar = raw?.avatar ?? null

        /**
         * the avatar decoration of this user
         * @type {string}
         */
        this.avatarDecoration = raw?.avatar_decoration ?? null

        /**
         * the discriminator of this user
         * @type {string}
         */
        this.disc = raw?.discriminator ?? null

        /**
         * the tag of this user
         * @type {string}
         */
        this.tag = `${raw?.username}#${raw?.discriminator}`

        /**
         * the public flags of this user
         * @type {number}
         */
        this.publicFlags = raw?.public_flags

        /**
         * the username of this user
         * @type {string}
         */
        this.username = raw?.username
    }

    /**
     * Get the user avatar
     * @type {string}
     * @readonly
     */
    get avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.startsWith("a_") ? "gif" : "png"}` : null;
    }
}

module.exports = User;