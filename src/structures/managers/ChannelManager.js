const Rest = require("../../structures/Rest.js");
const {Routes} = require('discord-api-types/v10');
const {URLSearchParams} = require("url");

/**
 *
 * Channel Manager to work with Channels
 *
 * @param {object} client the Application Client
 * @param {string} id the id of the channel
 *
 * @example
 * // You can use this way
 * const manager = new ChannelManager(<Client>);
 * const channel = await manager.fetch(channelId);
 * console.log(channel);
 *
 * // Or this way
 * const manager = new ChannelManager(<Client>, channelId);
 * const channel = await manager.fetch();
 * console.log(channel);
 *
 *
 */
class ChannelManager {
    constructor(client, id) {
        /**
         * the id of the channel
         * @type {string|null}
         */
        this.id = id ?? null

        /**
         * the Application Client
         * @type {object}
         */
        this.client = client
    }

    /**
     * Get the channel from cache if enabled
     *
     * @param {string} channelId The id of the channel
     * @example
     * const channel = await new ChannelManager(client, "980770618087710754").get();
     */
    get(channelId = this.id) {
        return this?.client?._cache?.channels?.get(this.id) || {};
    }

    /**
     * Fetch a channel from Discord
     *
     * @param {string} channelId The id of the channel
     * @example
     * const channel = await new ChannelManager(client, "980770618087710754").fetch();
     * console.log(channel);
     */
    async fetch(channelId = this.id) {
        if (!this.client) throw new Error("[Interactions.js => <ChannelManager>.fetch] The client is needed for this action!")

        const rest = Rest.getRest();

        const data = await rest.get(
            Routes.channel(channelId),
        );

        if(this?.client?.cacheChannels) this.client._cache.setChannel(channelId, data);

        return data;
    }

    /**
     * Delete a channel from Discord
     *
     * @param {string} channelId The id of the channel
     * @param {?string} reason The reason of the deletion
     * @example
     * const deleteChannel = await new ChannelManager(client, "980770618087710754").delete();
     * console.log(deleteChannel);
     */
    async delete(channelId = this.id, reason = null) {
        if (!this.client) throw new Error("[Interactions.js => <ChannelManager>.delete] The client is needed for this action!");

        const rest = Rest.getRest();

        const data = await rest.delete(
            Routes.channel(channelId),
            {
                reason: reason
            }
        );

        if(this?.client?.cacheChannels) this.client._cache.deleteChannel(channelId, data);

        return data;
    }

    /**
     * Fetch a message from a channel
     * @param channelId
     * @param messageId
     * @return {Promise<object>}
     */
    async fetchMessage(channelId = this.id, messageId) {
        if(typeof messageId !== 'string') throw new Error("[Interactions.js => <ChannelManager>.fetchMessage] The message id is needed for this action!");

        const rest = Rest.getRest();

        return await rest.get(
            Routes.channelMessage(channelId, messageId),
        );
    }

    /**
     * send a message to a channel
     * @param {string | null} channelId
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    async createMessage(channelId = this.id, data) {
        if(typeof data !== 'object') throw new Error("[Interactions.js => <ChannelManager>.createMessage] a message payload is needed for this action!");

        const rest = Rest.getRest();

        return await rest.post(
            Routes.channelMessages(channelId),
            data
        );
    }

    /**
     * crosspost a message to a channel
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @return {Promise<object>}
     */
    async crosspostMessage(channelId = this.id, messageId) {
        if(typeof messageId !== 'string') throw new Error("[Interactions.js => <ChannelManager>.crosspostMessage] The message id is needed for this action!");

        const rest = Rest.getRest();

        return await rest.post(
            Routes.channelMessageCrosspost(channelId, messageId),
        );
    }

    /**
     * edit a message
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    async editMessage(channelId = this.id, messageId, data) {
        if(typeof messageId !== 'string') throw new Error("[Interactions.js => <ChannelManager>.editMessage] The message id is needed for this action!");
        if(typeof data !== 'object') throw new Error("[Interactions.js => <ChannelManager>.editMessage] a message payload is needed for this action!");

        const rest = Rest.getRest();

        return await rest.patch(
            Routes.channelMessage(channelId, messageId),
            data
        );
    }

    /**
     * delete a message
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @return {Promise<object>}
     */
    async deleteMessage(channelId = this.id, messageId) {
        if(typeof messageId !== 'string') throw new Error("[Interactions.js => <ChannelManager>.deleteMessage] The message id is needed for this action!");

        const rest = Rest.getRest();

        return await rest.delete(
            Routes.channelMessage(channelId, messageId),
        );
    }

    /**
     * Fetch all reactions from a message
     * @param {string | null} channelId
     * @param {string | null} messageId
     * @param {string | null} after
     * @param {number | null} limit
     * @return {Promise<object>}
     */
    async fetchReactions(channelId = this.id, messageId, after, limit) {
        if(typeof messageId !== 'string') throw new Error("[Interactions.js => <ChannelManager>.fetchReactions] The message id is needed for this action!");

        const rest = Rest.getRest();

        const query = new URLSearchParams();
        if (after) query.append('after', after);
        if (limit) query.append('limit', String(limit));

        return await rest.get(
            Routes.channelMessageAllReactions(channelId, messageId),
            {
                query: query
            }
        );
    }

    /**
     * create a reaction to a message
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @param {string} emoji the emoji to react with
     * @return {Promise<object>}
     */
    async createReaction(channelId = this.id, messageId, emoji) {
        if(typeof messageId !== 'string') throw new Error("[Interactions.js => <ChannelManager>.createReaction] The message id is needed for this action!");

        const rest = Rest.getRest();

        return await rest.put(
            Routes.channelMessageReaction(channelId, messageId, emoji),
        );
    }

}

module.exports = ChannelManager;
