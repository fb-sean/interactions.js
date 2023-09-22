export = SelectMenu;
/**
 * Create a select menu
 *
 * @example
 * const { SelectMenu, SelectMenuTypes, SelectMenuOption } = require("interactions.js");
 *
 * const select = new SelectMenu()
 *  .setType(SelectMenuTypes.Text) // Set the type of the select menu
 *  .setCustomId('customId') // Set the custom id of the select menu
 *  .setPlaceholder('Cool Placeholder') // Set the placeholder of the select menu
 *  .setMinValues(1) // Set the minimum values of the select menu
 *  .setMaxValues(1) // Set the maximum values of the select menu
 *  .addOptions([
 *      new SelectMenuOption()
 *          .setLabel('Option 1')
 *          .setValue('option1')
 *          .setDescription('Option 1 Description')
 *          .setEmoji('👍')
 *          .setDefault(true),
 *  ]) // Add options to the select menu
 *  .setDisabled() // Set the disabled state of the select menu
 *
 */
declare class SelectMenu {
    /**
     * the data of the select menu
     * @type {object}
     * @private
     */
    private data;
    /**
     * Set the type of the select menu
     * @param {number} type
     * @return {SelectMenu}
     */
    setType(type: number): SelectMenu;
    /**
     * Set the custom id of the select menu
     * @param {string} customId
     * @return {SelectMenu}
     */
    setCustomId(customId: string): SelectMenu;
    /**
     * add options to the select menu
     * @param {array} options
     * @return {SelectMenu}
     */
    addOptions(options: any[]): SelectMenu;
    /**
     * add a single option to the select menu
     * @param {object} option
     * @return {SelectMenu}
     */
    addOption(option: object): SelectMenu;
    /**
     * set the options of the select menu
     * @param {array} options
     * @return {SelectMenu}
     */
    setOptions(options: any[]): SelectMenu;
    /**
     * set the channel types that select menu is available in (only available for channel select menu)
     * @param {array} channelTypes
     * @return {SelectMenu}
     */
    setChannelTypes(channelTypes: any[]): SelectMenu;
    /**
     * set the placeholder of the select menu
     * @param {string} placeholder
     * @return {SelectMenu}
     */
    setPlaceholder(placeholder: string): SelectMenu;
    /**
     * set the minimum number of options that must be selected
     * @param {number} minValues
     * @return {SelectMenu}
     */
    setMinValues(minValues: number): SelectMenu;
    /**
     * set the maximum number of options that can be selected
     * @param {number} maxValues
     * @return {SelectMenu}
     */
    setMaxValues(maxValues: number): SelectMenu;
    /**
     * set the disabled state of the select menu
     * @param {boolean} disabled
     * @return {SelectMenu}
     */
    setDisabled(disabled: boolean): SelectMenu;
    /**
     * set the default values of the select menu
     * @param {array} defaultValues
     * @returns {SelectMenu}
     */
    setDefaultValues(defaultValues: any[]): SelectMenu;
    /**
     * return the select menu as json
     * @return {Object} The select menu as json
     * @private
     */
    private toJSON;
}
//# sourceMappingURL=SelectMenu.d.ts.map