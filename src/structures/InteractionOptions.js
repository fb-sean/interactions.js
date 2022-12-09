// Require all needed types
const InteractionOptionsType = require("./InteractionOptionsType");

/**
 * Create a formatted Interaction Object
 *
 * @example
 * ```js
 * const Interaction = new Interaction(request, client, response);
 * ```
 * @private
 */
class Interaction {
    constructor(options) {
        /**
         * the interaction option data
         * @type {Array}
         */
        this.data = options ?? null;
    }

    /**
     * Get the interaction option "Sub Command"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getSubCommand() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.SUB_COMMAND);
    }

    /**
     * Get the interaction option "Sub Command Group"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getSubCommandGroup() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.SUB_COMMAND_GROUP);
    }

    /**
     * Get the interaction option "String"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getStringOption(name) {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.STRING && option?.name === name);
    }

    /**
     * Get the interaction option "String"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getIntegerOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.INTEGER && option?.name === name);
    }

    /**
     * Get the interaction option "Boolean"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getBooleanOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.BOOLEAN && option?.name === name);
    }

    /**
     * Get the interaction option "User"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getUserOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.USER && option?.name === name);
    }

    /**
     * Get the interaction option "Channel"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getChannelOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.CHANNEL && option?.name === name);
    }

    /**
     * Get the interaction option "Role"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getRoleOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.ROLE && option?.name === name);
    }

    /**
     * Get the interaction option "Mentionable"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getMentionableOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.MENTIONABLE && option?.name === name);
    }

    /**
     * Get the interaction option "Number"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getNumberOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.NUMBER && option?.name === name);
    }

    /**
     * Get the interaction option "Attachment"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     */
    getAttachmentOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.ATTACHMENT && option?.name === name);
    }

    /**
     * Get the interaction option "Attachment"
     * @return {Array}
     */
    getOptions() {
        return this.data;
    }
}

module.exports = Interaction;
