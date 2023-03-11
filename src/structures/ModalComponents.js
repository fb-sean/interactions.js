/**
 * Create a formatted Modal Components Object
 * @return {ModalComponents}
 * @example
 * const textInput = interaction.components.getValueById("test"); // returns the field value
 * const textInputTwo = interaction.components.getDataById("testTwo"); // returns the field as object
 */
class ModalComponents {
    constructor(components) {
        /**
         * the interaction components data
         * @type {object[] | array}
         */
        this.components = components ?? null;
    }

    /**
     * Get a field by id
     * @param {string} id
     * @return {object}
     * @example
     * const textInput = interaction.components.getDataById("textInput"); // returns the field as object
     */
    getDataById(id) {
        let data;

        for(let c of this.components) {
            data = c.components.find(field => field.custom_id === id);
            if(data) break;
        }

        return data;
    }

    /**
     * Get the interaction components value
     * @param {string} id
     * @return {string}
     * @example
     * const textInput = interaction.components.getValueById("textInput"); // returns the field value
     */
    getValueById(id) {
        let data;

        for(let c of this.components) {
            data = c.components.find(field => field.custom_id === id);
            if(data) break;
        }

        return data?.value ?? null;
    }

    /**
     * Get the interaction components
     * @return {object[]}
     */
    getComponents() {
        return this.components;
    }
}

module.exports = ModalComponents;
