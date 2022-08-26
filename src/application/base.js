const startAPI = require("../api/start.js");
const mongooseConnectionHelper = require("../mongo/mongoose.js")
const EventEmitter = require('node:events');


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

        /**
         * the type for the api (express or fastify)
         * @type {string}
         */
        this.type = options?.type ?? 'express'
    }

    /**
     * Start the application
     *
     * @param token the bot token if not already set as "botToken" in the application creation
     */
    async start(token = this.botToken) {
        if (this.type != 'express' && this.type != 'fastify') {
            throw new Error("[Interactions.js => <Client>.start] You need to provide a valid type. Valid types are: 'fastify' and 'express'");
        }


        this.emit('debug', "[DEBUG] Loading App");

        this.botToken = token;

        if (!this.mongooseString && typeof this.mongooseString === String) await mongooseConnectionHelper.init(this);

        await startAPI(this);
    }
}

module.exports = Application;