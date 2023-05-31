export = UserManager;
/**
 * User Manager to work with Users
 *
 * @param {object} client the Application Client
 * @param {string} id the id of the user
 *
 * @return {UserManager}
 * @example
 * // You can use this way
 * const manager = new UserManager(<Client>);
 * const user = await manager.fetch(userid);
 * console.log(user);
 *
 * // Or this way
 * const manager = new UserManager(<Client>, userid);
 * const user = await manager.fetch();
 * console.log(user);
 *
 */
declare class UserManager {
    constructor(client: any, id: any);
    /**
     * the id of the user
     * @type {string|null}
     */
    id: string | null;
    /**
     * Send a message to the user
     * @param {string | null} userId the user id
     * @param {object} data the message payload
     * @return {Promise<object>}
     */
    sendDM(userId: string | null, data: object): Promise<object>;
    /**
     * Fetch the user from Discord
     * @param {string | null} userId
     * @return {Promise<object>}
     */
    fetch(userId?: string | null): Promise<object>;
}
//# sourceMappingURL=UserManager.d.ts.map