// Require all needed types
const InteractionType = require("../structures/InteractionType");
const InteractionResponseType = require("../structures/InteractionResponseType");

// Require the interaction main class
const Interaction = require("../structures/Interaction.js");

const Member = require("../structures/Member.js");

const Application = require("../application/base");

// Require the fastify application
const Fastify = require('fastify');
let app = Fastify({
    logger: false,
    trustProxy: true
});

const express = require('express');

// Require the util class
const Utils = require("../utils/Utils.js");
const Util = new Utils();

module.exports = async (Client) => {
    Client.emit('debug', "[DEBUG] Starting Fastify Server");

    let isCustomInstance = false;
    if(Client.apiInstance !== null) {
        isCustomInstance = true;
        app = Client.apiInstance;
    } else {
        Client.apiInstance = app;
    }

    /**
     * Emitted the starting event.
     * @event Application#starting
     * @param {Application} c The Client
     */
    Client.emit('starting', Client);

    app.post('/interactions', async (req, res) => {
        if(req.body === null || req.body === undefined) {
            throw new Error("[Interactions.js => <Client>#interactionCreate] Your custom API Instance doesn't support the body-parser. Please use the default API Instance or install the body-parser package.");
        }

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
         * @event Application#interactionCreate
         * @param {Interaction} interaction The Interaction to handle
         */
        Client.emit('interactionCreate', interaction);
    });

    if(!isCustomInstance) {
        app.listen({port: Client.port}, (err) => {
            Client.emit('debug', "[DEBUG] API Online on port " + Client.port);

            Client.readySince = Date.now();

            /**
             * Emitted the ready event.
             * @event Application#ready
             * @param {Application} Client The Client
             */
            Client.emit('ready', Client);
        });
    } else {
        Client.readySince = Date.now();

        /**
         * Emitted the ready event.
         * @event Application#ready
         * @param {Application} Client The Client
         */
        Client.emit('ready', Client);
    }
};
