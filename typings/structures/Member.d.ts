export = Member;
/**
 * Create a formatted Member Object
 * @return {User}
 * @example
 * const member = interaction.member; // returns the member object
 * const memberFlags = interaction.member.flags; // returns the member flags
 */
declare class Member {
    constructor(raw: any);
    /**
     * the id of this member
     * @type {number}
     */
    id: number;
    /**
     * the avatar hash of this member
     * @type {string}
     */
    avatar: string;
    /**
     * when the user's timeout will expire and the user will be able to communicate in the guild again, null or a time in the past if the user is not timed out
     * @type {number}
     */
    communicationDisabledUntil: number;
    /**
     * whether the user is deafened in voice channels
     * @type {boolean}
     */
    deaf: boolean;
    /**
     * 	the flags on a user's account
     * @type {number}
     */
    flags: number;
    /**
     * whether the user has not yet passed the guild's Membership Screening requirements
     * @type {boolean}
     */
    isPending: boolean;
    /**
     * 	when the user joined the guild
     * @type {number}
     */
    joinedAt: number;
    /**
     * whether the user is muted in voice channels
     * @type {boolean}
     */
    muted: boolean;
    /**
     * this user's guild nickname
     * @type {string}
     */
    nickname: string;
    /**
     * whether the user has not yet passed the guild's Membership Screening requirements
     * @type {string}
     */
    pending: string;
    /**
     * total permissions of the member in the channel, including overwrites, returned when in the interaction object
     * @type {object}
     */
    permissions: object;
    /**
     * when the user started boosting the guild
     * @type {number}
     */
    premiumSince: number;
    /**
     * array of role object ids
     * @type {array}
     */
    roles: any[];
    /**
     * the avatar url of the member
     * @type {?string}
     */
    avatarURL: string | null;
    /**
     * The date of the member's creation
     * @type {Date}
     */
    joinedAtDate: Date;
}
//# sourceMappingURL=Member.d.ts.map