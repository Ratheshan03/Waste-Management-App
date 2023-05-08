import axios from "axios";

const clientId =
  "15981172972-hh227ar7hgq21q0vqk51kv9qio7es212.apps.googleusercontent.com";

const getAuthUrl = (redirectUri) => {
  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  return authUrl.toString();
};

const exchangeCodeForToken = async (code, redirectUri) => {
  const requestBody = new URLSearchParams();
  requestBody.set("client_id", clientId);
  requestBody.set("code", code);
  requestBody.set("grant_type", "authorization_code");
  requestBody.set("redirect_uri", redirectUri);

  const response = await axios.post(
    "https://oauth2.googleapis.com/token",
    requestBody.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};

const verifyIdToken = async (idToken) => {
  const response = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  return response.data;
};

export { getAuthUrl, exchangeCodeForToken, verifyIdToken };
