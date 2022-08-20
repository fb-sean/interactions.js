const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
    InteractionType,
    InteractionResponseType,
  } = require('discord-interactions');
const Interaction = require("../structures/Interaction.js");

module.exports = async (c) => {
    c.emit('starting', c);

    app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({
		extended: true
	}));
    
    app.get('/', (req, res) => {
		return res.redirect(`https://github.com/fb-sean/interactions.js`)
	})

    app.post('/interactions', async (req, res) => {
        const interaction = new Interaction(req, c, res);
        c.emit('debug', "[DEBUG] New Interaction " + interaction.id);

        if (interaction.type === InteractionType.PING) {
            c.emit('debug', "[DEBUG] Response with a Pong to Discord");
            return res.send({ type: InteractionResponseType.PONG });
        }

        c.emit('interaction', interaction);
    });

    app.listen(c.port, () => {
        c.emit('debug', "[DEBUG] API Online on port " + c.port);
        c.emit('ready', c);
	})
};