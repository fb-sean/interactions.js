export = Guild;
/**
 * Create a formatted Guild Object
 * @return {Guild}
 * @example
 * const guild = interaction.guild; // returns the guild object
 * const guildId = interaction.guild.id; // returns the guild id
 */
declare class Guild {
    constructor(raw: any);
    /**
     * the id of the guild
     * @type {string}
     */
    id: string;
    /**
     * Guild's preferred locale
     * @type {string}
     */
    locale: string;
    /**
     * Bitwise set of permissions the app or bot has within the channel the interaction was sent from
     * @type {string}
     */
    botPermissions: string;
}
//# sourceMappingURL=Guild.d.ts.map