import "./MyProfile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./Authentication";
import Login from "./Login";

const MyProfile = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { loggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8888/profile");
        setAccountData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

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
            {JSON.stringify(accountData?.followers.total)}
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
        <Login page="profile" />
      )}
    </div>
  );
};

export default MyProfile;
