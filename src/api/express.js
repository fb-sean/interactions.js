const express = require('express');
const app = express();
const {
    InteractionType,
    InteractionResponseType
  } = require('discord-interactions');
const Interaction = require("../structures/Interaction.js");
const Utils = require("../utils/Utils.js");
const Util = new Utils();

module.exports = async (c) => {
    c.emit('starting', c);
    
    app.use(express.json({ verify: Util.InteractionsMiddleware(c) }));

    app.get('/', (req, res) => {
		return res.redirect(`https://github.com/fb-sean/interactions.js`)
	})

    app.post('/interactions', async (req, res) => {
        c.emit('debug', "[DEBUG] New Interaction " + req.body.id);

        const interaction = new Interaction(req, c, res);

        c.emit('interaction', interaction);
    });

    app.listen(c.port, () => {
        c.emit('debug', "[DEBUG] API Online on port " + c.port);
        c.emit('ready', c);
	})
};