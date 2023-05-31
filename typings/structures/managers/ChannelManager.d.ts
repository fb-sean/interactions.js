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
     * @param {string} channelId The id of the channel
     * @example
     * const channel = await new ChannelManager(client, "980770618087710754").get();
     */
    get(channelId?: string): any;
    /**
     * Fetch a channel from Discord
     *
     * @param {string} channelId The id of the channel
     * @example
     * const channel = await new ChannelManager(client, "980770618087710754").fetch();
     * console.log(channel);
     */
    fetch(channelId?: string): Promise<unknown>;
    /**
     * Delete a channel from Discord
     *
     * @param {string} channelId The id of the channel
     * @param {?string} reason The reason of the deletion
     * @example
     * const deleteChannel = await new ChannelManager(client, "980770618087710754").delete();
     * console.log(deleteChannel);
     */
    delete(channelId?: string, reason?: string | null): Promise<unknown>;
    /**
     * Fetch a message from a channel
     * @param channelId
     * @param messageId
     * @return {Promise<object>}
     */
    fetchMessage(channelId: string, messageId: any): Promise<object>;
    /**
     * send a message to a channel
     * @param {string | null} channelId
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    createMessage(channelId: string | null, data: object): Promise<object>;
    /**
     * crosspost a message to a channel
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @return {Promise<object>}
     */
    crosspostMessage(channelId: string | null, messageId: string): Promise<object>;
    /**
     * edit a message
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    editMessage(channelId: string | null, messageId: string, data: object): Promise<object>;
    /**
     * delete a message
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @return {Promise<object>}
     */
    deleteMessage(channelId: string | null, messageId: string): Promise<object>;
    /**
     * Fetch all reactions from a message
     * @param {string | null} channelId
     * @param {string | null} messageId
     * @param {string | null} after
     * @param {number | null} limit
     * @return {Promise<object>}
     */
    fetchReactions(channelId: string | null, messageId: string | null, after: string | null, limit: number | null): Promise<object>;
    /**
     * create a reaction to a message
     * @param {string | null} channelId the id of the channel
     * @param {string} messageId the id of the message
     * @param {string} emoji the emoji to react with
     * @return {Promise<object>}
     */
    createReaction(channelId: string | null, messageId: string, emoji: string): Promise<object>;
}
//# sourceMappingURL=ChannelManager.d.ts.map