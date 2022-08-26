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
     * Fetch a channel from Discord
     *
     * @param {string} channelID The id of the channel
     */
    async fetchChannel(channelID = this.id) {
        if (!this.client) throw new Error("[Interactions.js => <ChannelManager>.fetchChannel] The client is needed for this action!")

        this.client.emit('debug', "[DEBUG] Fetching Channel with ID " + channelID);

        const Request = await Util.DiscordRequest(this.client, `channels/${channelID}`, {method: 'GET'})

        return new Channel(Request);
    }
}

module.exports = ChannelManager;