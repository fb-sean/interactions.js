const Member = require("./Member.js");
const User = require("./User.js");
const Guild = require("./Guild.js");
const {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
} = require('discord-interactions');

/**
 * Create a formatted Interaction Object
 *
 * @example
 * ```js
 * const Interaction = new Interaction(request, client, response);
 * ```
 */
class Interaction {
    constructor(req, c, res) {

        /**
         * the client that is bound to the interaction
         * @type {object}
         */
        this.client = c

        /**
         * interaction data payload
         * @type {object}
         */
        this.data = req.body.data

        /**
         * interaction command name
         * @type {string|null}
         */
        this.commandName = req?.body?.data?.name ?? null

        /**
         * interaction custom id
         * @type {string|null}
         */
        this.customId = req?.body?.data?.custom_id ?? null

        /**
         * continuation token for responding to the interaction
         * @type {string}
         */
        this.token = req.body.token

        /**
         * ID of the application this interaction is for
         * @type {number}
         */
        this.applicationId = req.body.application_id

        /**
         * ID of the interaction
         * @type {number}
         */
        this.id = req.body.id

        /**
         * type of interaction
         * @type {number}
         */
        this.type = req.body.type

        /**
         * the guild data of the interaction
         * @type {object}
         */
        this.guild = new Guild(req.body)

        /**
         * channel that the interaction was sent from
         * @type {number}
         */
        this.channelId = req?.body?.channel_id ?? null

        /**
         * the member data of the interaction
         * @type {object}
         */
        this.member = new Member(req?.body?.member ?? null)

        /**
         * bitwise set of permissions the app or bot has within the channel the interaction was sent from
         * @type {number}
         */
        this.appPermissions = req?.body?.app_permissions ?? null

        /**
         * the user data of the interaction
         * @type {object}
         */
        this.user = new User(req?.body?.user ?? req?.body?.member?.user ?? null)

        /**
         * selected language of the invoking user
         * @type {number}
         */
        this.locale = req?.body?.locale ?? null

        /**
         * private res property
         */
        this._res = res
    }

    /**
     * Reply to an Interaction
     *
     * @param options The message payload (embeds, components, content, files)
     */
    reply({embeds = [], components = [], content = null, files = null, ephemeral = false}) {
        if (embeds?.length <= 0 && components?.length <= 0 && !attachments && !content) throw new Error("[Interactions.js => <Interaction>.reply] You need to provide a MessagePayload (Content or Embeds or Components or Attachments)");

        this.client.emit('debug', "[DEBUG] Sending a reply to " + this.id);

        return this._res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds,
                content,
                components,
                files,
                flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : null,
            }
        });
    }

    /**
     * Update an Interaction
     *
     * @param options The message payload (embeds, components, content, files)
     */
    update({embeds = [], components = [], content = null, files = null}) {
        if (embeds?.length <= 0 && components?.length <= 0 && !attachments && !content) throw new Error("[Interactions.js => <Interaction>.update] You need to provide a MessagePayload (Content or Embeds or Components or Attachments)");

        this.client.emit('debug', "[DEBUG] Sending a interaction update to " + this.id);

        return this._res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                embeds,
                content,
                components,
                files,
            }
        });
    }

    /**
     * Check if the interaction is a modal submit
     * @type {boolean}
     */
    isModal() {
        return this.type === InteractionType.MODAL_SUBMIT;
    }

    /**
     * Check if the interaction is a message component
     * @type {boolean}
     */
    isComponent() {
        return this.type === InteractionType.MESSAGE_COMPONENT;
    }

    /**
     * Check if the interaction is an auto complete
     * @type {boolean}
     */
    isAutoComplete() {
        return this.type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE;
    }

    /**
     * Check if the interaction is an application command
     * @type {boolean}
     */
    isCommand() {
        return this.type === InteractionType.APPLICATION_COMMAND;
    }
}

module.exports = Interaction;