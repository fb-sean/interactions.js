export = ChannelManager;
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
 * const channel = await manager.fetchChannel(ChannelId);
 * console.log(channel);
 *
 * // Or this way
 * const manager = new ChannelManager(<Client>, ChannelId);
 * const channel = await manager.fetchChannel();
 * console.log(channel);
 *
 *
 */
declare class ChannelManager {
    constructor(client: any, id: any);
    /**
     * the id of the channel
     * @type {string|null}
     */
    id: string | null;
    /**
     * the Application Client
     * @type {object}
     */
    client: object;
    /**
     * Get the channel from cache if enabled
     *
     * @param {string} channelID The id of the channel
     * @example
     * const channel = await new ChannelManager(client, "980770618087710754").getChannel();
     */
    getChannel(channelID?: string): Channel;
    /**
     * Fetch a channel from Discord
     *
     * @param {string} channelID The id of the channel
     * @example
     * const channel = await new ChannelManager(client, "980770618087710754").fetchChannel();
     * console.log(channel);
     */
    fetchChannel(channelID?: string): Promise<Channel>;
    /**
     * Delete a channel from Discord
     *
     * @param {string} channelID The id of the channel
     * @param {?string} reason The reason of the deletion
     * @example
     * const deleteChannel = await new ChannelManager(client, "980770618087710754").deleteChannel();
     * console.log(deleteChannel);
     */
    deleteChannel(channelID?: string, reason?: string | null): Promise<Channel>;
}
import Channel = require("../structures/Channel.js");
//# sourceMappingURL=ChannelManager.d.ts.map