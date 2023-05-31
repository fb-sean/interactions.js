export = User;
/**
 * Create a formatted User Object
 * @return {User}
 * @example
 * const user = interaction.user; // returns the user object
 * const username = interaction.user.username; // returns the username
 */
declare class User {
    constructor(data: any);
    /**
     * the id of this user
     * @type {string}
     */
    id: string;
    /**
     * the avatar hash of this user
     * @type {string}
     */
    avatar: string;
    /**
     * the avatar decoration of this user
     * @type {string}
     */
    avatarDecoration: string;
    /**
     * the discriminator of this user
     * @type {string}
     */
    disc: string;
    /**
     * the tag of this user
     * @type {string}
     */
    tag: string;
    /**
     * the public flags of this user
     * @type {number}
     */
    publicFlags: number;
    /**
     * the username of this user
     * @type {string}
     */
    username: string;
    /**
     * the avatar url of the user
     * @type {?string}
     */
    avatarURL: string | null;
}
//# sourceMappingURL=User.d.ts.map