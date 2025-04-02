import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postClient } from "../lib/Clients";
import { GetPostRequest } from "../proto/post/rpc_get_post";
import { UpdatePostRequest } from "../proto/post/rpc_update_post";
import { PostWithUsername } from "../proto/post/post";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostWithUsername | null>(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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
      const post = res.response.post;
      if (post) {
        setPost(post);
        setTitle(post.title);
        setShortDesc(post.shortDesc);
        setDescription(post.description);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load post");
    }
  };

  const handleSubmit = async () => {
    try {
      const req: UpdatePostRequest = {
        postId: id!,
        title,
        shortDesc,
        description,
      };

      await postClient.updatePost(req, {
        meta: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      navigate(`/posts/${id}`);
    } catch (err: any) {
      setError(err.message || "Failed to update post");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Loading post...</p>;

  return (
    <div className="edit-post-page">
      <h2>Edit Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Short Description"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
      />
      <textarea
        placeholder="Full Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Save Changes</button>
    </div>
  );
}
