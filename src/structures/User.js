/**
* Create a formated User Object
* 
* @example
* ```js
* const User = new User(UserData);
* ```
*/
class User {
    constructor(raw) {
        super(raw);

        // Member Data
        this.id = raw?.id ?? null,
        this.avatar = raw?.avatar ?? null
        this.avatarDecoration = raw?.avatar_decoration ?? null,
        this.disc = raw?.discriminator ?? null,
        this.tag = `${raw?.username}#${raw?.discriminator}`,
        this.publicFlags = raw?.public_flags,
        this.username = raw?.username
    }

    /**
	* Get the zser avatar
	*/
    avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.startsWith("a_") ? "gif" : "png"}` : null;
    }
}

module.exports = User;