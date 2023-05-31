export = ActionRow;
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
declare class ActionRow {
    /**
     * the data of the action row
     * @type {{components: array, type: number}}
     * @private
     */
    private data;
    /**
     * Add multiple components to the action row
     * @param {array} components
     * @return {ActionRow}
     */
    addComponents(components: any[]): ActionRow;
    /**
     * Add a component to the action row
     * @param {object} component
     * @return {ActionRow}
     */
    addComponent(component: object): ActionRow;
    /**
     * Set the components of the action row
     * @param {array} components
     * @return {ActionRow}
     */
    setComponents(components: any[]): ActionRow;
    /**
     * return the action row as json
     * @return {Object} The action row as json
     * @private
     */
    private toJSON;
}
//# sourceMappingURL=ActionRow.d.ts.map