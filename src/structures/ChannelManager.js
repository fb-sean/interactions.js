const Utils = require("../utils/Utils.js");
const Util = new Utils();

const Channel = require("../structures/Channel.js");

/**
 *
 * Channel Manager to work with Channels
 *
 * @param {object} client the Application Client
 * @param {string} id the id of the channel
 *
 * @example
 * ```js
 * // You can use this way
 * const channel = new ChannelManager(<Client>);
 * await channel.fetchChannel(ChannelId);
 *
 * // Or this way
 * const channel = new ChannelManager(<Client>, ChannelId);
 * await channel.fetchChannel();
 * ```
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
     * @param {string} channelID The id of the channel
     */
    getChannel(channelID = this.id) {
        return new Channel(this?.client?._cache?.channels?.get(this.id) || {});
    }

    /**
     * Fetch a channel from Discord
     *
     * @param {string} channelID The id of the channel
     */
    async fetchChannel(channelID = this.id) {
        if (!this.client) throw new Error("[Interactions.js => <ChannelManager>.fetchChannel] The client is needed for this action!")

        this.client.emit('debug', "[DEBUG] Fetching Channel with ID " + channelID);

        const Request = await Util.DiscordRequest(this.client, `channels/${channelID}`, {method: 'GET'})

        if(!Request || Request?.error) throw new Error("[Interactions.js => <ChannelManager>.fetchChannel] Got an Error from Discord: " + Request.errorData)

        if(this?.client?.cacheChannels) this.client._cache.setChannel(channelID, Request);

        return new Channel(Request);
    }

    /**
     * Delete a channel from Discord
     *
     * @param {string} channelID The id of the channel
     * @param {?string} reason The reason of the deletion
     */
    async deleteChannel(channelID = this.id, reason = null) {
        if (!this.client) throw new Error("[Interactions.js => <ChannelManager>.deleteChannel] The client is needed for this action!")

        this.client.emit('debug', "[DEBUG] Deleting Channel with ID " + channelID);

        const Request = await Util.DiscordRequest(this.client, `channels/${channelID}`, {method: 'DELETE'}, reason ? { 'X-Audit-Log-Reason': reason } : {})

        if(!Request || Request?.error) throw new Error("[Interactions.js => <ChannelManager>.fetchChannel] Got an Error from Discord: " + Request.errorData)

        if(this?.client?.cacheChannels) this.client._cache.deleteChannel(channelID, Request);

        return new Channel(Request);
    }
}

module.exports = ChannelManager;