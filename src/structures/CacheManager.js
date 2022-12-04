// @TODO add here mongoose support

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

    setMember(member) {
        this.members.set(member?.id, member);
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

    getMember(memberID) {
        return this.members.get(memberID);
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

    deleteMember(memberID) {
        this.members.delete(memberID);
    }
}

module.exports = CacheManager;