const Utils = require("../utils/Utils.js");
const Util = new Utils();


/**
 * 
 * Channel Manager to work with Channels
 * 
 * @example
 * ```js
 * const channel = new ChannelManager();
 * client.on("debug", debug => {
 *    console.log(debug);
 * })
 * ```
 * 
 */
class ChannelManager {
    constructor(client, id = null) {
        this.id = id,
        this.client = client
    }

    /**
     * Fetch a channel from Discord
     *
     * @param {string} channelID The id of the channel
     */
    async fetchChannel(channelID = this.id) {
        this.client.emit('debug', "[DEBUG] Loading App");
        const Channel = await Util.DiscordRequest(this.client, `/channels/${channelID}`, { method: 'GET' })
        return Channel;
    }
}

module.exports = ChannelManager;