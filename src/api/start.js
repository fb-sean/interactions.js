const fastify = require("./fastify.js");
const express = require("./express.js");

module.exports = async (c) => {
    if(c.type === "fastify") {
        c.emit('debug', "[DEBUG] Starting Fastify Server");
        await fastify(c);
    } else {
        c.emit('debug', "[DEBUG] Starting Express Server");
        await express(c);
    }
};