export = Embed;
/**
 * Create a custom embed
 *
 * @example
 * const { Embed } = require("interactions.js");
 *
 * const embed = new Embed()
 * .setTitle('This is a Title')
 * .setURL('https://github.com/fb-sean/interactions.js')
 * .setColor('#31B505')
 * .setAuthor("This is a Author", null, "https://github.com/fb-sean/interactions.js");
 *
 */
declare class Embed {
    /**
     * The data of this embed
     * @type {{image: Object, thumbnail: Object, color: (string|number), footer: Object, author: Object, description: ?string, title: ?string, fields: Array, url: ?string, timestamp: (number|null)}}
     * @private
     */
    private data;
    /**
     * Sets the title of this embed
     *
     * @param {String} title The title
     * @return {Embed}
     */
    setTitle(title: string): Embed;
    /**
     * Sets the URL of this embed
     *
     * @param {String} url The URL
     * @return {Embed}
     */
    setURL(url: string): Embed;
    /**
     * Sets the color of this embed
     *
     * @param {String} color The color of the embed
     * @return {Embed}
     */
    setColor(color: string): Embed;
    /**
     * Sets the author of this embed
     *
     * @param {String} name The name for the author
     * @param {String} iconUrl The icon url for the author
     * @param {String} url The url for the author
     * @return {Embed}
     */
    setAuthor(name: string, iconUrl: string, url: string): Embed;
    /**
     * Sets the description of this embed
     *
     * @param {String} desc The description
     * @return {Embed}
     */
    setDescription(desc: string): Embed;
    /**
     * Sets the thumbnail of this embed
     *
     * @param {String} url The URL of the thumbnail
     * @return {Embed}
     */
    setThumbnail(url: string): Embed;
    /**
     * Sets the embed's fields
     * You can set a maximum of 25 fields.
     *
     * @param {Array} ArrayOfFields fields The fields to set
     * @return {Embed}
     */
    setFields(ArrayOfFields: any[]): Embed;
    /**
     * Appends fields to the embed
     * You can have a maximum of 25 fields.
     *
     * @example
     * const embed = new Embed()
     *    .addFields(ArrayOfFields);
     *
     * @param {Array} ArrayOfFields fields The fields to add
     * @return {Embed}
     */
    addFields(ArrayOfFields: any[]): Embed;
    /**
     * Add a field to the embed
     *
     * You can have a maximum of 25 fields.
     *
     * @param {String} name The field name
     * @param {String} value The field value
     * @param {Boolean} inline boolean if the embed should be inline
     * @return {Embed}
     */
    addField(name: string, value: string, inline?: boolean): Embed;
    /**
     * Sets the image of this embed
     *
     * @param {String} url The URL of the image
     * @return {Embed}
     */
    setImage(url: string): Embed;
    /**
     * Sets the timestamp of this embed
     *
     * @param {String} timestamp The timestamp or date
     * @return {Embed}
     */
    setTimestamp(timestamp: string): Embed;
    /**
     * Sets the footer of this embed
     *
     * @param {String} text The name for the footer
     * @param {String} iconUrl The iconUrl for the footer
     * @return {Embed}
     */
    setFooter(text: string, iconUrl: string): Embed;
    /**
     * return the embed as json
     * @return {Object} The embed as json
     * @private
     */
    private toJSON;
}
//# sourceMappingURL=Embed.d.ts.map