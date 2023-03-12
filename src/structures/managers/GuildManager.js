'use strict';

const Rest = require("../../structures/Rest.js");
const {Routes} = require('discord-api-types/v10');
const {URLSearchParams} = require("url");

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
class GuildManager {
    constructor(client, id) {
        /**
         * the id of the user
         * @type {string|null}
         */
        this.id = id ?? null
    }

    /**
     * Fetch a guild
     * @param {string | null} guildId the guild id
     * @param {boolean} with_counts whether to include approximate member and presence counts
     * @return {Promise<object>}
     */
    async fetch(guildId = this.id, with_counts = false) {
        const rest = Rest.getRest();

        const query = new URLSearchParams();
        query.append("with_counts", with_counts ? "true" : "false");

        return rest.get(
            Routes.guild(guildId),
            {
                query: query
            }
        );
    }

    async fetchPreview(guildId = this.id) {
        const rest = Rest.getRest();

        return rest.get(
            Routes.guildPreview(guildId)
        );
    }

    /**
     * Fetch a guild's channels
     * @param {string | null} guildId the guild id
     * @return {Promise<object>}
     */
    async fetchChannels(guildId = this.id) {
        const rest = Rest.getRest();

        return rest.get(
            Routes.guildChannels(guildId)
        );
    }

    /**
     * Fetch a guild's members
     * @param {string | null} guildId the guild id
     * @return {Promise<object>}
     */
    async fetchThreads(guildId = this.id) {
        const rest = Rest.getRest();

        return rest.get(
            Routes.guildActiveThreads(guildId)
        );
    }

    /**
     * Fetch a guild's member
     * @param {string | null} guildId the guild id
     * @param {string} userId the user id
     * @return {Promise<object>}
     */
    async fetchGuildMember(guildId = this.id, userId) {
        if(typeof userId !== 'string') throw new Error("[Interactions.js => <Guild>.fetchGuildMember] userId must be a string");

        const rest = Rest.getRest();

        return rest.get(
            Routes.guildMember(guildId, userId)
        );
    }

    /**
     * Search a guild's members
     * @param {string | null} guildId the guild id
     * @param {string} searchQuery the search query
     * @param {number | 1} limit the max number of members to return (1-1000)
     * @return {Promise<object>}
     */
    async searchGuildMembers(guildId = this.id, searchQuery, limit = 1) {
        if(typeof query !== 'string') throw new Error("[Interactions.js => <Guild>.searchGuildMembers] query must be a string");
        if(typeof limit !== 'number') throw new Error("[Interactions.js => <Guild>.searchGuildMembers] limit must be a number");

        const rest = Rest.getRest();

        const query = new URLSearchParams();
        query.append("query", searchQuery);
        query.append("limit", String(limit));

        return rest.get(
            Routes.guildMembersSearch(guildId),
            {
                query: query
            }
        );
    }

    /**
     * Add a role to a guild member
     * @param {string | null} guildId the guild id
     * @param {string} userId the user id
     * @param {string} roleId the role id
     * @return {Promise<object>}
     */
    async addGuildMemberRole(guildId = this.id, userId, roleId) {
        if(typeof userId !== 'string') throw new Error("[Interactions.js => <Guild>.addGuildMemberRole] userId must be a string");
        if(typeof roleId !== 'string') throw new Error("[Interactions.js => <Guild>.addGuildMemberRole] roleId must be a string");

        const rest = Rest.getRest();

        return rest.put(
            Routes.guildMemberRole(guildId, userId, roleId)
        );
    }

    /**
     * Remove a role from a guild member
     * @param {string | null} guildId the guild id
     * @param {string} userId the user id
     * @param {string} roleId the role id
     * @return {Promise<object>}
     */
    async removeGuildMemberRole(guildId = this.id, userId, roleId) {
        if(typeof userId !== 'string') throw new Error("[Interactions.js => <Guild>.removeGuildMemberRole] userId must be a string");
        if(typeof roleId !== 'string') throw new Error("[Interactions.js => <Guild>.removeGuildMemberRole] roleId must be a string");

        const rest = Rest.getRest();

        return rest.delete(
            Routes.guildMemberRole(guildId, userId, roleId)
        );
    }

    /**
     * Fetch a guild's roles
     * @param {string | null} guildId the guild id
     * @return {Promise<object>}
     */
    async fetchGuildRoles(guildId = this.id) {
        const rest = Rest.getRest();

        return rest.get(
            Routes.guildRoles(guildId)
        );
    }
}

module.exports = GuildManager;
