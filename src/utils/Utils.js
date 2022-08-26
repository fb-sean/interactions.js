const Colors = require("../structures/Colors.js");
const fetch = require('node-fetch');
const {
    verifyKey
} = require('discord-interactions');

/**
 *
 * Utils for the package itself
 *
 */
class Utils {
    constructor() {
    }

    /**
     * Resolve a color by the input
     *
     * @param {string} color The input to resolve the color
     */
    resolveColor(color) {
        if (typeof color === 'string') {
            if (color === 'Random') return Math.floor(Math.random() * (0xffffff + 1));
            color = Colors[color] ?? parseInt(color.replace('#', ''), 16);
        } else if (Array.isArray(color)) {
            color = (color[0] << 16) + (color[1] << 8) + color[2];
        }

        if (color < 0 || color > 0xffffff) color = 0xffffff;
        else if (Number.isNaN(color)) color = 0xffffff;

        return color;
    }

    /**
     * Check if the input is a url
     *
     * @param {string} url The string to check
     * @param {string} attachment boolean if it can be a attachment
     */
    checkURL(url, attachment = false) {
        if (typeof url != String) {
            return false;
        }

        if (attachment) {
            if (!url.startsWith("https") && !url.startsWith("http") && !url.startsWith("attachment")) {
                return false;
            }
        } else {
            if (!url.startsWith("https") && !url.startsWith("http")) {
                return false;
            }
        }
    }

    /**
     * Do Request to Discord
     *
     * @param {string} client The Client that makes the request
     * @param {string} endpoint The endpoint to request from
     * @param {string} options The fetch options
     */
    async DiscordRequest(client, endpoint, options) {
        try {
            const url = 'https://discord.com/api/v10/' + endpoint;
            if (options.body) options.body = JSON.stringify(options.body);

            const res = await fetch(url, {
                headers: {
                    Authorization: `Bot ${client.botToken}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'User-Agent': 'Discord Interactions.js Package (https://github.com/fb-sean/interactions.js)',
                },
                ...options
            });

            if (!res.ok) {
                const data = await res.json();

                return {
                    error: true,
                    errorData: JSON.stringify(data)
                };
            }
            return res;
        } catch (err) {
            return {
                error: true
            };
        }
    }

    /**
     * Creates a middleware.
     *
     * @param client - The current client
     * @returns The middleware function
     */
    InteractionsMiddleware(client) {
        if (!client.publicKey) {
            throw new Error('You must specify a Discord client public key');
        }

        return function (req, res, buf, encoding) {
            const signature = req.headers["x-signature-ed25519"];
            const timestamp = req.headers["x-signature-timestamp"];

            const isValidRequest = verifyKey(buf, signature, timestamp, client.publicKey);

            if (!isValidRequest) {
                client.emit('debug', "[DEBUG] Bad request signature");

                if (client.type === "express") {
                    res.status(401).send('Bad request signature');
                } else if (client.type === "fastify") {
                    res.type('application/json').code(401)
                    return {error: 'Bad request signature'};
                }
            }
        };
    }
}

module.exports = Utils;