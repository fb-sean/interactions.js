const startAPI = require("../api/start.js");
const mongooseConnectionHelper = require("../mongo/mongoose.js")
const EventEmitter = require('node:events');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

/**
 * Create your Application
 *
 * @example
 * ```js
 * const client = new Application();
 * client.on("debug", debug => {
 *    console.log(debug);
 * })
 * ```
 *
 * @param {Object} options Your application options
 */
class Application extends EventEmitter {
    constructor(options) {
        super(options);

        /**
         * the token of the bot application (needed)
         * @type {string}
         */
        this.botToken = options?.botToken ?? null

        /**
         * the public key of the application (needed)
         * @type {string}
         */
        this.publicKey = options?.publicKey ?? null

        /**
         * the ID of the application (needed)
         * @type {string}
         */
        this.applicationId = options?.applicationId ?? null

        /**
         * the mongoose connection string (not needed)
         * @type {string}
         */
        this.mongooseString = options?.mongooseString ?? null

        /**
         * the port for the application (default is "1337")
         * @type {number}
         */
        this.port = options?.port ?? 1337
    }

    /**
     * Start the application
     *
     * @param token the bot token if not already set as "botToken" in the application creation
     */
    async start(token = this.botToken) {
        if (!this.publicKey || !this.applicationId) {
            throw new Error("[Interactions.js => <Client>.start] Make sure to specify a valid publicKey and applicationId!");
        }


        this.emit('debug', "[DEBUG] Loading App");

        this.botToken = token;

        if (!this.mongooseString && typeof this.mongooseString === String) await mongooseConnectionHelper.init(this);

        await startAPI(this);
    }


    /**
     * Set the Slash Commands for the Application
     *
     * @param {array} arrayOfSlashCommands an array of slash commands to set
     */
    async setAppCommands(arrayOfSlashCommands) {
        if (!this.botToken) throw new Error("[Interactions.js => <Client>.setAppCommands] You need to provide a valid token.");

        if (!this.applicationId) throw new Error("[Interactions.js => <Client>.setAppCommands] You need to provide a valid applicationId.");

        const rest = new REST({version: '10'}).setToken(this.botToken);

        try {
            await rest.put(
                Routes.applicationCommands(this.applicationId),
                {body: arrayOfSlashCommands},
            );

            return true;
        } catch (error) {
            return {
                error: true,
                errorData: error
            }
        }
    }
}

module.exports = Application;