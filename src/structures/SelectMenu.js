const SelectMenuTypes = require("./SelectMenuTypes.js");

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
class SelectMenu {
    constructor() {
        /**
         * the data of the select menu
         * @type {object}
         * @private
         */
        this.data = {
            /**
             * The type of the select menu
             * @type {number}
             * @private
             */
            type: 3,

            /**
             * The custom id of the select menu
             * @type {string | null}
             * @private
             */
            custom_id: null,

            /**
             * The options of the select menu
             * @type {array}
             * @private
             */
            options: [],

            /**
             * The channel types if the select menu is a channel select
             * @type {array}
             * @private
             */
            channel_types: [],

            /**
             * The placeholder of the select menu
             * @type {string | null}
             */
            placeholder: null,

            /**
             * The minimum values of the select menu
             * @type {number | null}
             * @private
             */
            min_values: null,

            /**
             * The maximum values of the select menu
             * @type {number | null}
             * @private
             */
            max_values: null,

            /**
             * The disabled state of the select menu
             * @type {boolean}
             * @private
             */
            disabled: false
        };
    }

    /**
     * Set the type of the select menu
     * @param {number} type
     * @return {SelectMenu}
     */
    setType(type) {
        if (typeof type !== "number") {
            throw new Error("[Interactions.js => <SelectMenu>.setType] Type must be a number");
        }

        if(!Object.values(SelectMenuTypes).includes(type)) {
            throw new Error("[Interactions.js => <SelectMenu>.setType] Type must be a valid type");
        }

        this.data.type = type;
        return this;
    }

    /**
     * Set the custom id of the select menu
     * @param {string} customId
     * @return {SelectMenu}
     */
    setCustomId(customId) {
        if (typeof customId !== "string") {
            throw new Error("[Interactions.js => <SelectMenu>.setCustomId] Custom id must be a string");
        }

        if(customId.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.setCustomId] Custom id must be less than 100 characters");
        }

        this.data.custom_id = customId;
        return this;
    }

    /**
     * add options to the select menu
     * @param {array} options
     * @return {SelectMenu}
     */
    addOptions(options) {
        if(!options) {
            throw new Error("[Interactions.js => <SelectMenu>.addOptions] Options are required");
        }

        if(!Array.isArray(options)) {
            throw new Error("[Interactions.js => <SelectMenu>.addOptions] Options must be an array");
        }

        if(options.length > 25) {
            throw new Error("[Interactions.js => <SelectMenu>.addOptions] Options must be less than 25");
        }

        for(const option of options) {
            if(option.label.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.addOptions] Option label must be less than 100 characters");
            }

            if(option.description && option.description.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.addOptions] Option description must be less than 100 characters");
            }

            if(option.value.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.addOptions] Option value must be less than 100 characters");
            }

            if(option.emoji?.name && option.emoji.name.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.addOptions] Option emoji name must be less than 100 characters");
            }

            if(option.emoji && option.emoji.id && option.emoji.id.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.addOptions] Option emoji id must be less than 100 characters");
            }

            if(!option?.emoji?.id && !option?.emoji?.name) {
                throw new Error("[Interactions.js => <SelectMenu>.addOptions] Option emoji must have an id or name");
            }
        }

        this.data.options = this.data.options.concat(options.map(o => o?.data ? o.toJSON() : o));
        return this;
    }

    /**
     * add a single option to the select menu
     * @param {object} option
     * @return {SelectMenu}
     */
    addOption(option) {
        if(typeof option !== "object") {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option must be an object");
        }

        if(option.label.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option label must be less than 100 characters");
        }

        if(option.description && option.description.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option description must be less than 100 characters");
        }

        if(option.value.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option value must be less than 100 characters");
        }

        if(option.emoji?.name && option.emoji.name.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option emoji name must be less than 100 characters");
        }

        if(option.emoji && option.emoji.id && option.emoji.id.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option emoji id must be less than 100 characters");
        }

        if(!option?.emoji?.id && !option?.emoji?.name) {
            throw new Error("[Interactions.js => <SelectMenu>.addOption] Option emoji must have an id or name");
        }

        this.data.options.push(option?.data ? option.toJSON() : option);
        return this;
    }

    /**
     * set the options of the select menu
     * @param {array} options
     * @return {SelectMenu}
     */
    setOptions(options) {
        if(!options) {
            throw new Error("[Interactions.js => <SelectMenu>.setOptions] Options are required");
        }

        if(!Array.isArray(options)) {
            throw new Error("[Interactions.js => <SelectMenu>.setOptions] Options must be an array");
        }

        if(options.length > 25) {
            throw new Error("[Interactions.js => <SelectMenu>.setOptions] Options must be less than 25");
        }

        for(const option of options) {
            if(option.label.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.setOptions] Option label must be less than 100 characters");
            }

            if(option.description && option.description.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.setOptions] Option description must be less than 100 characters");
            }

            if(option.value.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.setOptions] Option value must be less than 100 characters");
            }

            if(option.emoji?.name && option.emoji.name.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.setOptions] Option emoji name must be less than 100 characters");
            }

            if(option.emoji && option.emoji.id && option.emoji.id.length > 100) {
                throw new Error("[Interactions.js => <SelectMenu>.setOptions] Option emoji id must be less than 100 characters");
            }

            if(!option?.emoji?.id && !option?.emoji?.name) {
                throw new Error("[Interactions.js => <SelectMenu>.setOptions] Option emoji must have an id or name");
            }
        }

        this.data.options = options.map(o => o?.data ? o.toJSON() : o);
        return this;
    }

    /**
     * set the channel types that select menu is available in (only available for channel select menu)
     * @param {array} channelTypes
     * @return {SelectMenu}
     */
    setChannelTypes(channelTypes) {
        if(!Array.isArray(channelTypes)) {
            throw new Error("[Interactions.js => <SelectMenu>.setChannelTypes] Channel types must be an array");
        }

        this.data.channel_types = channelTypes;
        return this;
    }

    /**
     * set the placeholder of the select menu
     * @param {string} placeholder
     * @return {SelectMenu}
     */
    setPlaceholder(placeholder) {
        if(typeof placeholder !== "string") {
            throw new Error("[Interactions.js => <SelectMenu>.setPlaceholder] Placeholder must be a string");
        }

        if(placeholder.length > 100) {
            throw new Error("[Interactions.js => <SelectMenu>.setPlaceholder] Placeholder must be less than 100 characters");
        }

        this.data.placeholder = placeholder;
        return this;
    }

    /**
     * set the minimum number of options that must be selected
     * @param {number} minValues
     * @return {SelectMenu}
     */
    setMinValues(minValues) {
        if(typeof minValues !== "number") {
            throw new Error("[Interactions.js => <SelectMenu>.setMinValues] Min values must be a number");
        }

        if(minValues < 1) {
            throw new Error("[Interactions.js => <SelectMenu>.setMinValues] Min values must be greater than 0");
        }

        if(minValues > 25) {
            throw new Error("[Interactions.js => <SelectMenu>.setMinValues] Min values must be less than 25");
        }

        this.data.min_values = minValues;
        return this;
    }

    /**
     * set the maximum number of options that can be selected
     * @param {number} maxValues
     * @return {SelectMenu}
     */
    setMaxValues(maxValues) {
        if(typeof maxValues !== "number") {
            throw new Error("[Interactions.js => <SelectMenu>.setMaxValues] Max values must be a number");
        }

        if(maxValues < 1) {
            throw new Error("[Interactions.js => <SelectMenu>.setMaxValues] Max values must be greater than 0");
        }

        if(maxValues > 25) {
            throw new Error("[Interactions.js => <SelectMenu>.setMaxValues] Max values must be less than 25");
        }

        this.data.max_values = maxValues;
        return this;
    }

    /**
     * set the disabled state of the select menu
     * @param {boolean} disabled
     * @return {SelectMenu}
     */
    setDisabled(disabled) {
        if(typeof disabled !== "boolean") {
            throw new Error("[Interactions.js => <SelectMenu>.setDisabled] Disabled must be a boolean");
        }

        this.data.disabled = disabled;
        return this;
    }

    /**
     * return the select menu as json
     * @return {Object} The select menu as json
     * @private
     */
    toJSON() {
        const data = { ...this.data };

        if(data.type === 3 && data.options <= 0) {
            throw new Error("[Interactions.js => <SelectMenu>.toJSON] Select menu must have at least one option");
        }

        return data;
    }
}

module.exports = SelectMenu;
