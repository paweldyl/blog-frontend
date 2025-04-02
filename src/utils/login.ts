import { userClient } from "../lib/Clients";
import { LoginUserRequest } from "../proto/user/rpc_login_user";

const loginUser = async (login: string, password: string) => {
    const request: LoginUserRequest = {
      login,
      password,
    };

    const res = await userClient.loginUser(request);
    const access = res.response.accessToken;
    const refresh = res.response.refreshToken;
    const userId = res.response.user!.id;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem(
    "access_token_expires_at",
    res.response.accessTokenExpiresAt?.seconds
        ? (Number(res.response.accessTokenExpiresAt.seconds) * 1000).toString()
        : ""
    );
    localStorage.setItem("user_id", userId);

    window.location.href = "/";
};

export {loginUser}