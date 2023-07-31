const {REST} = require('@discordjs/rest');

/**
 * Interactions.js rest handler
 *
 * @example
 * const { Rest } = require("interactions.js");
 *
 * const client = Rest.getRest();
 * @return {Rest} The application
 */
class Rest {
    constructor(options) {

    }

    /**
     * the rest object
     * @type {REST}
     * @private
     */
    static rest;

    /**
     * Get the REST object
     * @type {REST} the rest object
     * @return {REST} the rest object
     */
    static getRest() {
        if (Rest.rest instanceof REST) {
            return Rest.rest;
        } else {
            Rest.rest = new REST({
                version: '10',
                userAgentAppendix: 'DiscordBot (https://github.com/fb-sean/interactions.js, v1.2.11)'
            }).setToken(process.env.DISCORD_TOKEN);

            return Rest.rest;
        }
    }
}

module.exports = Rest;
