import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userClient } from "../lib/Clients";

export default function AuthWrapper() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const scheduleRefresh = (expiresAt: number) => {
    const now = Date.now();
    const buffer = 10_000;
    const delay = expiresAt - now - buffer;

    if (delay <= 0) {
      handleLogout();
    } else {
      setTimeout(async () => {
        console.log("refreshed")
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) return handleLogout();

        try {
          const res = await userClient.refreshToken({ refreshToken: refresh });

          localStorage.setItem("access_token", res.response.accessToken);
          if (res.response.accessTokenExpiresAt?.seconds) {
            const newExp = Number(res.response.accessTokenExpiresAt.seconds) * 1000;
            localStorage.setItem("access_token_expires_at", newExp.toString());
            scheduleRefresh(newExp);
          }
          console.log("refreshed")
        } catch (err) {
          console.error("Auto-refresh failed", err);
          handleLogout();
        }
      }, delay);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");
    const expiresAtStr = localStorage.getItem("access_token_expires_at");

    if (!access || !refresh || !expiresAtStr) {
      handleLogout();
      return;
    }

    const expiresAt = parseInt(expiresAtStr);
    scheduleRefresh(expiresAt);
    setChecked(true);
  }, []);

  return checked ? <Outlet /> : <p>Checking auth...</p>;
}