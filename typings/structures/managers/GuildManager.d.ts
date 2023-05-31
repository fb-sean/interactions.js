export = GuildManager;
/**
 * Guild Manager to work with Guilds
 *
 * @param {object} client the Application Client
 * @param {string} id the id of the guild
 *
 * @return {GuildManager}
 * @example
 * // You can use this way
 * const manager = new GuildManager(<Client>);
 * const guild = await manager.fetch(guildId);
 * console.log(guild);
 *
 * // Or this way
 * const manager = new GuildManager(<Client>, guildId);
 * const guild = await manager.fetch();
 * console.log(guild);
 *
 */
declare class GuildManager {
    constructor(client: any, id: any);
    /**
     * the id of the user
     * @type {string|null}
     */
    id: string | null;
    /**
     * Fetch a guild
     * @param {string | null} guildId the guild id
     * @param {boolean} with_counts whether to include approximate member and presence counts
     * @return {Promise<object>}
     */
    fetch(guildId?: string | null, with_counts?: boolean): Promise<object>;
    fetchPreview(guildId?: string): Promise<unknown>;
    /**
     * Fetch a guild's channels
     * @param {string | null} guildId the guild id
     * @return {Promise<object>}
     */
    fetchChannels(guildId?: string | null): Promise<object>;
    /**
     * Fetch a guild's members
     * @param {string | null} guildId the guild id
     * @return {Promise<object>}
     */
    fetchThreads(guildId?: string | null): Promise<object>;
    /**
     * Fetch a guild's member
     * @param {string | null} guildId the guild id
     * @param {string} userId the user id
     * @return {Promise<object>}
     */
    fetchGuildMember(guildId: string | null, userId: string): Promise<object>;
    /**
     * Search a guild's members
     * @param {string | null} guildId the guild id
     * @param {string} searchQuery the search query
     * @param {number | 1} limit the max number of members to return (1-1000)
     * @return {Promise<object>}
     */
    searchGuildMembers(guildId: string | null, searchQuery: string, limit?: number | 1): Promise<object>;
    /**
     * Add a role to a guild member
     * @param {string | null} guildId the guild id
     * @param {string} userId the user id
     * @param {string} roleId the role id
     * @return {Promise<object>}
     */
    addGuildMemberRole(guildId: string | null, userId: string, roleId: string): Promise<object>;
    /**
     * Remove a role from a guild member
     * @param {string | null} guildId the guild id
     * @param {string} userId the user id
     * @param {string} roleId the role id
     * @return {Promise<object>}
     */
    removeGuildMemberRole(guildId: string | null, userId: string, roleId: string): Promise<object>;
    /**
     * Fetch a guild's roles
     * @param {string | null} guildId the guild id
     * @return {Promise<object>}
     */
    fetchGuildRoles(guildId?: string | null): Promise<object>;
}
//# sourceMappingURL=GuildManager.d.ts.map