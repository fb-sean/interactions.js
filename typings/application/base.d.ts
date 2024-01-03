export = Application;
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
declare class Application extends EventEmitter {
    constructor(options: any);
    /**
     * the token of the bot application (needed)
     * @type {string}
     */
    botToken: string;
    /**
     * the public key of the application (needed)
     * @type {string}
     */
    publicKey: string;
    /**
     * the ID of the application (needed)
     * @type {string}
     */
    applicationId: string;
    /**
     * the mongoose connection string (not needed)
     * @type {string}
     */
    mongooseString: string;
    /**
     * the port for the application (default is "1337")
     * @type {number}
     */
    port: number;
    /**
     * boolean to enable or disable the client channels cache
     * @type {boolean}
     */
    cacheChannels: boolean;
    /**
     * boolean to enable or disable the client users cache
     * @type {boolean}
     */
    cacheUsers: boolean;
    /**
     * boolean to enable or disable the client members cache
     * @type {boolean}
     */
    cacheMembers: boolean;
    /**
     * boolean to enable or disable the client guilds cache
     * @type {boolean}
     */
    cacheGuilds: boolean;
    /**
     * boolean to enable or disable the client roles cache
     * @type {boolean}
     */
    cacheRoles: boolean;
    /**
     * boolean to enable or disable that interactions.js use the mongoose connection to save and load cache
     * @type {*|boolean}
     */
    useMongooseCache: any | boolean;
    /**
     * set a custom cool down in milliseconds to save the cache in the mongoose database
     * @type {*|number}
     */
    customCacheCooldown: any | number;
    /**
     * whether to run the application on all interfaces or not - needed for docker
     * @type {boolean}
     */
    runOnAllInterfaces: boolean;
    /**
     * if you want to use your own express or fastify instance
     * @type {*|null}
     */
    apiInstance: any | null;
    /**
     * Private property to store the client cache
     * @type {CacheManager} the cache manager
     * @private
     */
    private _cache;
    /**
     * The unix timestamp since when the bot is ready
     * @type {number|null}
     */
    readySince: number | null;
    fetchClient(): void;
    user: User;
    /**
     * Start the application
     *
     * @param token the bot token if not already set as "botToken" in the application creation
     */
    start(token?: string): Promise<void>;
    /**
     * Set the Slash Commands for the Application
     *
     * @param {array} arrayOfSlashCommands an array of slash commands to set
     */
    setAppCommands(arrayOfSlashCommands: any[]): Promise<true | {
        error: boolean;
        errorData: any;
    }>;
    /**
     * Set the Slash Commands for a Guild
     *
     * @param {array} arrayOfSlashCommands an array of slash commands to set
     * @param {string} GuildId the guild id to post the commands to
     */
    setGuildCommands(arrayOfSlashCommands: any[], GuildId: string): Promise<true | {
        error: boolean;
        errorData: any;
    }>;
}
import EventEmitter = require("events");
import User = require("../structures/User");
//# sourceMappingURL=base.d.ts.map