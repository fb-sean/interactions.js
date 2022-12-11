const TextInputStyles = require('./TextInputStyles');
const buttonStyles = require("./ButtonStyles");

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
class TextInput {
    constructor() {
        /**
         * the data of the text input
         * @type {object}
         * @private
         */
        this.data = {
            /**
             * The type of the text input
             * @type {number}
             * @private
             */
            type: 4,

            /**
             * The custom id of the text input
             * @type {string | null}
             * @private
             */
            custom_id: null,

            /**
             * The style of the text input
             * @type {number}
             * @private
             */
            style: 1,

            /**
             * The label of the text input
             * @type {string | null}
             * @private
             */
            label: null,

            /**
             * The min length of the text input
             * @type {number | null}
             * @private
             */
            min_length: null,

            /**
             * The max length of the text input
             * @type {number | null}
             * @private
             */
            max_length: null,

            /**
             * The state if the text input is required or not
             * @type {boolean}
             * @private
             */
            required: false,

            /**
             * The value of the text input
             * @type {string | null}
             * @private
             */
            value: null,

            /**
             * The placeholder of the text input
             * @type {string | null}
             * @private
             */
            placeholder: null
        };
    }

    /**
     * set the custom id for the text input
     * @param {string} customId
     * @return {TextInput}
     */
    setCustomId(customId) {
        if (typeof customId !== "string") {
            throw new Error("[Interactions.js => <TextInput>.setCustomId] Custom id must be a string");
        }

        if(customId.length > 100) {
            throw new Error("[Interactions.js => <TextInput>.setCustomId] Custom id must be less than 100 characters");
        }

        this.data.custom_id = customId;
        return this;
    }

    /**
     * set the style of the text input
     * @param {number} style
     * @return {TextInput}
     */
    setStyle(style) {
        if (typeof style !== "number") {
            throw new Error("[Interactions.js => <TextInput>.setStyle] Style must be a number");
        }

        if(style < 1 || style > 2) {
            throw new Error("[Interactions.js => <TextInput>.setStyle] Style must be between Short (1) and Paragraph (2)");
        }

        if(!Object.values(TextInputStyles).includes(style)) {
            throw new Error("[Interactions.js => <TextInput>.setStyle] The style must be a valid style");
        }

        this.data.style = style;
        return this;
    }

    /**
     *
     * @param {string} label
     * @return {TextInput}
     */
    setLabel(label) {
        if (typeof label !== "string") {
            throw new Error("[Interactions.js => <TextInput>.setLabel] Label must be a string");
        }

        if(label.length > 80) {
            throw new Error("[Interactions.js => <TextInput>.setLabel] Label must be less than 80 characters");
        }

        this.data.label = label;
        return this;
    }

    /**
     * set the min length of the text input
     * @param {number} minLength
     * @return {TextInput}
     */
    setMinLength(minLength) {
        if (typeof minLength !== "number") {
            throw new Error("[Interactions.js => <TextInput>.setMinLength] Min length must be a number");
        }

        if(minLength < 0) {
            throw new Error("[Interactions.js => <TextInput>.setMinLength] Min length must be greater than 0");
        }

        if(minLength > 4000) {
            throw new Error("[Interactions.js => <TextInput>.setMinLength] Min length must be less than 4000");
        }

        this.data.min_length = minLength;
        return this;
    }

    /**
     * set the max length of the text input
     * @param {number} maxLength
     * @return {TextInput}
     */
    setMaxLength(maxLength) {
        if (typeof maxLength !== "number") {
            throw new Error("[Interactions.js => <TextInput>.setMaxLength] Max length must be a number");
        }

        if(maxLength < 1) {
            throw new Error("[Interactions.js => <TextInput>.setMaxLength] Max length must be greater than 1");
        }

        if(maxLength > 4000) {
            throw new Error("[Interactions.js => <TextInput>.setMaxLength] Max length must be less than 4000");
        }

        this.data.max_length = maxLength;
        return this;
    }

    /**
     * set the text input as required
     * @param {boolean} required
     * @return {TextInput}
     */
    setRequired(required) {
        if (typeof required !== "boolean") {
            throw new Error("[Interactions.js => <TextInput>.setRequired] Required must be a boolean");
        }

        this.data.required = required;
        return this;
    }

    /**
     * set the value of the text input
     * @param {string} value
     * @return {TextInput}
     */
    setValue(value) {
        if (typeof value !== "string") {
            throw new Error("[Interactions.js => <TextInput>.setValue] Value must be a string");
        }

        if(value.length > 4000) {
            throw new Error("[Interactions.js => <TextInput>.setValue] Value must be less than 4000 characters");
        }

        this.data.value = value;
        return this;
    }

    /**
     * set the placeholder of the text input
     * @param {string} placeholder
     * @return {TextInput}
     */
    setPlaceholder(placeholder) {
        if (typeof placeholder !== "string") {
            throw new Error("[Interactions.js => <TextInput>.setPlaceholder] Placeholder must be a string");
        }

        if(placeholder.length > 100) {
            throw new Error("[Interactions.js => <TextInput>.setPlaceholder] Placeholder must be less than 100 characters");
        }

        this.data.placeholder = placeholder;
        return this;
    }

    /**
     * return the text input as json
     * @return {Object} The text input as json
     * @private
     */
    toJSON() {
        return { ...this.data };
    }
}

module.exports = TextInput;
