const Colors = require("../structures/Colors.js");
const fetch = require('node-fetch');
const {
    verifyKey
} = require('discord-interactions');
const { createPublicKey, verify } = require('node:crypto');

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

            let data;
            if (!res.ok) {
                data = await res.json();

                return {
                    error: true,
                    errorData: JSON.stringify(data)
                };
            }
            data = await res.json();
            return data;
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
     * @param req - The request data
     * @returns The middleware function
     */
    InteractionsMiddleware(client, req) {
        if (!client.publicKey) {
            throw new Error('You must specify a Discord client public key');
        }

        const cryptoKey = Buffer.concat([Buffer.from('302a300506032b6570032100', 'hex'), Buffer.from(client.publicKey,'hex')]);
        const verifyKey = createPublicKey({format: 'der',type: 'spki', key: cryptoKey});

        return new Promise ( (resolve, _) => {
            try {
                const timestamp = req.headers['x-signature-timestamp'];
                const sig = Buffer.from(req.headers['x-signature-ed25519'], 'hex');

                const stringifyData = JSON.stringify(req.body);

                const data = Buffer.from(timestamp+stringifyData);
                const isVerified = verify(null, data, verifyKey, sig);
                resolve(isVerified);
            } catch {
                resolve(false);
            }
        });
    }
}

module.exports = Utils;