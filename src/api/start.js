const fastify = require("./fastify.js");

module.exports = async (c) => {
    c.emit('debug', "[DEBUG] Starting Fastify Server");
    await fastify(c);
};