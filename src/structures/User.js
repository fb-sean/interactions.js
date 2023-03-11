'use strict';

const Rest = require("../structures/Rest.js");
const {Routes} = require('discord-api-types/v10');

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

        // When fetchUser is true we fetch the user this is good when wanting to get a user outside an interaction
        if(data?.fetchUser === true && typeof data?.id === 'string') {
            const rest = Rest.getRest();
            rest.get(Routes.user(data.id)).then(res => {
                this.id = res?.id ?? null;
                this.avatar = res?.avatar ?? null;
                this.avatarDecoration = res?.avatar_decoration ?? null;
                this.disc = res?.discriminator ?? null;
                this.tag = `${res?.username}#${res?.discriminator}`;
                this.publicFlags = res?.public_flags;
                this.username = res?.username;
                this.avatarUrl = res?.avatar ? `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}${res.avatar_decoration ? `.${res.avatar_decoration}` : ''}` : null;
            });
        }
    }

    /**
     * Send a message to the user
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    async send(data) {
        const rest = Rest.getRest();

        const channel = await rest.post(
            Routes.userChannels(),
            {
                body: JSON.stringify({
                    recipient_id: this.id
                }),
            }
        );

        if (!channel.id) {
            throw new Error("[Interactions.js => <User>.send] Wasn't able to create a DM channel with the user");
        }

        return rest.post(
            Routes.channelMessages(channel.id),
            data
        );
    }
}

module.exports = User;
