/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export = CacheManager;
/**
 * Create a Cache Manager
 *
 * @param {object} client
 * @return {CacheManager}
 * @private
 */
declare class CacheManager {
    constructor(client: any);
    roles: Map<any, any>;
    channels: Map<any, any>;
    guilds: Map<any, any>;
    users: Map<any, any>;
    members: Map<any, any>;
    setRole(role: any): void;
    setChannel(channel: any): void;
    setGuild(guild: any): void;
    setUser(user: any): void;
    setMember(guildID: any, member: any): void;
    getRole(roleID: any): any;
    getChannel(channelID: any): any;
    getGuild(guildID: any): any;
    getUser(userID: any): any;
    getMember(guildID: any, memberID: any): any;
    deleteRole(roleID: any): void;
    deleteChannel(channelID: any): void;
    deleteGuild(guildID: any): void;
    deleteUser(userID: any): void;
    deleteMember(guildID: any, memberID: any): void;
    buildLoaderArray(): ({
        schema: import("mongoose").Model<{
            roles?: Map<string, {}>;
        }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            roles?: Map<string, {}>;
        }>>;
        cache: Map<any, any>;
        trigger: string;
    } | {
        schema: import("mongoose").Model<{
            channels?: Map<string, {}>;
        }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            channels?: Map<string, {}>;
        }>>;
        cache: Map<any, any>;
        trigger: string;
    } | {
        schema: import("mongoose").Model<{
            guilds?: Map<string, {}>;
        }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            guilds?: Map<string, {}>;
        }>>;
        cache: Map<any, any>;
        trigger: string;
    } | {
        schema: import("mongoose").Model<{
            users?: Map<string, {}>;
        }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            users?: Map<string, {}>;
        }>>;
        cache: Map<any, any>;
        trigger: string;
    } | {
        schema: import("mongoose").Model<{
            members?: Map<string, {}>;
        }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
            members?: Map<string, {}>;
        }>>;
        cache: Map<any, any>;
        trigger: string;
    })[];
    loadCache(): Promise<void>;
}
//# sourceMappingURL=CacheManager.d.ts.map