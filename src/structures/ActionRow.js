const Utils = require("../utils/Utils.js");
const Util = new Utils();

const Button = require("./Button.js");
const SelectMenu = require("./SelectMenu.js");
const TextInput = require("./TextInput.js");

/**
 * Create an action row
 *
 * @example
 * const { Button, ButtonStyles, ActionRow } = require("interactions.js");
 *
 * const row = new ActionRow()
 *  .addComponents() // When you want to add an array of components
 *  .addComponent( // When you only want to add one component
 *      new Button()
 *          .setStyle(ButtonStyles.Secondary) // Set the style of the button
 *          .setLabel('Button') // Set the label of the button
 *          .setEmoji('🎈') // Set the emoji of the button
 *          .setCustomId('custom') // Set the custom id of the button
 *  )
 *
 */
class ActionRow {
    constructor() {
        /**
         * the data of the action row
         * @type {{components: array, type: number}}
         * @private
         */
        this.data = {
            /**
             * the components of the action row
             * @type {array}
             * @private
             */
            components: [],

            /**
             * the type of the action row
             * @type {number}
             * @private
             */
            type: 1
        };
    }

    /**
     * Add multiple components to the action row
     * @param {array} components
     * @return {ActionRow}
     */
    addComponents(components) {
        if(!components) {
            throw new Error("[Interactions.js => <Modal>.addComponent] Components is required");
        }

        if (!Array.isArray(components)) {
            throw new Error("[Interactions.js => <ActionRow>.addComponents] The components must be an array");
        }

        if (this.data.components.length >= 5) {
            throw new Error("[Interactions.js => <ActionRow>.addComponents] This action row already has 5 components");
        }

        if(components.length > 5) {
            throw new Error("[Interactions.js => <ActionRow>.addComponents] You can only add 5 components at once");
        }

        if (this.data.components.length + components.length > 5) {
            throw new Error("[Interactions.js => <ActionRow>.addComponents] This action row already has 5 components");
        }

        this.data.components = this.data.components.concat(components.map(c => c?.data ? c.toJSON() : c));
        return this;
    }

    /**
     * Add a component to the action row
     * @param {object} component
     * @return {ActionRow}
     */
    addComponent(component) {
        if(!component) {
            throw new Error("[Interactions.js => <Modal>.addComponent] Component is required");
        }

        if (this.data.components.length >= 5) {
            throw new Error("[Interactions.js => <ActionRow>.addComponent] This action row already has 5 components");
        }

        if(component instanceof Button || component instanceof SelectMenu || component instanceof TextInput) {
            this.data.components.push(component?.data ? component.toJSON() : component);
            return this;
        } else {
            throw new Error("[Interactions.js => <ActionRow>.addComponent] The component must be an instance of a Button, SelectMenu or a Modal");
        }
    }

    /**
     * Set the components of the action row
     * @param {array} components
     * @return {ActionRow}
     */
    setComponents(components) {
        if (!Array.isArray(components)) {
            throw new Error("[Interactions.js => <ActionRow>.setComponents] The components must be an array");
        }

        if(components.length > 5) {
            throw new Error("[Interactions.js => <ActionRow>.setComponents] You can only add 5 components at once");
        }

        this.data.components = components.map(c => c?.data ? c.toJSON() : c);
        return this;
    }

    /**
     * return the action row as json
     * @return {Object} The action row as json
     * @private
     */
    toJSON() {
        return { ...this.data };
    }
}

module.exports = ActionRow;
