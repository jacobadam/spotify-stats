const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("../server/routes/authRoutes");
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const querystring = require("querystring");
const { spotify } = require("./config");

exports.getAuthorizationUrl = (scopes, state) => {
  const params = {
    client_id: spotify.clientId,
    response_type: "code",
    redirect_uri: spotify.redirectUri,
    scope: scopes.join(" "),
    state,
  };

  return `https://accounts.spotify.com/authorize?${querystring.stringify(
    params
  )}`;
};
