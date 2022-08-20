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
class Application extends EventEmitter{
    constructor(options) {
      super(options);
      this.botToken = options?.botToken ?? null, // The Bot Token
      this.publicKey = options?.publicKey ?? null, // The Application Public Key
      this.applicationId = options?.applicationId ?? null, // The Application ID

      this.mongooseString = options?.mongooseString ?? null, // Not needed but a helper if you dont want to do it by your own
      this.port = options?.port ?? 1337, // Custom Port is available
      this.type = options?.type ?? 'express' // express or fastify
    }
  
    async start(token = this.botToken) {
        if(this.type != 'express' && this.type != 'fastify') {
          throw new Error("[Interactions.js => <Client>.start] You need to provide a valid type. Valid types are: 'fastify' and 'express'");
        }


        this.emit('debug', "[DEBUG] Loading App");

        this.botToken = token;

        if(!this.mongooseString && typeof this.mongooseString === String) await mongooseConnectionHelper.init(this);

        await startAPI(this);
    }
  }
  
  module.exports = Application;