/**
* Create a formated Guild Object
* 
* @example
* ```js
* const Guild = new Guild(GuildData);
* ```
*/
class Guild {
    constructor(raw) {
        // Member Data
        this.id = raw?.guild_id ?? null,
        this.locale = raw?.guild_locale ?? null,
        this.botPermissions = raw?.app_permissions ?? null
    }
}

module.exports = Guild;