export = Interaction;
/**
 * Create a formatted Interaction Object
 *
 * @example
 * const Interaction = new Interaction(request, client, response);
 *
 */
declare class Interaction {
    constructor(req: any, c: any, res: any);
    /**
     * the client that is bound to the interaction
     * @type {Application}
     */
    client: Application;
    /**
     * interaction data payload
     * @type {object}
     */
    data: object;
    /**
     * interaction command name
     * @type {string|null}
     */
    commandName: string | null;
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
    options: InteractionOptions;
    /**
     * Return the components data of the interaction (for modals)
     * @type {Interaction}
     * @return {ModalComponents}
     * @example
     * const fieldTest = interaction.components.getDataById("fieldTest"); // Returns the object of field "fieldTest"!
     * const fieldTestValue = interaction.components.getDataById("fieldTest").value; // Returns the value of field "fieldTest"!
     * const fieldTestValueTwo = interaction.components.getValueById("fieldTest"); // Returns also the value of field "fieldTest"!
     */
    components: Interaction;
    /**
     * select menu values if select menu interaction
     * @type {array}
     */
    values: any[];
    /**
     * For monetized apps, any entitlements for the invoking user, representing access to premium SKUs
     * @type {array}
     */
    entitlements: any[];
    /**
     * interaction custom id
     * @type {string|null}
     */
    customId: string | null;
    /**
     * continuation token for responding to the interaction
     * @type {string}
     */
    token: string;
    /**
     * ID of the application this interaction is for
     * @type {string}
     */
    applicationId: string;
    /**
     * ID of the interaction
     * @type {string}
     */
    id: string;
    /**
     * type of interaction
     * @type {number}
     */
    type: number;
    /**
     * the guild data of the interaction
     * @type {object}
     */
    guild: object;
    /**
     * channel that the interaction was sent from
     * @type {number}
     */
    channelId: number;
    /**
     * the member data of the interaction
     * @type {Member}
     */
    member: Member;
    /**
     * bitwise set of permissions the app or bot has within the channel the interaction was sent from
     * @type {number}
     */
    appPermissions: number;
    /**
     * the user data of the interaction
     * @type {User}
     */
    user: User;
    /**
     * selected language of the invoking user
     * @type {number}
     */
    locale: number;
    /**
     * the message data of the interaction
     * @type {Message}
     */
    message: Message;
    /**
     * private res property
     * @private
     */
    private _res;
    /**
     * Get all entitlements for the current application
     * @returns {array}
     */
    getEntitlements(): any[];
    /**
     * Check if the guild has a premium subscription
     * @returns {boolean}
     */
    guildHavePremium(): boolean;
    /**
     * Check if the user has a premium subscription
     * @returns {boolean}
     */
    userHavePremium(): boolean;
    /**
     * Reply to an Interaction
     * @param options The message payload (embeds, components, content, files, ephemeral)
     * @example
     * interaction.reply({ content: "Hello World" });
     */
    reply({ embeds, components, content, files, ephemeral }: {
        embeds?: any[];
        components?: any[];
        content?: any;
        files?: any[];
        ephemeral?: boolean;
    }): any;
    /**
     * Reply to an Interaction with a premium message
     * @example
     * interaction.replyPremium();
     */
    replyPremium(): any;
    /**
     * For components, ACK an interaction and edit the original message later; the user does not see a loading state
     * @example
     * interaction.deferUpdate();
     */
    deferUpdate(): any;
    /**
     * ACK an interaction and edit a response later, the user sees a loading state
     * @param {boolean} ephemeral if the message should be ephemeral
     * @example
     * interaction.deferReply(true); // true or false to make it ephemeral
     */
    deferReply(ephemeral?: boolean): any;
    /**
     * Edit the Reply
     * @param options The message payload (embeds, components, content, files, ephemeral)
     * @param {string} options.content The content of the message
     * @param {array} options.embeds The embeds of the message
     * @param {array} options.components The components of the message
     * @param {array} options.files The files of the message
     * @example
     * const response = await interaction.editReply({ content: "Hello World" });
     * console.log(response);
     */
    editReply(options?: {}): Promise<unknown>;
    /**
     * Send a simple follow-up message
     * @param options The message payload (embeds, components, content, files, ephemeral)
     * @param {string} options.content The content of the message
     * @param {array} options.embeds The embeds of the message
     * @param {array} options.components The components of the message
     * @param {array} options.files The files of the message
     * @example
     * const response = await interaction.followUp({ content: "Hello World" });
     * console.log(response);
     */
    followUp(options: any): Promise<unknown>;
    /**
     * Update an Interaction
     * @param options The message payload (embeds, components, content, files)
     * @example
     * interaction.update({ content: "Hello World" });
     */
    update({ embeds, components, content, files }: {
        embeds?: any[];
        components?: any[];
        content?: any;
        files?: any[];
    }): any;
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
    showModal(modal: any): any;
    /**
     * Response to an autocomplete interaction
     * @param {object[]} choices the choices including (name, name_localizations?, value)
     */
    sendAutoComplete(choices?: object[]): any;
    /**
     * Check if the interaction is a modal submit
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    readonly isModal(): boolean;
    /**
     * Check if the interaction is a message component
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    readonly isComponent(): boolean;
    /**
     * Check if the interaction is an auto complete
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    readonly isAutoComplete(): boolean;
    /**
     * Check if the interaction is an application command
     * @type {boolean}
     * @return {boolean}
     * @readonly
     */
    readonly isCommand(): boolean;
    /**
     * Check if the interaction is in a guild
     * @return {boolean}
     */
    isInGuild(): boolean;
}
import Application = require("../application/base.js");
import InteractionOptions = require("./InteractionOptions.js");
import Member = require("./Member.js");
import User = require("./User.js");
import Message = require("./Message.js");
//# sourceMappingURL=Interaction.d.ts.map