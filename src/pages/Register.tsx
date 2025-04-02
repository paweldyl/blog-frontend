import { useState } from "react";
import { CreateUserRequest } from "../proto/user/rpc_create_user";
import { userClient } from "../lib/Clients";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/login";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const request: CreateUserRequest = {
      username,
      login,
      password,
    };
    console.log("Request:", request);
  
    try {
      const res = await userClient.createUser(request);
  
      if (!res.response) {
        throw new Error("Empty response from server");
      }
  
      loginUser(login, password);
    } catch (err: any) {
      console.error("gRPC error:", err);
      setError(err?.message ?? "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Create Account</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/login">Login</Link>
    </div>
  );
}
