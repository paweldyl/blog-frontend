// @generated by protobuf-ts 2.9.6
// @generated from protobuf file "post/rpc_create_post.proto" (package "pb", syntax proto3)
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
import { Post } from "./post";
/**
 * @generated from protobuf message pb.CreatePostRequest
 */
export interface CreatePostRequest {
    /**
     * @generated from protobuf field: string title = 1;
     */
    title: string;
    /**
     * @generated from protobuf field: string short_desc = 2;
     */
    shortDesc: string;
    /**
     * @generated from protobuf field: string description = 3;
     */
    description: string;
}
/**
 * @generated from protobuf message pb.CreatePostResponse
 */
export interface CreatePostResponse {
    /**
     * @generated from protobuf field: pb.Post post = 1;
     */
    post?: Post;
}
// @generated message type with reflection information, may provide speed optimized methods
class CreatePostRequest$Type extends MessageType<CreatePostRequest> {
    constructor() {
        super("pb.CreatePostRequest", [
            { no: 1, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "short_desc", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CreatePostRequest>): CreatePostRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.title = "";
        message.shortDesc = "";
        message.description = "";
        if (value !== undefined)
            reflectionMergePartial<CreatePostRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreatePostRequest): CreatePostRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string title */ 1:
                    message.title = reader.string();
                    break;
                case /* string short_desc */ 2:
                    message.shortDesc = reader.string();
                    break;
                case /* string description */ 3:
                    message.description = reader.string();
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
    internalBinaryWrite(message: CreatePostRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string title = 1; */
        if (message.title !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.title);
        /* string short_desc = 2; */
        if (message.shortDesc !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.shortDesc);
        /* string description = 3; */
        if (message.description !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.description);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.CreatePostRequest
 */
export const CreatePostRequest = new CreatePostRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CreatePostResponse$Type extends MessageType<CreatePostResponse> {
    constructor() {
        super("pb.CreatePostResponse", [
            { no: 1, name: "post", kind: "message", T: () => Post }
        ]);
    }
    create(value?: PartialMessage<CreatePostResponse>): CreatePostResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<CreatePostResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreatePostResponse): CreatePostResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* pb.Post post */ 1:
                    message.post = Post.internalBinaryRead(reader, reader.uint32(), options, message.post);
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
    internalBinaryWrite(message: CreatePostResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* pb.Post post = 1; */
        if (message.post)
            Post.internalBinaryWrite(message.post, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.CreatePostResponse
 */
export const CreatePostResponse = new CreatePostResponse$Type();
