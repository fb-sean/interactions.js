export = Utils;
/**
 *
 * Utils for the package itself
 */
declare class Utils {
    /**
     * Resolve a color by the input
     *
     * @param {string|number} color The input to resolve the color
     */
    resolveColor(color: string | number): string | number;
    /**
     * Check if the input is an url
     *
     * @param {string} url The string to check
     * @param {Boolean} attachment boolean if it can be an attachment
     */
    checkURL(url: string, attachment?: boolean): boolean;
    /**
     * Do Request to Discord
     *
     * @param {Object} client The Client that makes the request
     * @param {string} endpoint The endpoint to request from
     * @param {{method: string, body: object}} options The fetch options
     * @param {object} headers The headers to send
     * @param {boolean} formData if the body requires data or not
     */
    DiscordRequest(client: any, endpoint: string, options: {
        method: string;
        body: object;
    }, headers?: object, formData?: boolean): Promise<any>;
    /**
     * Creates a middleware.
     *
     * @param client - The current client
     * @param req - The request data
     * @returns The middleware function
     * @private
     */
    private InteractionsMiddleware;
}
//# sourceMappingURL=Utils.d.ts.map