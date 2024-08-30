import "../css/MyProfile.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "./Authentication";
import Login from "./Login";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

const MyProfile = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loggedIn, spotifyToken } = useAuth();

  useEffect(() => {
    const getMyUserData = async () => {
      try {
        spotifyApi.setAccessToken(spotifyToken);
        const response = await spotifyApi.getMe();
        setAccountData(response);
      } catch (error) {
        if (error.status === 401) {
          setError(new Error("Your session has expired. Please log in again."));
        } else {
          setError(new Error("An error occurred while fetching your profile."));
        }
      } finally {
        setLoading(false);
      }
    };

    getMyUserData();
  }, [spotifyToken]);

  if (loading) return <div className="loading">Loading...</div>;

  if (error) {
    return (
      <div className="error">
        <p> {error.message}</p>
        {!loggedIn && <Login />}
      </div>
    );
  }

  return (
    <div>
      {loggedIn ? (
        <div className="myProfile">
          <h1>Account Information</h1>
          <p className="displayName">
            <strong>
              Display Name:
              <strong />
            </strong>{" "}
            {accountData?.display_name}
          </p>
          <p className="emailAddress">
            <strong>Email:</strong> {accountData?.email}
          </p>
          <p className="profileURL">
            <strong>Profile URL:</strong>{" "}
            <a
              href={accountData?.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {accountData?.external_urls.spotify}
            </a>
          </p>
          <p className="followers">
            <strong>Followers: </strong>
            {accountData?.followers.total}
          </p>
          <p className="country">
            <strong>Country: </strong>
            {accountData?.country}
          </p>
          <p className="planType">
            <strong>Plan: </strong>
            {accountData?.product}
          </p>
          {accountData?.images[0]?.url && (
            <img
              alt="profile"
              className="profilePicture"
              src={accountData?.images[1].url}
            />
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default MyProfile;
