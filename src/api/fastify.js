// Require all needed types
const InteractionType = require("../structures/InteractionType");
const InteractionResponseType = require("../structures/InteractionResponseType");

// Require the interaction main class
const Interaction = require("../structures/Interaction.js");

const Member = require("../structures/Member.js");

// Require the fastify application
const app = require('fastify')({
    logger: false,
    trustProxy: true
});

// Require the util class
const Utils = require("../utils/Utils.js");
const Util = new Utils();

module.exports = async (Client) => {
    /**
     * Emitted the starting event.
     * @event Client#starting
     * @param {Client} c The Client
     */
    Client.emit('starting', Client);

    app.get('/', (req, res) => {
        return res.redirect(`https://github.com/fb-sean/interactions.js`)
    })

    app.post('/interactions', async (req, res) => {
        Client.emit('debug', "[DEBUG] New Interaction " + req.body.id);

        const verifyPayload = await Util.InteractionsMiddleware(Client, req);
        if (!verifyPayload) return Client.emit('debug', "[DEBUG] Didn't passed the verification. ");

        if (req.body.type === InteractionType.PING) {
            Client.emit('debug', "[DEBUG] Response with Pong " + req.body.id);
            return res.send({type: InteractionResponseType.PONG});
        }

        const interaction = new Interaction(req, Client, res);

        Client.emit('debug', "[DEBUG] Forward Interaction " + req.body.id);

        /**
         * Emitted the interaction event.
         * @event Client#interactionCreate
         * @param {Interaction} interaction The Interaction to handle
         */
        Client.emit('interactionCreate', interaction);
    });

    app.listen({port: Client.port}, (err) => {
        Client.emit('debug', "[DEBUG] API Online on port " + Client.port);

        /**
         * Emitted the ready event.
         * @event Client#ready
         * @param {Client} Client The Client
         */
        Client.emit('ready', Client);
    })
};