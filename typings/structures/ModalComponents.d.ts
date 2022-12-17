export = ModalComponents;
/**
 * Create a formatted Modal Components Object
 * @return {ModalComponents}
 * @example
 * const textInput = interaction.components.getValueById("test"); // returns the field value
 * const textInputTwo = interaction.components.getDataById("testTwo"); // returns the field as object
 */
declare class ModalComponents {
    constructor(components: any);
    /**
     * the interaction components data
     * @type {Array}
     */
    components: any[];
    /**
     * Get a field by id
     * @param {string} id
     * @return {object}
     * @example
     * const textInput = interaction.components.getDataById("textInput"); // returns the field as object
     */
    getDataById(id: string): object;
    /**
     * Get the interaction components value
     * @param {string} id
     * @return {string}
     * @example
     * const textInput = interaction.components.getValueById("textInput"); // returns the field value
     */
    getValueById(id: string): string;
    /**
     * Get the interaction components
     * @return {Array}
     */
    getComponents(): any[];
}
//# sourceMappingURL=ModalComponents.d.ts.map