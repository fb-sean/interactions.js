// Cache Schemas
const RolesCacheSchema = require('../mongo/CacheSchemas/RolesCache');
const ChannelsCacheSchema = require('../mongo/CacheSchemas/ChannelsCache');
const GuildsCacheSchema = require('../mongo/CacheSchemas/GuildsCache');
const UsersCacheSchema = require('../mongo/CacheSchemas/UsersCache');
const MembersCacheSchema = require('../mongo/CacheSchemas/MembersCache');

/**
 * Create a Cache Manager
 *
 * @param {object} client
 * @return {CacheManager}
 * @private
 */
class CacheManager {
    constructor(client) {
        this.roles = client?.cacheRoles ? new Map() : null;
        this.channels = client?.cacheRoles ? new Map() : null;
        this.guilds = client?.cacheRoles ? new Map() : null;
        this.users = client?.cacheRoles ? new Map() : null;
        this.members = client?.cacheRoles ? new Map() : null;
    }

    // Setter
    setRole(role) {
        this.roles.set(role?.id, role);
    }

    setChannel(channel) {
        this.channels.set(channel?.id, channel);
    }

    setGuild(guild) {
        this.guilds.set(guild?.id, guild);
    }

    setUser(user) {
        this.users.set(user?.id, user);
    }

    setMember(guildID, member) {
        this.members.set(member?.id + guildID, member);
    }

    // Getter
    getRole(roleID) {
        return this.roles.get(roleID);
    }

    getChannel(channelID) {
        return this.channels.get(channelID);
    }

    getGuild(guildID) {
        return this.guilds.get(guildID);
    }

    getUser(userID) {
        return this.users.get(userID);
    }

    getMember(guildID, memberID) {
        return this.members.get(memberID + guildID);
    }

    // Deleter
    deleteRole(roleID) {
        this.roles.delete(roleID);
    }

    deleteChannel(channelID) {
        this.channels.delete(channelID);
    }

    deleteGuild(guildID) {
        this.guilds.delete(guildID);
    }

    deleteUser(userID) {
        this.users.delete(userID);
    }

    deleteMember(guildID, memberID) {
        this.members.delete(memberID + guildID);
    }


    // Loader
    buildLoaderArray() {
        const loaderArray = [];
        if (client.cacheRoles) loaderArray.push({schema: RolesCacheSchema, cache: this.roles, trigger: 'roles'});
        if (client.cacheGuilds) loaderArray.push({schema: ChannelsCacheSchema, cache: this.guilds, trigger: 'guilds'});
        if (client.cacheMembers) loaderArray.push({schema: GuildsCacheSchema, cache: this.members, trigger: 'members'});
        if (client.cacheUsers) loaderArray.push({schema: UsersCacheSchema, cache: this.users, trigger: 'users'});
        if (client.cacheChannels) loaderArray.push({schema: MembersCacheSchema, cache: this.channels, trigger: 'channels'});
        return loaderArray;
    }

    async loadCache() {
        let loaderArray = this.buildLoaderArray();

        loaderArray.forEach(({schema, cache}, i) => {
            // We use a little timeout here to avoid spamming the database
            setTimeout(async () => {
                const data = await schema.findOne();
                if (data) {
                    cache = data;
                }
            }, 100 * i);
        });


        setInterval(() => {
            loaderArray = this.buildLoaderArray();

            loaderArray.forEach(({schema, cache, trigger}, i) => {
                // We use a little timeout here to avoid spamming the database
                setTimeout(async () => {
                    const data = await schema.findOne();
                    if (data) {
                        await data.updateOne({
                            [trigger]: cache,
                        });
                    } else {
                        await schema.create({
                            [trigger]: cache,
                        });
                    }
                }, 100 * i);
            });
        }, client.customCacheCooldown);
    }
}

module.exports = CacheManager;
