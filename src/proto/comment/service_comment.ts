// @generated by protobuf-ts 2.9.6
// @generated from protobuf file "comment/service_comment.proto" (package "pb", syntax proto3)
// tslint:disable
import { Empty } from "../google/protobuf/empty";
import { DeleteCommentRequest } from "./rpc_delete_comment";
import { UpdateCommentResponse } from "./rpc_update_comment";
import { UpdateCommentRequest } from "./rpc_update_comment";
import { GetPostCommentsResponse } from "./rpc_get_post_comments";
import { GetPostCommentsRequest } from "./rpc_get_post_comments";
import { CreateCommentResponse } from "./rpc_create_comment";
import { CreateCommentRequest } from "./rpc_create_comment";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service pb.CommentService
 */
export const CommentService = new ServiceType("pb.CommentService", [
    { name: "CreateComment", options: {}, I: CreateCommentRequest, O: CreateCommentResponse },
    { name: "GetPostComments", options: {}, I: GetPostCommentsRequest, O: GetPostCommentsResponse },
    { name: "UpdateComment", options: {}, I: UpdateCommentRequest, O: UpdateCommentResponse },
    { name: "DeleteComment", options: {}, I: DeleteCommentRequest, O: Empty }
]);
