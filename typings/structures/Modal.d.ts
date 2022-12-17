export = Modal;
/**
 * Create a modal
 *
 * @example
 * const { Modal, TextInput, TextInputTypes } = require("interactions.js");
 *
 * const modal = new Modal()
 *
 */
declare class Modal {
    /**
     * the data of the modal
     * @type {object}
     * @private
     */
    private data;
    /**
     * set the custom id for the modal
     * @param {string} customId
     * @return {Modal}
     */
    setCustomId(customId: string): Modal;
    /**
     * set the title of the modal
     * @param {string} title
     * @return {Modal}
     */
    setTitle(title: string): Modal;
    /**
     * Add a component to the modal
     * @param {object | ActionRow} component
     * @return {Modal}
     */
    addComponent(component: object | ActionRow): Modal;
    /**
     * Add an array of components to the modal
     * @param {array} components
     * @return {Modal}
     */
    addComponents(components: any[]): Modal;
    /**
     * Set the components of the modal
     * @param {array} components
     * @return {Modal}
     */
    setComponents(components: any[]): Modal;
    /**
     * return the modal as json
     * @return {object} The modal as json
     * @private
     */
    private toJSON;
}
import ActionRow = require("./ActionRow");
//# sourceMappingURL=Modal.d.ts.map