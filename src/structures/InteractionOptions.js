// Require all needed types
const InteractionOptionsType = require("./InteractionOptionsType");

/**
 * Create a formatted Interaction Options Object
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
class InteractionOptions {
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
     * @example
     * const subCommandOption = interaction.options.getSubCommand(); // returns the subcommand
     */
    getSubCommand() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.SUB_COMMAND);
    }

    /**
     * Get the interaction option "Sub Command Group"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const subCommandGroupOption = interaction.options.getSubCommandGroup(); // returns the subcommand group
     */
    getSubCommandGroup() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.SUB_COMMAND_GROUP);
    }

    /**
     * Get the interaction option "String"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const stringOption = interaction.options.getString("optionName"); // returns the string
     */
    getStringOption(name) {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.STRING && option?.name === name);
    }

    /**
     * Get the interaction option "String"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const integerOption = interaction.options.getIntegerOption("optionName"); // returns the integer
     */
    getIntegerOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.INTEGER && option?.name === name);
    }

    /**
     * Get the interaction option "Boolean"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const booleanOption = interaction.options.getBoolean("optionName"); // returns the boolean
     */
    getBooleanOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.BOOLEAN && option?.name === name);
    }

    /**
     * Get the interaction option "User"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const userOption = interaction.options.getUser("optionName"); // returns the user
     */
    getUserOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.USER && option?.name === name);
    }

    /**
     * Get the interaction option "Channel"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const channelOption = interaction.options.getChannel("optionName"); // returns the channel
     */
    getChannelOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.CHANNEL && option?.name === name);
    }

    /**
     * Get the interaction option "Role"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const roleOption = interaction.options.getRole("optionName"); // returns the role
     */
    getRoleOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.ROLE && option?.name === name);
    }

    /**
     * Get the interaction option "Mentionable"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const mentionableOption = interaction.options.getMentionable("optionName"); // returns the mentionable
     */
    getMentionableOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.MENTIONABLE && option?.name === name);
    }

    /**
     * Get the interaction option "Number"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const numberOption = interaction.options.getNumber("optionName"); // returns the number
     */
    getNumberOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.NUMBER && option?.name === name);
    }

    /**
     * Get the interaction option "Attachment"
     * @property {String} name - The name of the option
     * @return {InteractionOptionsType.structure}
     * @example
     * const attachmentOption = interaction.options.getAttachment("optionName"); // returns the attachment
     */
    getAttachmentOption() {
        return this.data?.find(option => option?.type === InteractionOptionsType.types.ATTACHMENT && option?.name === name);
    }

    /**
     * Get the interaction options
     * @return {Array}
     * @example
     * const options = interaction.options.getOptions(); // returns the options
     */
    getOptions() {
        return this.data;
    }
}

module.exports = InteractionOptions;
