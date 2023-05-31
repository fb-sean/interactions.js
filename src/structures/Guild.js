/**
 * Create a formatted Guild Object
 * @return {Guild}
 * @example
 * const guild = interaction.guild; // returns the guild object
 * const guildId = interaction.guild.id; // returns the guild id
 */
class Guild {
    constructor(raw) {

        /**
         * the id of the guild
         * @type {string}
         */
        this.id = raw?.guild_id ?? null

        /**
         * Guild's preferred locale
         * @type {string}
         */
        this.locale = raw?.guild_locale ?? null

        /**
         * Bitwise set of permissions the app or bot has within the channel the interaction was sent from
         * @type {string}
         */
        this.botPermissions = raw?.app_permissions ?? null
    }
}

module.exports = Guild;
