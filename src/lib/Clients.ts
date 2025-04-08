import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { UserServiceClient } from "../proto/user/service_user.client";
import { PostServiceClient } from "../proto/post/service_post.client";
import { CommentServiceClient } from "../proto/comment/service_comment.client";
import { PostLikeServiceClient } from "../proto/post_like/service_post_like.client";

const transport = new GrpcWebFetchTransport({
	baseUrl: import.meta.env.VITE_BACKEND_URL,
});

const userClient = new UserServiceClient(transport);
const postClient = new PostServiceClient(transport);
const commentClient = new CommentServiceClient(transport);
const postLikeClient = new PostLikeServiceClient(transport);
const examClient = new PostLikeServiceClient(transport);

export { userClient, postClient, commentClient, postLikeClient };
