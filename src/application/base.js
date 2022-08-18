const startAPI = require("../api/index.js");
const EventEmitter = require('node:events');

class Application extends EventEmitter{
    constructor(options) {
      super(options);
      this.debug = false,
      this.cacheMembers = false,
      this.cacheUsers = false,
      this.members = new Map(),
      this.users = new Map(),
      this.mongooseString = null, // Not needed but a helper if you dont want to do it by your own
      this.port = 1337, // Custom Port is available
      this.type = 'express' // express or fastify
    }
  
    async start(token = this.token) {
        if(this.debug) console.log("[DEBUG] Loading App");
        await startAPI.init(this);
    }
  }
  
  module.exports = Application;