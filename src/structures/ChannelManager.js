const Utils = require("../utils/Utils.js");
const Util = new Utils();

const Channel = require("../structures/Channel.js");

/**
 *
 * Channel Manager to work with Channels
 *
 * @example
 * ```js
 * const channel = new ChannelManager();
 * await channel.fetchChannel(ChannelId);
 * ```
 *
 */
class ChannelManager {
    constructor(client, id) {

        this.id = id ?? null
        this.client = client ?? null
    }

    /**
     * Fetch a channel from Discord
     *
     * @param {string} channelID The id of the channel
     */
    async fetchChannel(channelID = this.id) {
        this.client.emit('debug', "[DEBUG] Fetching Channel with ID " + channelID);
        const Request = await Util.DiscordRequest(this.client, `/channels/${channelID}`, {method: 'GET'})
        return new Channel(Request.body);
    }
}

module.exports = ChannelManager;