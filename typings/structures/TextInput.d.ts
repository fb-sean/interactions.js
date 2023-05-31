export = TextInput;
/**
 * Create a text input
 *
 * @example
 * const { TextInput } = require("interactions.js");
 *
 * const textInput = new TextInput()
 *    .setCustomId("test")
 *    .setPlaceholder("test")
 *    .setStyle(TextInputStyles.Short)
 *    .setLabel("test");
 *
 */
declare class TextInput {
    /**
     * the data of the text input
     * @type {object}
     * @private
     */
    private data;
    /**
     * set the custom id for the text input
     * @param {string} customId
     * @return {TextInput}
     */
    setCustomId(customId: string): TextInput;
    /**
     * set the style of the text input
     * @param {number} style
     * @return {TextInput}
     */
    setStyle(style: number): TextInput;
    /**
     *
     * @param {string} label
     * @return {TextInput}
     */
    setLabel(label: string): TextInput;
    /**
     * set the min length of the text input
     * @param {number} minLength
     * @return {TextInput}
     */
    setMinLength(minLength: number): TextInput;
    /**
     * set the max length of the text input
     * @param {number} maxLength
     * @return {TextInput}
     */
    setMaxLength(maxLength: number): TextInput;
    /**
     * set the text input as required
     * @param {boolean} required
     * @return {TextInput}
     */
    setRequired(required: boolean): TextInput;
    /**
     * set the value of the text input
     * @param {string} value
     * @return {TextInput}
     */
    setValue(value: string): TextInput;
    /**
     * set the placeholder of the text input
     * @param {string} placeholder
     * @return {TextInput}
     */
    setPlaceholder(placeholder: string): TextInput;
    /**
     * return the text input as json
     * @return {Object} The text input as json
     * @private
     */
    private toJSON;
}
//# sourceMappingURL=TextInput.d.ts.map