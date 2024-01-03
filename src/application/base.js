const startAPI = require("../api/api.js");
const mongooseConnectionHelper = require("../mongo/mongoose.js")
const EventEmitter = require('node:events');
const Rest = require("../structures/Rest.js");
const {Routes} = require('discord-api-types/v10');
const CacheManager = require("../structures/managers/CacheManager");
const User = require("../structures/User");

/**
 * Create your Application
 *
 * @example
 * const { Application } = require("interactions.js");
 *
 * const client = new Application({ botToken: "Bot Token", publicKey: "Public Key", applicationId: "Application Id", fetchClient: true });
 * client.on("debug", debug => {
 *    console.log(debug);
 * })
 * client.start();
 *
 *
 * @param  {Object}  options The options for the application
 * @param  {string}  options.botToken the bot token
 * @param  {string}  options.publicKey the public key
 * @param  {string}  options.applicationId the application id
 * @param  {string}  options.mongooseString the mongoose connection string
 * @param  {number}  options.port the port for the application
 * @param  {boolean}  options.cacheChannels whether to cache channels or not
 * @param  {boolean}  options.cacheUsers whether to cache users or not
 * @param  {boolean}  options.cacheMembers whether to cache members or not
 * @param  {boolean}  options.cacheGuilds whether to cache guilds or not
 * @param  {boolean}  options.cacheRoles whether to cache roles or not
 * @param  {boolean}  options.useMongooseCache whether to use the mongoose cache or not
 * @param  {number}  options.customCacheCooldown the custom cache cooldown
 * @param  {boolean}  options.runOnAllInterfaces whether to run the application on all interfaces or not - needed for docker
 * @param  {*|null}  options.apiInstance if you want to use your own express or fastify instance
 * @return {Application} The application
 */
class Application extends EventEmitter {
    constructor(options) {
        super();
        /**
         * the token of the bot application (needed)
         * @type {string}
         */
        this.botToken = options?.botToken ?? null;

        /**
         * the public key of the application (needed)
         * @type {string}
         */
        this.publicKey = options?.publicKey ?? null;

        /**
         * the ID of the application (needed)
         * @type {string}
         */
        this.applicationId = options?.applicationId ?? null;

        /**
         * the mongoose connection string (not needed)
         * @type {string}
         */
        this.mongooseString = options?.mongooseString ?? null;

        /**
         * the port for the application (default is "1337")
         * @type {number}
         */
        this.port = options?.port ?? 1337;

        /**
         * boolean to enable or disable the client channels cache
         * @type {boolean}
         */
        this.cacheChannels = options?.cacheChannels ?? false;

        /**
         * boolean to enable or disable the client users cache
         * @type {boolean}
         */
        this.cacheUsers = options?.cacheUsers ?? false;

        /**
         * boolean to enable or disable the client members cache
         * @type {boolean}
         */
        this.cacheMembers = options?.cacheMembers ?? false;

        /**
         * boolean to enable or disable the client guilds cache
         * @type {boolean}
         */
        this.cacheGuilds = options?.cacheGuilds ?? false;

        /**
         * boolean to enable or disable the client roles cache
         * @type {boolean}
         */
        this.cacheRoles = options?.cacheRoles ?? false;

        /**
         * boolean to enable or disable that interactions.js use the mongoose connection to save and load cache
         * @type {*|boolean}
         */
        this.useMongooseCache = options?.useMongooseCache ?? false;

        /**
         * set a custom cool down in milliseconds to save the cache in the mongoose database
         * @type {*|number}
         */
        this.customCacheCooldown = options?.customCacheCooldown ?? 10 * 60 * 1000;

        /**
         * whether to run the application on all interfaces or not - needed for docker
         * @type {boolean}
         */
        this.runOnAllInterfaces = options?.runOnAllInterfaces ?? false;
        
        /**
         * if you want to use your own express or fastify instance
         * @type {*|null}
         */
        this.apiInstance = options?.apiInstance ?? null;

        /**
         * Private property to store the client cache
         * @type {CacheManager} the cache manager
         * @private
         */
        this._cache = new CacheManager(this);

        /**
         * The unix timestamp since when the bot is ready
         * @type {number|null}
         */
        this.readySince = null;

        // Adding some ENV Data
        process.env.DISCORD_TOKEN = this.botToken;
        process.env.MONGOOSE_STRING = this.mongooseString;
        process.env.PUBLIC_KEY = this.publicKey;
        process.env.APPLICATION_ID = this.applicationId;

        // Fetch the client data
        if (options?.fetchClient) this.fetchClient();
    }


    fetchClient() {
        const rest = Rest.getRest();

        rest
            .get(Routes.user(this.applicationId))
            .then(data => {
                this.emit('debug', "[DEBUG] Got the client data from the API");
                this.user = new User(data);
            }).catch(e => {
                this.emit('debug', "[DEBUG] Got a error by fetching the client data from the API!" + e);
                console.log(e)
        });
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

        if (!this.mongooseString && typeof this.mongooseString === "string") await mongooseConnectionHelper.init(this);

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

        const rest = Rest.getRest();

        try {
            await rest.put(
                Routes.applicationCommands(this.applicationId),
                {body: arrayOfSlashCommands},
            );

            this.emit('debug', "[DEBUG] Posted Slash Commands");

            return true;
        } catch (error) {
            this.emit('debug', "[DEBUG] Got a error by posting Slash Commands!");

            return {
                error: true,
                errorData: error
            }
        }
    }

    /**
     * Set the Slash Commands for a Guild
     *
     * @param {array} arrayOfSlashCommands an array of slash commands to set
     * @param {string} GuildId the guild id to post the commands to
     */
    async setGuildCommands(arrayOfSlashCommands, GuildId) {
        if (!this.botToken) throw new Error("[Interactions.js => <Client>.setGuildCommands] You need to provide a valid token.");

        if (!this.applicationId) throw new Error("[Interactions.js => <Client>.setGuildCommands] You need to provide a valid applicationId.");

        if (!GuildId) throw new Error("[Interactions.js => <Client>.setGuildCommands] You need to provide a valid GuildId.");

        const rest = Rest.getRest();

        try {
            await rest.put(
                Routes.applicationGuildCommands(this.applicationId, GuildId),
                {body: arrayOfSlashCommands},
            );

            this.emit('debug', "[DEBUG] Posted Slash Commands to " + GuildId);

            return true;
        } catch (error) {
            this.emit('debug', "[DEBUG] Got a error by posting Slash Commands to " + GuildId + "!");

            return {
                error: true,
                errorData: error
            }
        }
    }
}

module.exports = Application;
