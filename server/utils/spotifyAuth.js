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
