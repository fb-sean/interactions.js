export = SelectMenuOption;
/**
 * Create a select menu option
 *
 * @example
 * const { SelectMenuOption } = require("interactions.js");
 *
 * const select = new SelectMenuOption()
 * .setLabel('label') // Set the label of the select menu option
 * .setValue('value') // Set the value of the select menu option
 * .setDescription('description') // Set the description of the select menu option
 * .setEmoji('🎍') // Set the emoji of the select menu option
 * .setDefault(true) // Set the default of the select menu option
 *
 */
declare class SelectMenuOption {
    /**
     * the data of the button
     * @type {object}
     * @private
     */
    private data;
    /**
     * Set the label of the select menu option
     * @param {string} label
     * @return {SelectMenuOption}
     */
    setLabel(label: string): SelectMenuOption;
    /**
     * Set the value of the select menu option
     * @param {string} value
     * @return {SelectMenuOption}
     */
    setValue(value: string): SelectMenuOption;
    /**
     * Set the description of the select menu option
     * @param {string} description
     * @return {SelectMenuOption}
     */
    setDescription(description: string): SelectMenuOption;
    /**
     * Set the emoji of the select menu option
     * @param {object} emoji
     * @return {SelectMenuOption}
     */
    setEmoji(emoji: object): SelectMenuOption;
    /**
     * set the default state of the option
     * @param {boolean} defaultState
     * @return {SelectMenuOption}
     */
    setDefault(defaultState: boolean): SelectMenuOption;
    /**
     * return the select menu option as json
     * @return {Object} The select menu option as json
     * @private
     */
    private toJSON;
}
//# sourceMappingURL=SelectMenuOption.d.ts.map