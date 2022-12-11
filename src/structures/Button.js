const buttonStyles = require("./ButtonStyles.js");

/**
 * Create a button
 *
 * @example
 * const { ButtonStyles, Button } = require("interactions.js");
 *
 * const button = new Button()
 *  .setStyle(ButtonStyles.Secondary) // Set the style of the button
 *  .setLabel('Button') // Set the label of the button
 *  .setEmoji('🎊') // Set the emoji of the button
 *  .setCustomId('custom') // Set the custom id of the button
 *
 */
class Button {
    constructor() {
        /**
         * the data of the button
         * @type {object}
         * @private
         */
        this.data = {
            /**
             * The type of the button
             * @type {number}
             * @private
             */
            type: 2,

            /**
             * The style of the button
             * @type {number}
             * @private
             */
            style: 1,

            /**
             * The label of the button
             * @type {string | null}
             * @private
             */
            label: null,

            /**
             * The emoji of the button
             * @type {object | null}
             * @private
             */
            emoji: null,

            /**
             * The custom id of the button
             * @type {string | null}
             * @private
             */
            custom_id: null,

            /**
             * The url of the button
             * @type {string | null}
             * @private
             */
            url: null,

            /**
             * The disabled state of the button
             * @type {boolean}
             * @private
             */
            disabled: false
        };
    }

    /**
     * Set the button style
     * @param {number} style
     * @return {Button}
     */
    setStyle(style) {
        if (typeof style !== "number") {
            throw new Error("[Interactions.js => <Button>.setStyle] The style must be a number");
        }

        if (style < 1 || style > 5) {
            throw new Error("[Interactions.js => <Button>.setStyle] The style must be between 1 and 5");
        }

        if(!Object.values(buttonStyles).includes(style)) {
            throw new Error("[Interactions.js => <Button>.setStyle] The style must be a valid style");
        }

        this.data.style = style;
        return this;
    }

    /**
     * Set the button label
     * @param {string} label
     * @return {Button}
     */
    setLabel(label) {
        if (typeof label !== "string") {
            throw new Error("[Interactions.js => <Button>.setLabel] The label must be a string");
        }

        if (label.length > 80) {
            throw new Error("[Interactions.js => <Button>.setLabel] The label must be between 1 and 80 characters");
        }

        this.data.label = label;
        return this;
    }

    /**
     * Set the button emoji
     * @param {object} emoji
     * @return {Button}
     */
    setEmoji(emoji) {
        if (typeof emoji !== "object") {
            throw new Error("[Interactions.js => <Button>.setEmoji] The emoji must be a object");
        }

        if (!emoji.id && !emoji.name) {
            throw new Error("[Interactions.js => <Button>.setEmoji] The emoji must have a id or name");
        }

        if(!emoji.id) emoji.id = null;

        if (emoji.length > 80) {
            throw new Error("[Interactions.js => <Button>.setEmoji] The emoji must be between 1 and 80 characters");
        }

        this.data.emoji = emoji;
        return this;
    }

    /**
     * Set the button custom id
     * @param {string} custom_id
     * @return {Button}
     */
    setCustomId(custom_id) {
        if (typeof custom_id !== "string") {
            throw new Error("[Interactions.js => <Button>.setCustomId] The custom id must be a string");
        }

        if (custom_id.length > 100) {
            throw new Error("[Interactions.js => <Button>.setCustomId] The custom id must be between 1 and 100 characters");
        }

        this.data.custom_id = custom_id;
        return this;
    }

    /**
     * Set the button url
     * @param {string} url
     * @return {Button}
     */
    setURL(url) {
        if (typeof url !== "string") {
            throw new Error("[Interactions.js => <Button>.setURL] The url must be a string");
        }

        if (url.length > 512) {
            throw new Error("[Interactions.js => <Button>.setURL] The url must be between 1 and 512 characters");
        }

        if(!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("discord://")) {
            throw new Error("[Interactions.js => <Button>.setURL] The url must be a valid url (http://, https:// or discord://)");
        }

        this.data.url = url;
        return this;
    }

    /**
     * set the button as disabled or not
     * @param {boolean} disabled
     * @return {Button}
     */
    setDisabled(disabled) {
        if (typeof disabled !== "boolean") {
            throw new Error("[Interactions.js => <Button>.setDisabled] The disabled must be a boolean");
        }

        this.data.disabled = disabled;
        return this;
    }

    /**
     * return the button as json
     * @return {Object} The button as json
     * @private
     */
    toJSON() {
        const data = { ...this.data };

        if(data.style === 5 && data.custom_id) {
            throw new Error("[Interactions.js => <Button>.toJSON] The button style 5 (link) can't have a custom id");
        }

        if(data.style === 5 && !data.url) {
            throw new Error("[Interactions.js => <Button>.toJSON] The button style 5 (link) must have a url");
        }

        if(data.style !== 5 && !data.custom_id) {
            throw new Error("[Interactions.js => <Button>.toJSON] A Button that don't have the style 5 (link) must have a custom id");
        }

        return data;
    }
}

module.exports = Button;
