// Require all needed types
const InteractionOptionsType = require("./InteractionOptionsType");

/**
 * Create a formatted Interaction Object
 *
 * @example
 * ```js
 * const Interaction = new Interaction(request, client, response);
 * ```
 * @private
 */
class Interaction {
    constructor(components) {
        /**
         * the interaction components data
         * @type {Array}
         */
        this.components = components ?? null;
    }

    /**
     * Get a field by id
     * @param {string} id
     * @return {object}
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
     * @return {Array}
     */
    getComponents() {
        return this.components;
    }
}

module.exports = Interaction;
