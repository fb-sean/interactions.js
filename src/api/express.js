const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {
    InteractionType,
    InteractionResponseType,
  } = require('discord-interactions');
const Interaction = require("../utils/Interaction.js");

async function init(c) {
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
        if(c.debug) console.log("[DEBUG] New Interaction " + interaction.id);


        if (interaction.type === InteractionType.PING) {
            if(c.debug) console.log("[DEBUG] Response with a Pong to Discord");
            return res.send({ type: InteractionResponseType.PONG });
        }

        c.emit('interaction', interaction);
    });


    app.listen(c.port, () => {
        if(c.debug) console.log("[DEBUG] API Online on port " + c.port);
        c.emit('ready', c);
	})
}

module.exports = init;