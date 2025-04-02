import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userClient } from "../lib/Clients";
import { GetUserRequest } from "../proto/user/rpc_get_user";
import { UpdateUserRequest } from "../proto/user/rpc_update_user";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await userClient.getUser(
          { id: userId } as GetUserRequest,
          {
            meta: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        setUsername(res.response.user?.username || "");
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load user");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      const req: UpdateUserRequest = {
        username,
      };

      await userClient.updateUser(req, {
        meta: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to update username");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <input
        placeholder="New username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Update Username</button>
    </div>
  );
}
