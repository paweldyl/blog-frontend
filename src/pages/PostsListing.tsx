import { useEffect, useState } from "react";
import { postClient } from "../lib/Clients";
import { GetPostsListingRequest } from "../proto/post/rpc_get_posts_listing";
import { PostWithUsername } from "../proto/post/post";
import { Link } from "react-router-dom";

export default function PostsListingPage() {
  const [posts, setPosts] = useState<PostWithUsername[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [nextPageExists, setNextPageExists] = useState(true);
  const perPage = 10;

  const fetchPosts = async () => {
    try {
      const request: GetPostsListingRequest = {
        perPage,
        page,
      };

      const res = await postClient.getPostsListing(request, {
        meta: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("res: ", res)

      setPosts((prev) => {
        const allPosts = [...prev, ...(res.response.posts || [])];
        const uniqueMap = new Map(allPosts.map((p) => [p.id, p]));
        return Array.from(uniqueMap.values());
      });

      setNextPageExists(res.response.nextPageExists ?? false);
    } catch (err: any) {
      setError(err.message || "Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="posts-listing-page">
      {posts.length === 0 ? (
        <p>Be the first one to create an article!</p>
      ) : (
        <div className="list-section">
          <h2 className="section-header">Latest Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="post-list-item">
              <Link to={`/posts/${post.id}`}>
                <h2 className="post-header">{post.title}</h2>
              </Link>
              <p>{post.shortDesc}</p>
              <small>by {post.username}</small>
            </div>
          ))}
        </div>
      )}

      {nextPageExists && (
        <button onClick={handleShowMore} style={{ marginTop: "1rem" }}>
          Show More Posts
        </button>
      )}
    </div>
  );
}
