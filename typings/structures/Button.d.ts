export = Button;
/**
 * Create a button
 *
 * @example
 * const { ButtonStyles, Button } = require("interactions.js");
 *
 * const button = new Button()
 *  .setStyle(ButtonStyles.Secondary) // Set the style of the button
 *  .setLabel('Button') // Set the label of the button
 *  .setEmoji('🎊') // Set the emoji of the button
 *  .setCustomId('custom') // Set the custom id of the button
 *
 */
declare class Button {
    /**
     * the data of the button
     * @type {object}
     * @private
     */
    private data;
    /**
     * Set the button style
     * @param {number} style
     * @return {Button}
     */
    setStyle(style: number): Button;
    /**
     * Set the button label
     * @param {string} label
     * @return {Button}
     */
    setLabel(label: string): Button;
    /**
     * Set the button emoji
     * @param {object} emoji
     * @return {Button}
     */
    setEmoji(emoji: object): Button;
    /**
     * Set the button custom id
     * @param {string} custom_id
     * @return {Button}
     */
    setCustomId(custom_id: string): Button;
    /**
     * Set the button url
     * @param {string} url
     * @return {Button}
     */
    setURL(url: string): Button;
    /**
     * set the button as disabled or not
     * @param {boolean} disabled
     * @return {Button}
     */
    setDisabled(disabled: boolean): Button;
    /**
     * return the button as json
     * @return {Object} The button as json
     * @private
     */
    private toJSON;
}
//# sourceMappingURL=Button.d.ts.map