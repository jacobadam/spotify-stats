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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Account Information</h1>
          <p>Display Name: {accountData.display_name}</p>
          <p>Email: {accountData.email}</p>
          <p>
            Profile URL:{" "}
            <a
              href={accountData.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              {accountData.external_urls.spotify}
            </a>
          </p>
          <p>Followers: {JSON.stringify(accountData.followers.total)}</p>
          <p>Country: {accountData.country}</p>
          <p>Plan: {accountData.product}</p>
        </div>
      ) : (
        <Login page="profile" />
      )}
    </div>
  );
};

export default MyProfile;
