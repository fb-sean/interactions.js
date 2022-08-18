const fastify = require("./fastify.js");
const express = require("./express.js");

async function init(c) {
    if(c.type === "fastify") {
        if(c.debug) console.log("[DEBUG] Starting Fastify Server");
        await fastify.init(c);
    } else {
        if(c.debug) console.log("[DEBUG] Starting Express Server");
        await express.init(c);
    }
}

module.exports = init;