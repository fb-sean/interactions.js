export = Rest;
/**
 * Interactions.js rest handler
 *
 * @example
 * const { Rest } = require("interactions.js");
 *
 * const client = Rest.getRest();
 * @return {Rest} The application
 */
declare class Rest {
    /**
     * the rest object
     * @type {REST}
     * @private
     */
    private static rest;
    /**
     * Get the REST object
     * @type {REST} the rest object
     * @return {REST} the rest object
     */
    static getRest(): REST;
    constructor(options: any);
}
import { REST } from "@discordjs/rest";
//# sourceMappingURL=Rest.d.ts.map