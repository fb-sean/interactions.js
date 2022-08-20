const Member = require("./Member.js");
const User = require("./User.js");
const Guild = require("./Guild.js");
const {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
  } = require('discord-interactions');

/**
* Create a formated Interaction Object
* 
* @example
* ```js
* const Interaction = new Interaction(request, client, response);
* ```
*/
class Interaction {
    constructor(req, c, res) {
        // client
        this.client = c,

        // Interactions Data
        this.data = req.body.data,
        this.token = req.body.token,
        this.applicationId = req.body.application_id,
        this.id = req.body.id,
        this.type = req.body.type,

        // Guild
        this.guild = new Guild(req.body),
        this.channelId = req?.body?.channel_id ?? null,
        this.member = new Member(req?.body?.member ?? null), 
        this.appPermissions = req?.body?.app_permissions ?? null,

        // Out of Guild
        this.user = new User(req?.body?.user ?? req?.body?.member?.user ?? null),
        this.locale = req?.body?.locale ?? null
    }

    /**
	* Reply to a Interaction
	*
	* @param options The message payload (embeds, components, content, files)
	*/
    reply ({ embeds = [], components = [], content = null, files = null, ephemeral = false }) {
        if(embeds?.length <= 0 && components?.length <= 0 && !attachments && !content) throw new Error("[Interactions.js => <Interaction>.reply] You need to provide a MessagePayload (Content or Embeds or Components or Attachments)");

        this.client.emit('debug', "[DEBUG] Sending a reply to " + this.id);

        return res.send({
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
	* Update a Interaction
	*
	* @param options The message payload (embeds, components, content, files)
	*/
    update ({ embeds = [], components = [], content = null, files = null }) {
        if(embeds?.length <= 0 && components?.length <= 0 && !attachments && !content) throw new Error("[Interactions.js => <Interaction>.update] You need to provide a MessagePayload (Content or Embeds or Components or Attachments)");

        this.client.emit('debug', "[DEBUG] Sending a interaction update to " + this.id);

        return res.send({
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
	*/
    isModal () {
        return this.type === InteractionType.MODAL_SUBMIT;
    }

    /**
	* Check if the interaction is a message component
	*/
    isComponent () {
        return this.type === InteractionType.MESSAGE_COMPONENT ;
    }

    /**
	* Check if the interaction is a auto complete
	*/
    isAutoComplete () {
        return this.type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE ;
    }

    /**
	* Check if the interaction is a application command
	*/
    isCommand () {
        return this.type === InteractionType.APPLICATION_COMMAND ;
    }
}

module.exports = Interaction;