'use strict';

const Rest = require("../../structures/Rest.js");
const {Routes} = require('discord-api-types/v10');

/**
 * User Manager to work with Users
 *
 * @param {object} client the Application Client
 * @param {string} id the id of the user
 *
 * @return {UserManager}
 * @example
 * // You can use this way
 * const manager = new UserManager(<Client>);
 * const user = await manager.fetch(userid);
 * console.log(user);
 *
 * // Or this way
 * const manager = new UserManager(<Client>, userid);
 * const user = await manager.fetch();
 * console.log(user);
 *
 */
class UserManager {
    constructor(client, id) {
        /**
         * the id of the user
         * @type {string|null}
         */
        this.id = id ?? null
    }

    /**
     * Send a message to the user
     * @param {string | null} userId the user id
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    async sendDM(userId = this.id, data) {
        const rest = Rest.getRest();

        const channel = await rest.post(
            Routes.userChannels(),
            {
                body: {
                    recipient_id: userId ?? this.id
                },
            }
        );

        if (!channel.id) {
            throw new Error("[Interactions.js => <User>.send] Wasn't able to create a DM channel with the user");
        }

        return rest.post(
            Routes.channelMessages(channel.id),
            {
                body: data,
                files: data?.files ?? undefined,
            }
        );
    }

    /**
     * Fetch the user from Discord
     * @param {string | null} userId
     * @return {Promise<object>}
     */
    async fetch(userId = this.id) {
        const rest = Rest.getRest();

        return rest.get(
            Routes.user(userId ?? this.id)
        );
    }

    /**
     * Fetch the current bot from Discord
     * @return {Promise<object>}
     */
    async fetchMyself() {
        const rest = Rest.getRest();

        return rest.get(
            Routes.user(process.env.APPLICATION_ID)
        );
    }

    /**
     * Fetch the current bot's application (Pretty useful for guild count!)
     * @return {Promise<object>}
     */
    async fetchMyApplication() {
        const rest = Rest.getRest();

        return rest.get(
            '/applications/@me',
            {
                headers: {
                    Authorization: 'Bot ' + process.env.DISCORD_TOKEN,
                }
            }
        );
    }
}

module.exports = UserManager;
