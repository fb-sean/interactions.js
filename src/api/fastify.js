const express = require('express');
const {
    InteractionType,
    InteractionResponseType
  } = require('discord-interactions');
const Interaction = require("../structures/Interaction.js");
const app = require('fastify')({
    logger: false,
    trustProxy: true
});
const Utils = require("../utils/Utils.js");
const Util = new Utils();


module.exports = async (c) => {
    c.emit('starting', c);

    await app.register(require('@fastify/express'))

    app.get('/', (req, res) => {
		return res.redirect(`https://github.com/fb-sean/interactions.js`)
	})

    app.post('/interactions', async (req, res) => {
        c.emit('debug', "[DEBUG] New Interaction " + req.body.id);

        const verifyPayload = await Util.InteractionsMiddleware(c, req);
        if(!verifyPayload) return;

        if (req.body.type === InteractionType.PING) {
            c.emit('debug', "[DEBUG] Response with Pong " + req.body.id);
            return res.send({ type: InteractionResponseType.PONG });
        }

        const interaction = new Interaction(req, c, res);

        c.emit('interaction', interaction);
    });
    
	app.listen({ port: c.port }, (err) => {
        c.emit('debug', "[DEBUG] API Online on port " + c.port);
        c.emit('ready', c);
	})
};