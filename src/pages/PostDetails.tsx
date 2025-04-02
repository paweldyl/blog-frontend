import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { postClient, commentClient } from "../lib/Clients";
import { GetPostRequest } from "../proto/post/rpc_get_post";
import { PostWithUsername } from "../proto/post/post";
import {
  GetPostCommentsRequest,
} from "../proto/comment/rpc_get_post_comments";
import { PublicComment } from "../proto/comment/comment";
import { CreateCommentRequest } from "../proto/comment/rpc_create_comment";
import { postLikeClient } from "../lib/Clients";
import { LikeValue } from "../proto/post_like/post_like";

export default function PostDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostWithUsername | null>(null);
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [commentText, setCommentText] = useState("");
  type LikeState = "like" | "dislike" | null;

  const [likeState, setLikeState] = useState<LikeState>(null);
  const [error, setError] = useState("");

  const [page, setPage] = useState(0);
  const [nextPageExists, setNextPageExists] = useState(false);
  const perPage = 10;

  const fetchPost = async () => {
    try {
      const res = await postClient.getPost(
        { id: id! } as GetPostRequest,
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.response.post) {
        setPost(res.response.post);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load post");
    }
  };

  const fetchComments = async (currentPage: number) => {
    try {
      const res = await commentClient.getPostComments(
        {
          postId: id!,
          perPage,
          page: currentPage,
        } as GetPostCommentsRequest,
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (res.response.comments) {
        setComments((prev) => {
          const all = [...prev, ...res.response.comments];
          const uniqueMap = new Map(all.map((c) => [c.id, c]));
          return Array.from(uniqueMap.values());
        });
        setNextPageExists(res.response.nextPageExists ?? false);
      }
    } catch (err: any) {
      console.error("Failed to fetch comments", err);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
  
    try {
      await commentClient.deleteComment(
        { id: commentId },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      setComments([]);
      setPage(0);
      fetchComments(0);
    } catch (err: any) {
      alert("Failed to delete comment: " + err.message);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const req: CreateCommentRequest = {
        postId: id!,
        text: commentText,
      };

      await commentClient.createComment(req, {
        meta: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setCommentText("");
      setComments([]);
      setPage(0);
      fetchComments(0);
    } catch (err: any) {
      alert("Failed to submit comment: " + err.message);
    }
  };

  const fetchLikeStatus = async () => {
    try {
      const res = await postLikeClient.getPostLike(
        { postId: id! },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
  
      if (res.response.postLike?.value === LikeValue.LIKE) {
        setLikeState("like");
      } else if (res.response.postLike?.value === LikeValue.DISLIKE) {
        setLikeState("dislike");
      }
    } catch (err) {
      setLikeState(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await postClient.deletePost(
        { id: id! },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/");
    } catch (err: any) {
      alert("Failed to delete post: " + err.message);
    }
  };

  const toggleLike = async () => {
    const current = likeState;
  
    if (current === "like") {
      await postLikeClient.deletePostLike(
        { postId: id! },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLikeState(null);
    } else {
      await postLikeClient.putPostLike(
        { postId: id!, value: LikeValue.LIKE },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLikeState("like");
    }
    fetchPost();
  };
  
  const toggleDislike = async () => {
    const current = likeState;
  
    if (current === "dislike") {
      await postLikeClient.deletePostLike(
        { postId: id! },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLikeState(null);
    } else {
      await postLikeClient.putPostLike(
        { postId: id!, value: LikeValue.DISLIKE },
        {
          meta: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setLikeState("dislike");
    }
    fetchPost()
  };

  useEffect(() => {
    fetchPost();
    fetchLikeStatus();
    fetchComments(0);
  }, []);

  const handleShowMoreComments = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchComments(nextPage);
  };

  const isAuthor = post?.userId === localStorage.getItem("user_id");

  if (error) return <p>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="posts-details-page">
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>
        <i>By {post.username}</i>
      </p>
      <div className="likes-section">
        <div className="likes" onClick={toggleLike}>
          <img
            className="like"
            src={likeState === "like" ? "/like-pressed.svg" : "/like.svg"}
            alt="likes"
          />
          <span>{post.likes}</span>
        </div>
        <div className="dislikes" onClick={toggleDislike}>
          <img
            className="dislike"
            src={likeState === "dislike" ? "/dislike-pressed.svg" : "/dislike.svg"}
            alt="dislikes"
          />
          <span>{post.dislikes}</span>
        </div>
      </div>

      {isAuthor && (
        <div style={{ marginTop: "1rem" }}>
          <Link to={`/posts/${post.id}/edit`}>
            <button className="button">Edit</button>
          </Link>
          <button
            onClick={handleDelete}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      )}

      <div className="create-comment-section">
        <h3 className="section-header">Leave a Comment</h3>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment..."
        />
        <br />
        <button onClick={handleCommentSubmit} disabled={!commentText.trim()}>
          Submit
        </button>
      </div>

      <div className="posted-comments">
        <h3 className="comments-header">Comments</h3>
        <div className="comments-list">
          {comments.length === 0 && <p>No comments yet</p>}
            {comments.map((c) => (
              <div className="comment" key={c.id}>
                <div className="comment-header">
                  <div className="username">{c.username}</div>
                  {
                  c.userId === localStorage.getItem("user_id") &&
                  <div className="close-button">
                    <img
                      src="/x.png"
                      alt="Delete comment"
                      className="delete-comment"
                      onClick={() => handleDeleteComment(c.id)}
                    />
                  </div>
                  }
                </div>
                <div className="text">{c.text}</div>
              </div>
            ))}
        </div>
      </div>

      {nextPageExists && (
        <button onClick={handleShowMoreComments} style={{ marginTop: "1rem" }}>
          Show More Comments
        </button>
      )}
    </div>
  );
}