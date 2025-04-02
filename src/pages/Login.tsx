import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/login";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      loginUser(login, password)
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input placeholder="Login" value={login} onChange={(e) => setLogin(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Link to="/register">Register</Link>
    </div>
  );
}