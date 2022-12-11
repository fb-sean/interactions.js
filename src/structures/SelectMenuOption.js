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
class SelectMenuOption {
    constructor() {
        /**
         * the data of the button
         * @type {object}
         * @private
         */
        this.data = {
            /**
             * The label of the select menu option
             * @type {string | null}
             * @private
             */
            label: null,

            /**
             * The value of the select menu option
             * @type {string | null}
             * @private
             */
            value: null,

            /**
             * The description of the select menu option
             * @type {string | null}
             * @private
             */
            description: null,

            /**
             * The emoji of the select menu option
             * @type {object | null}
             * @private
             */
            emoji: null,

            /**
             * The default state of the select menu option
             * @type {boolean}
             * @private
             */
            default: false,
        };
    }

    /**
     * Set the label of the select menu option
     * @param {string} label
     * @return {SelectMenuOption}
     */
    setLabel(label) {
        if (typeof label !== "string") {
            throw new Error("[Interactions.js => <SelectMenuOption>.setLabel] The label must be a string");
        }

        if (label.length > 80) {
            throw new Error("[Interactions.js => <SelectMenuOption>.setLabel] The label must be between 1 and 100 characters");
        }

        this.data.label = label;
        return this;
    }

    /**
     * Set the value of the select menu option
     * @param {string} value
     * @return {SelectMenuOption}
     */
    setValue(value) {
        if (typeof value !== "string") {
            throw new Error("[Interactions.js => <SelectMenuOption>.setValue] The value must be a string");
        }

        if (value.length > 100) {
            throw new Error("[Interactions.js => <SelectMenuOption>.setValue] The value must be between 1 and 100 characters");
        }

        this.data.value = value;
        return this;
    }

    /**
     * Set the description of the select menu option
     * @param {string} description
     * @return {SelectMenuOption}
     */
    setDescription(description) {
        if (typeof description !== "string") {
            throw new Error("[Interactions.js => <SelectMenuOption>.setDescription] The description must be a string");
        }

        if (description.length > 100) {
            throw new Error("[Interactions.js => <SelectMenuOption>.setDescription] The description must be between 1 and 100 characters");
        }

        this.data.description = description;
        return this;
    }

    /**
     * Set the emoji of the select menu option
     * @param {object} emoji
     * @return {SelectMenuOption}
     */
    setEmoji(emoji) {
        if (typeof emoji !== "object") {
            throw new Error("[Interactions.js => <SelectMenuOption>.setEmoji] The emoji must be a object");
        }

        if (!emoji.id && !emoji.name) {
            throw new Error("[Interactions.js => <SelectMenuOption>.setEmoji] The emoji must have a id or name");
        }

        if(!emoji.id) emoji.id = null;

        if (emoji.length > 80) {
            throw new Error("[Interactions.js => <SelectMenuOption>.setEmoji] The emoji must be between 1 and 80 characters");
        }

        this.data.emoji = emoji;
        return this;
    }

    /**
     * set the default state of the option
     * @param {boolean} defaultState
     * @return {SelectMenuOption}
     */
    setDefault(defaultState) {
        if(typeof defaultState !== "boolean") {
            throw new Error("[Interactions.js => <SelectMenuOption>.setDefault] The default state must be a boolean");
        }

        this.data.default = defaultState;
        return this;
    }

    /**
     * return the select menu option as json
     * @return {Object} The select menu option as json
     * @private
     */
    toJSON() {
        return { ...this.data };
    }
}

module.exports = SelectMenuOption;
