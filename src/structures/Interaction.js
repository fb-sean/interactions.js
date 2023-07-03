// Require the classes for the interaction
const Member = require("./Member.js");
const User = require("./User.js");
const Guild = require("./Guild.js");
const InteractionOptions = require("./InteractionOptions.js");
const Message = require("./Message.js");
const Application = require("../application/base.js");

// Require all needed types
const InteractionResponseFlags = require("./InteractionResponseFlags");
const InteractionType = require("./InteractionType");
const InteractionResponseType = require("./InteractionResponseType");
const ModalComponents = require("./ModalComponents");

// Rest Handler
const Rest = require("./Rest");

/**
 * Create a formatted Interaction Object
 *
 * @example
 * const Interaction = new Interaction(request, client, response);
 *
 */
class Interaction {
    constructor(req, c, res) {
        /**
         * the client that is bound to the interaction
         * @type {Application}
         */
        this.client = c;

        /**
         * interaction data payload
         * @type {object}
         */
        this.data = req.body.data;

        /**
         * interaction command name
         * @type {string|null}
         */
        this.commandName = req?.body?.data?.name ?? null;

        // Only using options when it's needed.
        if (req.body.type === InteractionType.APPLICATION_COMMAND || req.body.type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE) {
            /**
             * Return the options of the interaction
             * @type {InteractionOptions}
             * @return {InteractionOptions}
             * @example
             * const subCommandOption = interaction.options.getSubCommand(); // returns the subcommand option
             * const subCommandGroupOption = interaction.options.getSubCommandGroup(); // returns the subcommand group option
             * const stringOption = interaction.options.getString("optionName"); // returns the string option
             * const integerOption = interaction.options.getInteger("optionName"); // returns the integer option
             * const booleanOption = interaction.options.getBoolean("optionName"); // returns the boolean option
             * const userOption = interaction.options.getUser("optionName"); // returns the user option
             * const memberOption = interaction.options.getMember("optionName"); // returns the member option
             * const channelOption = interaction.options.getChannel("optionName"); // returns the channel option
             * const roleOption = interaction.options.getRole("optionName"); // returns the role option
             * const numberOption = interaction.options.getNumber("optionName"); // returns the number option
             * const mentionableOption = interaction.options.getMentionable("optionName"); // returns the mentionable option
             */
            this.options = new InteractionOptions(req?.body?.data?.options ?? null);
        }

        // Only using components when it's needed.
        if (req.body.type === InteractionType.MODAL_SUBMIT) {
            /**
             * Return the components data of the interaction (for modals)
             * @type {Interaction}
             * @return {ModalComponents}
             * @example
             * const fieldTest = interaction.components.getDataById("fieldTest"); // Returns the object of field "fieldTest"!
             * const fieldTestValue = interaction.components.getDataById("fieldTest").value; // Returns the value of field "fieldTest"!
             * const fieldTestValueTwo = interaction.components.getValueById("fieldTest"); // Returns also the value of field "fieldTest"!
             */
            this.components = new ModalComponents(req?.body?.data?.components ?? []);
        }

        /**
         * select menu values if select menu interaction
         * @type {array}
         */
        this.values = req?.body?.data?.values ?? [];

        /**
         * interaction custom id
         * @type {string|null}
         */
        this.customId = req?.body?.data?.custom_id ?? null;

        /**
         * continuation token for responding to the interaction
         * @type {string}
         */
        this.token = req.body.token;

        /**
         * ID of the application this interaction is for
         * @type {string}
         */
        this.applicationId = req.body.application_id;

        /**
         * ID of the interaction
         * @type {string}
         */
        this.id = req.body.id;

        /**
         * type of interaction
         * @type {number}
         */
        this.type = req.body.type;

        /**
         * the guild data of the interaction
         * @type {object}
         */
        this.guild = new Guild(req.body);

        /**
         * channel that the interaction was sent from
         * @type {number}
         */
        this.channelId = req?.body?.channel_id ?? null;

        /**
         * the member data of the interaction
         * @type {Member}
         */
        this.member = new Member(req?.body?.member ?? null);

        /**
         * bitwise set of permissions the app or bot has within the channel the interaction was sent from
         * @type {number}
         */
        this.appPermissions = req?.body?.app_permissions ?? null;

        /**
         * the user data of the interaction
         * @type {User}
         */
        this.user = new User(req?.body?.user ?? req?.body?.member?.user ?? null);

        /**
         * selected language of the invoking user
         * @type {number}
         */
        this.locale = req?.body?.locale ?? null;

        /**
         * the message data of the interaction
         * @type {Message}
         */
        this.message = new Message(req?.body?.message ?? null);

        /**
         * private res property
         * @private
         */
        this._res = res;

        /**
         * Add data to the cache
         */
        if (this.isInGuild()) {
            if (this.client.cacheMembers) {
                this.client._cache.setMember(this.guild.id, this.member);
            }

            if (this.client.cacheGuilds) {
                this.client._cache.setGuild(this.guild.id, this.guild);
            }
        }

        if (this.client.cacheUsers) {
            this.client._cache.setUser(this.user.id, this.user);
        }
    }

    /**
     * Reply to an Interaction
     * @param options The message payload (embeds, components, content, files, ephemeral)
     * @example
     * interaction.reply({ content: "Hello World" });
     */
    reply({embeds = [], components = [], content = null, files = [], ephemeral = false}) {
        if (embeds?.length <= 0 && components?.length <= 0 && !files && !content) throw new Error("[Interactions.js => <Interaction>.reply] You need to provide a MessagePayload (Content or Embeds or Components or files)");

        this.client.emit('debug', "[DEBUG] Sending a reply to " + this.id);

        this._res.header('User-Agent', 'DiscordBot (https://github.com/fb-sean/interactions.js), v1.2.9)');
        return this._res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content,
                embeds,
                components,
                files,
                flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : null,
            },
        });
    }

    /**
     * For components, ACK an interaction and edit the original message later; the user does not see a loading state
     * @example
     * interaction.deferUpdate();
     */
    deferUpdate() {
        this.client.emit('debug', "[DEBUG] Sending a defer update to " + this.id);

        this._res.header('User-Agent', 'DiscordBot (https://github.com/fb-sean/interactions.js), v1.2.9)');
        return this._res.send({
            type: 6,
            data: {},
        });
    }

    /**
     * ACK an interaction and edit a response later, the user sees a loading state
     * @param {boolean} ephemeral if the message should be ephemeral
     * @example
     * interaction.deferReply(true); // true or false to make it ephemeral
     */
    deferReply(ephemeral = false) {
        this.client.emit('debug', "[DEBUG] Sending a defer to " + this.id);

        this._res.header('User-Agent', 'DiscordBot (https://github.com/fb-sean/interactions.js), v1.2.9)');
        return this._res.send({
            type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : null,
            },
        });
    }

    /**
     * Edit the Reply
     * @param options The message payload (embeds, components, content, files, ephemeral)
     * @example
     * const response = await interaction.editReply({ content: "Hello World" });
     * console.log(response);
     */
    editReply({embeds = [], components = [], content = null, files = []}) {
        if (embeds?.length <= 0 && components?.length <= 0 && !files?.length <= 0 && !content) throw new Error("[Interactions.js => <Interaction>.editReply] You need to provide a MessagePayload (Content or Embeds or Components or files)");

        this.client.emit('debug', "[DEBUG] Sending a edit");

        let payload = {};
        if (embeds?.length > 0) payload.embeds = embeds;
        if (components?.length > 0) payload.components = components;
        if (content) payload.content = content;
        if (files?.length > 0) payload.files = files;

        const rest = Rest.getRest();

        return rest.patch(
            `/webhooks/${this.client.applicationId}/${this.token}/messages/@original?wait=true`,
            {
                body: payload,
                files: payload.files ?? undefined,
            }
        );
    }

    /**
     * Send a simple follow-up message
     * @param options The message payload (embeds, components, content, files, ephemeral)
     * @example
     * const response = await interaction.followUp({ content: "Hello World" });
     * console.log(response);
     */
    followUp({embeds = [], components = [], content = null, files = []}) {
        if (embeds?.length <= 0 && components?.length <= 0 && !files?.length <= 0 && !content) throw new Error("[Interactions.js => <Interaction>.followUp] You need to provide a MessagePayload (Content or Embeds or Components or files)");

        this.client.emit('debug', "[DEBUG] Sending a follow up");

        let payload = {};
        if (embeds?.length > 0) payload.embeds = embeds;
        if (components?.length > 0) payload.components = components;
        if (content) payload.content = content;
        if (files?.length > 0) payload.files = files;

        const rest = Rest.getRest();

        return rest.post(
            `/webhooks/${this.client.applicationId}/${this.token}?wait=true`,
            {
                body: payload,
                files: payload.files ?? undefined,
            }
        );
    }

    /**
     * Update an Interaction
     * @param options The message payload (embeds, components, content, files)
     * @example
     * interaction.update({ content: "Hello World" });
     */
    update({embeds = [], components = [], content = null, files = []}) {
        if (embeds?.length <= 0 && components?.length <= 0 && files?.length <= 0 && !content) throw new Error("[Interactions.js => <Interaction>.update] You need to provide a MessagePayload (Content or Embeds or Components or files)");

        this.client.emit('debug', "[DEBUG] Sending a interaction update to " + this.id);

        this._res.header('User-Agent', 'DiscordBot (https://github.com/fb-sean/interactions.js), v1.2.9)');
        return this._res.send({
            type: InteractionResponseType.UPDATE_MESSAGE,
            data: {
                content,
                embeds,
                components,
                files,
            },
        });
    }

    /**
     * Response to an interaction with a modal
     * @param {object | modal} modal
     * @example
     * const { Modal, TextInput, TextInputStyles } = require('interactions.js');
     *
     *  const modal = new Modal()
     *      .setCustomId("test")
     *      .setTitle("Test Modal")
     *      .addComponent(
     *          new ActionRow()
     *              .addComponent(
     *                  new TextInput()
     *                      .setCustomId("test")
     *                      .setPlaceholder("test")
     *                      .setStyle(TextInputStyles.Short)
     *                      .setLabel("test")
     *              )
     *      );
     *
     * return interaction.showModal(modal);
     */
    showModal(modal) {
        if (this.isModal()) {
            throw new Error("[Interactions.js => <Interaction>.showModal] You can't reply with a modal to a modal");
        }

        if (!modal) {
            throw new Error("[Interactions.js => <Interaction>.showModal] You need to provide a modal");
        }

        this.client.emit('debug', "[DEBUG] Sending a modal to " + this.id);

        const data = modal?.data ? modal.toJSON() : modal;

        if (!data.custom_id) {
            throw new Error("[Interactions.js => <Interaction>.showModal] You need to provide a customId");
        }

        if (!data.title) {
            throw new Error("[Interactions.js => <Interaction>.showModal] You need to provide a title");
        }

        if (data.components > 5) {
            throw new Error("[Interactions.js => <Interaction>.showModal] You can't provide more than 5 components");
        }

        if (data.components?.length < 1) {
            throw new Error("[Interactions.js => <Interaction>.showModal] You need to provide at least 1 component");
        }

        if (data.components?.length > 0) {
            data.components.forEach((component) => {
                if (component.components?.length > 5) {
                    throw new Error("[Interactions.js => <Interaction>.showModal] You can't provide more than 5 components in a row");
                }
            });
        }

        this._res.header('User-Agent', 'DiscordBot (https://github.com/fb-sean/interactions.js), v1.2.9)');
        return this._res.send({
            type: InteractionResponseType.MODAL,
            data,
        });
    }

    /**
     * Response to an autocomplete interaction
     * @param {object[]} choices the choices including (name, name_localizations?, value)
     */
    sendAutoComplete(choices = []) {
        for (const choice of choices) {
            if (!choice.name) {
                throw new Error("[Interactions.js => <Interaction>.sendAutoComplete] You need to provide a name for each choice");
            }
            if (!choice.value) {
                throw new Error("[Interactions.js => <Interaction>.sendAutoComplete] You need to provide a value for each choice");
            }

            if (choice.name.length > 100) {
                throw new Error("[Interactions.js => <Interaction>.sendAutoComplete] You can't provide a name longer than 100 characters");
            }

            if (choice.value.length > 100) {
                throw new Error("[Interactions.js => <Interaction>.sendAutoComplete] You can't provide a value longer than 100 characters");
            }
        }

        this._res.header('User-Agent', 'DiscordBot (https://github.com/fb-sean/interactions.js), v1.2.9)');
        return this._res.send({
            type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
            data: {
                choices: choices,
            },
        });
    }


    /**
     * Check if the interaction is a modal submit
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    isModal() {
        return this.type === InteractionType.MODAL_SUBMIT;
    }

    /**
     * Check if the interaction is a message component
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    isComponent() {
        return this.type === InteractionType.MESSAGE_COMPONENT;
    }

    /**
     * Check if the interaction is an auto complete
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    isAutoComplete() {
        return this.type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE;
    }

    /**
     * Check if the interaction is an application command
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    isCommand() {
        return this.type === InteractionType.APPLICATION_COMMAND;
    }

    /**
     * Check if the interaction is in a guild
     * @return {boolean}
     */
    isInGuild() {
        return this.guild !== null;
    }
}

module.exports = Interaction;
