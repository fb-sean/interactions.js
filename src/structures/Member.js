const User = require("./User.js")


/**
* Create a formated Member Object
* 
* @example
* ```js
* const Member = new Member(MemberData);
* ```
*/
class Member {
    constructor(raw) {
        // Member Data
        this.id = raw?.user?.id ?? null,
        this.avatar = raw?.avatar ?? raw?.user?.avatar ?? null,
        this.communicationDisabledUntil = raw?.communication_disabled_until ?? null,
        this.deaf = raw?.deaf ?? false,
        this.flags = raw?.flags ?? null,
        this.isPending = raw?.is_pending ?? false,
        this.joinedAt = raw?.joined_at ?? null,
        this.muted = raw?.mute ?? false,
        this.nickname = raw?.nick ?? null,
        this.pending = raw?.pending ?? false,
        this.permissions = raw?.permissions ?? null,
        this.premiumSince = raw?.premium_since ?? null,
        this.roles = raw?.roles

        // Import user
        this.user = new User(raw?.user ?? null)
    }

    /**
	* Get the member join date
    */
    joinedAt () {
        return new Date(this.joinedAt);
    }

    /**
	* Get the member avatar
	*/
    avatarURL() {
        return this.avatar ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}.${this.startsWith("a_") ? "gif" : "png"}` : null;
    }
}

module.exports = Member;