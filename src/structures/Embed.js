const Utils = require("../utils/Utils.js");
const Util = new Utils();

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
class Embed {
    constructor() {
        /**
         * The data of this embed
         * @type {{image: Object, thumbnail: Object, color: (string|number), footer: Object, author: Object, description: ?string, title: ?string, fields: Array, url: ?string, timestamp: (number|null)}}
         * @private
         */
        this.data = {
            /**
             * the id of this user
             * @type {string|number}
             * @private
             */
            color: 0x585858,

            /**
             * the title of the embed
             * @type {?string}
             * @private
             */
            title: null,

            /**
             * the url of the title in the embed
             * @type {?string}
             * @private
             */
            url: null,

            /**
             * the author object in the embed
             * @type {object}
             * @private
             */
            author: {
                name: null,
                icon_url: null,
                url: null
            },

            /**
             * the description of the embed
             * @type {?string}
             * @private
             */
            description: null,

            /**
             * the thumbnail of the embed
             * @type {object}
             * @private
             */
            thumbnail: {
                url: null
            },

            /**
             * An array of fields for the embed
             * @type {array}
             * @private
             */
            fields: [],

            /**
             * the image of the embed
             * @type {object}
             * @private
             */
            image: {
                url: null
            },

            /**
             * the timestamp for the embed
             * @type {number|null}
             * @private
             */
            timestamp: null,

            /**
             * the footer of the embed
             * @type {object}
             * @private
             */
            footer: {
                text: null,
                icon_url: null
            }
        };
    }

    /**
     * Sets the title of this embed
     *
     * @param {String} title The title
     * @return {Embed}
     */
    setTitle(title) {
        if (!title || typeof title != 'string') {
            throw new Error("[Interactions.js => <Embed>.setTitle] The Title need to be a string.");
        }

        this.data.title = title;
        return this;
    }

    /**
     * Sets the URL of this embed
     *
     * @param {String} url The URL
     * @return {Embed}
     */
    setURL(url) {
        if (!Util.checkURL(url)) {
            throw new Error("[Interactions.js => <Embed>.setURL] The URL isn't a valid URL. (Need to start with 'http' or 'https')");
        }

        this.data.url = url;
        return this;
    }

    /**
     * Sets the color of this embed
     *
     * @param {String} color The color of the embed
     * @return {Embed}
     */
    setColor(color) {
        if (!color) {
            throw new Error("[Interactions.js => <Embed>.setColor] You need to provide a color.");
        }

        this.data.color = Util.resolveColor(color);
        return this;
    }

    /**
     * Sets the author of this embed
     *
     * @param {String} name The name for the author
     * @param {String} iconUrl The icon url for the author
     * @param {String} url The url for the author
     * @return {Embed}
     */
    setAuthor(name, iconUrl, url) {
        if (!name || typeof name != 'string') {
            throw new Error("[Interactions.js => <Embed>.setAuthor] The Author Name need to be a String.");
        }

        if (url && !Util.checkURL(url)) {
            throw new Error("[Interactions.js => <Embed>.setAuthor] The Author URL isn't a valid URL. (Need to start with 'http' or 'https')");
        }

        if (iconUrl && !Util.checkURL(iconUrl)) {
            throw new Error("[Interactions.js => <Embed>.setAuthor] The Author Icon URL isn't a valid URL. (Need to start with 'http' or 'https')");
        }

        this.data.author = {
            name: name ?? null,
            icon_url: iconUrl ?? null,
            url: url ?? null,
        };
        return this;
    }

    /**
     * Sets the description of this embed
     *
     * @param {String} desc The description
     * @return {Embed}
     */
    setDescription(desc) {
        if (!desc || typeof desc != 'string') {
            throw new Error("[Interactions.js => <Embed>.setDescription] The Description need to be a String.");
        }

        if (desc.length > 4096) {
            throw new Error("[Interactions.js => <Embed>.setDescription] The Description is too long (4096 is the max length).");
        }

        this.data.description = desc;
        return this;
    }

    /**
     * Sets the thumbnail of this embed
     *
     * @param {String} url The URL of the thumbnail
     * @return {Embed}
     */
    setThumbnail(url) {
        if (!url || !Util.checkURL(url, true)) {
            throw new Error("[Interactions.js => <Embed>.setThumbnail] The Thumbnail isn't a valid Image URL. (Need to start with 'attachment', 'http' or 'https')");
        }

        this.data.thumbnail = {
            url: url,
        };
        return this;
    }

    /**
     * Sets the embed's fields
     * You can set a maximum of 25 fields.
     *
     * @param {Array} ArrayOfFields fields The fields to set
     * @return {Embed}
     */
    setFields(ArrayOfFields) {
        if (!ArrayOfFields || !Array.isArray(ArrayOfFields)) {
            throw new Error("[Interactions.js => <Embed>.setFields] The input need to be an array.");
        }

        if (ArrayOfFields.length >= 25) {
            throw new Error("[Interactions.js => <Embed>.setFields] You try to set an array that is over max fields value. [max 25 fields]");
        }

        const wrongFields = [];
        for (let i = 0; i < ArrayOfFields.length; i++) {
            const field = ArrayOfFields[i];

            let noName = false;
            if (!field?.name || typeof field?.name != 'string') {
                noName = true;
            }

            let noValue = false;
            if (!field?.value || typeof field?.value != 'string') {
                noValue = true;
            }


            if (noValue || noName) {
                wrongFields.push(`${i}`);
            }
        }

        if (wrongFields.length > 0) {
            throw new Error("[Interactions.js => <Embed>.setFields] Found some problems in the Array at postition: " + wrongFields.join(", ") + ".");
        }

        this.data.fields = ArrayOfFields;
        return this;
    }

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
    addFields(ArrayOfFields) {
        if (!ArrayOfFields || !Array.isArray(ArrayOfFields)) {
            throw new Error("[Interactions.js => <Embed>.addFields] The input need to be an array.");
        }

        if (this.data.fields.length >= 25) {
            throw new Error("[Interactions.js => <Embed>.addFields] This embed reached the max value for fields. [max 25 fields]");
        }

        if ((this.data.fields.length + ArrayOfFields.length) >= 25) {
            throw new Error("[Interactions.js => <Embed>.addFields] By adding this array it would go over the max value of fields. [max 25 fields]");
        }

        const wrongFields = [];
        for (let i = 0; i < ArrayOfFields.length; i++) {
            const field = ArrayOfFields[i];

            let noName = false;
            if (!field?.name || typeof field?.name != 'string') {
                noName = true;
            }

            let noValue = false;
            if (!field?.value || typeof field?.value != 'string') {
                noValue = true;
            }

            if (noValue || noName) {
                wrongFields.push(`${i}`);
            }
        }

        if (wrongFields.length > 0) {
            throw new Error("[Interactions.js => <Embed>.addFields] Found some problems in the Array at postition: " + wrongFields.join(", ") + ".");
        }

        this.data.fields = this.data.fields.concat(ArrayOfFields);
        return this;
    }

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
    addField(name, value, inline = false) {
        if (this.data.fields.length >= 25) {
            throw new Error("[Interactions.js => <Embed>.addField] This embed reached the max value for fields. [max 25 fields]");
        }

        if (!name || typeof name != 'string') {
            throw new Error("[Interactions.js => <Embed>.addField] The Field Name need to be a string.");
        }

        if (!value || typeof value != 'string') {
            throw new Error("[Interactions.js => <Embed>.addField] The Field Value need to be a string.");
        }

        this.data.fields = this.data.fields.concat([{
            name,
            value,
            inline
        },]);
        return this;
    }

    /**
     * Sets the image of this embed
     *
     * @param {String} url The URL of the image
     * @return {Embed}
     */
    setImage(url) {
        if (!url || !Util.checkURL(url, true)) {
            throw new Error("[Interactions.js => <Embed>.setImage] The Image isn't a valid Image URL. (Need to start with 'attachment', 'http' or 'https')");
        }

        this.data.image = {
            url: url,
        };
        return this;
    }

    /**
     * Sets the timestamp of this embed
     *
     * @param {String} timestamp The timestamp or date
     * @return {Embed}
     */
    setTimestamp(timestamp) {
        if (!timestamp) timestamp = new Date();

        this.data.timestamp = timestamp ? new Date(timestamp).toISOString() : undefined;
        return this;
    }

    /**
     * Sets the footer of this embed
     *
     * @param {String} name The name for the footer
     * @param {String} iconUrl The iconUrl for the footer
     * @return {Embed}
     */
    setFooter(name, iconUrl) {
        if (!name || typeof name != 'string') {
            throw new Error("[Interactions.js => <Embed>.setFooter] The Author Name need to be a String.");
        }

        if (iconUrl && !Util.checkURL(iconUrl)) {
            throw new Error("[Interactions.js => <Embed>.setFooter] The Author Icon URL isn't a valid URL. (Need to start with 'http' or 'https')");
        }

        this.data.footer = {
            name: name ?? null,
            icon_url: iconUrl ?? null,
        };
        return this;
    }

    /**
     * return the embed as json
     * @return {Object} The embed as json
     * @private
     */
    toJSON() {
        return { ...this.data };
    }
}

module.exports = Embed;
