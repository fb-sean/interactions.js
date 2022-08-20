
const {
    InteractionType,
    InteractionResponseType,
  } = require('discord-interactions');
const Interaction = require("../structures/Interaction.js");
const app = require('fastify')({
    logger: false,
    trustProxy: true
})

async function init(c) {
    c.emit('starting', c);

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
    
	app.listen({ port: c.port }, (err) => {
        c.emit('debug', "[DEBUG] API Online on port " + c.port);
        c.emit('ready', c);
	})
}

module.exports = init;