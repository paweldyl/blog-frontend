import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postClient } from "../lib/Clients";
import { CreatePostRequest } from "../proto/post/rpc_create_post";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const req: CreatePostRequest = {
        title,
        shortDesc,
        description,
      };

      const res = await postClient.createPost(req, {
        meta: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      const createdPostId = res.response.post?.id;
      if (!createdPostId) throw new Error("Missing post ID from response");

      navigate(`/posts/${createdPostId}`);
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    }
  };

  return (
    <div className="create-post-page">
      <h2>Create New Post</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Short Description"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
      />
      <textarea
        placeholder="Full Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
