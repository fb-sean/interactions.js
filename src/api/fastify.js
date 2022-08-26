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
    /**
     * Emitted the starting event.
     * @event c#starting
     * @param {c} c The Client
     */
    c.emit('starting', c);

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

        c.emit('debug', "[DEBUG] Forward Interaction " + req.body.id);

        /**
         * Emitted the interaction event.
         * @event c#interaction
         * @param {Interaction} interaction The Interaction to handle
         */
        c.emit('interaction', interaction);
    });
    
	app.listen({ port: c.port }, (err) => {
        c.emit('debug', "[DEBUG] API Online on port " + c.port);

        /**
         * Emitted the ready event.
         * @event c#ready
         * @param {c} c The Client
         */
        c.emit('ready', c);
	})
};