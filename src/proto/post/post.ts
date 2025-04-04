// @generated by protobuf-ts 2.9.6
// @generated from protobuf file "post/post.proto" (package "pb", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message pb.Post
 */
export interface Post {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string title = 2;
     */
    title: string;
    /**
     * @generated from protobuf field: string short_desc = 3;
     */
    shortDesc: string;
    /**
     * @generated from protobuf field: string description = 4;
     */
    description: string;
    /**
     * @generated from protobuf field: string user_id = 5;
     */
    userId: string;
    /**
     * @generated from protobuf field: int32 likes = 6;
     */
    likes: number;
    /**
     * @generated from protobuf field: int32 dislikes = 7;
     */
    dislikes: number;
}
/**
 * @generated from protobuf message pb.PostWithUsername
 */
export interface PostWithUsername {
    /**
     * @generated from protobuf field: string id = 1;
     */
    id: string;
    /**
     * @generated from protobuf field: string title = 2;
     */
    title: string;
    /**
     * @generated from protobuf field: string short_desc = 3;
     */
    shortDesc: string;
    /**
     * @generated from protobuf field: string description = 4;
     */
    description: string;
    /**
     * @generated from protobuf field: string user_id = 5;
     */
    userId: string;
    /**
     * @generated from protobuf field: string username = 6;
     */
    username: string;
    /**
     * @generated from protobuf field: int32 likes = 7;
     */
    likes: number;
    /**
     * @generated from protobuf field: int32 dislikes = 8;
     */
    dislikes: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class Post$Type extends MessageType<Post> {
    constructor() {
        super("pb.Post", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "short_desc", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "likes", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 7, name: "dislikes", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<Post>): Post {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = "";
        message.title = "";
        message.shortDesc = "";
        message.description = "";
        message.userId = "";
        message.likes = 0;
        message.dislikes = 0;
        if (value !== undefined)
            reflectionMergePartial<Post>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Post): Post {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string id */ 1:
                    message.id = reader.string();
                    break;
                case /* string title */ 2:
                    message.title = reader.string();
                    break;
                case /* string short_desc */ 3:
                    message.shortDesc = reader.string();
                    break;
                case /* string description */ 4:
                    message.description = reader.string();
                    break;
                case /* string user_id */ 5:
                    message.userId = reader.string();
                    break;
                case /* int32 likes */ 6:
                    message.likes = reader.int32();
                    break;
                case /* int32 dislikes */ 7:
                    message.dislikes = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Post, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string id = 1; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* string title = 2; */
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        /* string short_desc = 3; */
        if (message.shortDesc !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.shortDesc);
        /* string description = 4; */
        if (message.description !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.description);
        /* string user_id = 5; */
        if (message.userId !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.userId);
        /* int32 likes = 6; */
        if (message.likes !== 0)
            writer.tag(6, WireType.Varint).int32(message.likes);
        /* int32 dislikes = 7; */
        if (message.dislikes !== 0)
            writer.tag(7, WireType.Varint).int32(message.dislikes);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.Post
 */
export const Post = new Post$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PostWithUsername$Type extends MessageType<PostWithUsername> {
    constructor() {
        super("pb.PostWithUsername", [
            { no: 1, name: "id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "short_desc", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "user_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 6, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 7, name: "likes", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "dislikes", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<PostWithUsername>): PostWithUsername {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = "";
        message.title = "";
        message.shortDesc = "";
        message.description = "";
        message.userId = "";
        message.username = "";
        message.likes = 0;
        message.dislikes = 0;
        if (value !== undefined)
            reflectionMergePartial<PostWithUsername>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: PostWithUsername): PostWithUsername {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string id */ 1:
                    message.id = reader.string();
                    break;
                case /* string title */ 2:
                    message.title = reader.string();
                    break;
                case /* string short_desc */ 3:
                    message.shortDesc = reader.string();
                    break;
                case /* string description */ 4:
                    message.description = reader.string();
                    break;
                case /* string user_id */ 5:
                    message.userId = reader.string();
                    break;
                case /* string username */ 6:
                    message.username = reader.string();
                    break;
                case /* int32 likes */ 7:
                    message.likes = reader.int32();
                    break;
                case /* int32 dislikes */ 8:
                    message.dislikes = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: PostWithUsername, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string id = 1; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* string title = 2; */
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        /* string short_desc = 3; */
        if (message.shortDesc !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.shortDesc);
        /* string description = 4; */
        if (message.description !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.description);
        /* string user_id = 5; */
        if (message.userId !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.userId);
        /* string username = 6; */
        if (message.username !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.username);
        /* int32 likes = 7; */
        if (message.likes !== 0)
            writer.tag(7, WireType.Varint).int32(message.likes);
        /* int32 dislikes = 8; */
        if (message.dislikes !== 0)
            writer.tag(8, WireType.Varint).int32(message.dislikes);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.PostWithUsername
 */
export const PostWithUsername = new PostWithUsername$Type();
