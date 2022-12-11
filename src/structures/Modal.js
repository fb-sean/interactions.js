const Button = require("./Button");
const SelectMenu = require("./SelectMenu");
const ActionRow = require("./ActionRow");

/**
 * Create a modal
 *
 * @example
 * const { Modal, TextInput, TextInputTypes } = require("interactions.js");
 *
 * const modal = new Modal()
 *
 */
class Modal {
    constructor() {
        /**
         * the data of the modal
         * @type {object}
         * @private
         */
        this.data = {
            /**
             * The type of the modal
             * @type {number}
             * @private
             */
            type: 4,

            /**
             * The custom id of the modal
             * @type {string | null}
             * @private
             */
            custom_id: null,

            /**
             * The title of the modal
             * @type {string | null}
             * @private
             */
            title: null,

            /**
             * The components of the modal
             * @type {array}
             * @private
             */
            components: [],
        };
    }

    /**
     * set the custom id for the modal
     * @param {string} customId
     * @return {Modal}
     */
    setCustomId(customId) {
        if (typeof customId !== "string") {
            throw new Error("[Interactions.js => <Modal>.setCustomId] Custom id must be a string");
        }

        if(customId.length > 100) {
            throw new Error("[Interactions.js => <Modal>.setCustomId] Custom id must be less than 100 characters");
        }

        this.data.custom_id = customId;
        return this;
    }

    /**
     * set the title of the modal
     * @param {string} title
     * @return {Modal}
     */
    setTitle(title) {
        if (typeof title !== "string") {
            throw new Error("[Interactions.js => <Modal>.setTitle] Title must be a string");
        }

        if(title.length > 80) {
            throw new Error("[Interactions.js => <Modal>.setTitle] Title must be less than 80 characters");
        }

        this.data.title = title;
        return this;
    }

    /**
     * Add a component to the modal
     * @param {object | ActionRow} component
     * @return {Modal}
     */
    addComponent(component) {
        if(!component) {
            throw new Error("[Interactions.js => <Modal>.addComponent] Component is required");
        }

        if (this.data.components.length >= 5) {
            throw new Error("[Interactions.js => <Modal>.addComponent] This action row already has 5 components");
        }

        if(component instanceof ActionRow || (typeof component === "object" && component.type === 1 && component.components)) {
            this.data.components.push(component?.data ? component.toJSON() : component);
            return this;
        } else {
            throw new Error("[Interactions.js => <Modal>.addComponent] The component must be an instance of a ActionRow");
        }
    }

    /**
     * Add an array of components to the modal
     * @param {array} components
     * @return {Modal}
     */
    addComponents(components) {
        if(!components) {
            throw new Error("[Interactions.js => <Modal>.addComponent] Components is required");
        }

        if (!Array.isArray(components)) {
            throw new Error("[Interactions.js => <Modal>.addComponents] The components must be an array");
        }

        if (this.data.components.length >= 5) {
            throw new Error("[Interactions.js => <Modal>.addComponents] This action row already has 5 components");
        }

        if(components.length > 5) {
            throw new Error("[Interactions.js => <Modal>.addComponents] You can only add 5 components at once");
        }

        if (this.data.components.length + components.length > 5) {
            throw new Error("[Interactions.js => <Modal>.addComponents] This action row already has 5 components");
        }

        this.data.components = this.data.components.concat(components.map(c => c?.data ? c.toJSON() : c));
        return this;
    }

    /**
     * Set the components of the modal
     * @param {array} components
     * @return {Modal}
     */
    setComponents(components) {
        if(!components) {
            throw new Error("[Interactions.js => <Modal>.setComponents] Components is required");
        }

        if (!Array.isArray(components)) {
            throw new Error("[Interactions.js => <Modal>.setComponents] The components must be an array");
        }

        if(components.length > 5) {
            throw new Error("[Interactions.js => <Modal>.setComponents] You can only add 5 components at once");
        }

        this.data.components = components.map(c => c?.data ? c.toJSON() : c);
        return this;
    }


    /**
     * return the modal as json
     * @return {object} The modal as json
     * @private
     */
    toJSON() {
        return { ...this.data };
    }
}

module.exports = Modal;
