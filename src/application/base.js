const startAPI = require("../api/index.js");
const mongooseConnectionHelper = require("../mongo/mongoose.js")
const EventEmitter = require('node:events');
const { ClientRequest } = require("node:http");


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
      this.mongooseString = null, // Not needed but a helper if you dont want to do it by your own
      this.port = 1337, // Custom Port is available
      this.type = 'express' // express or fastify
    }
  
    async start(token = this.token) {
        c.emit('debug', "[DEBUG] Loading App");

        if(!this.mongooseString && typeof this.mongooseString === String) await mongooseConnectionHelper.init(this);

        await startAPI.init(this);
    }
  }
  
  module.exports = Application;