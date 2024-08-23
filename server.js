const express = require("express");
const request = require("request");
const crypto = require("crypto");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");

require("dotenv").config();

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const local_redirect_uri = process.env.REACT_APP_RED_URI_LOCAL;
const prod_redirect_uri = process.env.REACT_APP_RED_URI_PROD;

const redirect_uri =
  process.env.NODE_ENV === "production"
    ? prod_redirect_uri
    : local_redirect_uri;

const generateRandomString = (length) =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);

const sessionSecret = generateRandomString(64);

const stateKey = "spotify_auth_state";

const app = express();

app
  .use(express.static(path.join(__dirname, "build")))
  .use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? "https://listening-stats-jn.netlify.app"
          : "http://localhost:3000",
      credentials: true,
    })
  )
  .use(cookieParser());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    },
  })
);

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope =
    "user-read-private user-read-email user-read-playback-state user-top-read user-read-recently-played";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token, refresh_token } = body;
        const options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        request.get(options, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            req.session.userData = body;
            req.session.save((err) => {
              if (err) {
                console.error("Failed to save session:", err);
              }
              res.redirect(
                (process.env.NODE_ENV === "production"
                  ? "https://listening-stats-jn.netlify.app"
                  : "http://localhost:3000") +
                  "/#" +
                  querystring.stringify({
                    access_token,
                    refresh_token,
                  })
              );
            });
          } else {
            res.redirect(
              (process.env.NODE_ENV === "production"
                ? "https://listening-stats-jn.netlify.app"
                : "http://localhost:3000") +
                "/#" +
                querystring.stringify({
                  error: "failed_to_fetch_user_info",
                })
            );
          }
        });
      } else {
        res.redirect(
          (process.env.NODE_ENV === "production"
            ? "https://listening-stats-jn.netlify.app"
            : "http://localhost:3000") +
            "/#" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
});

app.get("/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body;
      res.send({ access_token, refresh_token });
    }
  });
});

app.get("/profile", (req, res) => {
  if (req.session.userData) {
    res.json(req.session.userData);
  } else {
    res.status(404).json({ error: "User data not found" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
