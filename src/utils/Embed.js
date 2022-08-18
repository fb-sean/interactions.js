class Embed {
    constructor() {
        super();
        this.title = null

    }

    // Functions Placeholder
    setTitle (title) {
        if(!title instanceof String) {
            throw new Error("[Interactions.js => Embed] The Title need to be a String")
        }

        this.title = title.slice(0, 200);
        return this;
    }
}

module.exports = Embed;