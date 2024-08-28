import React, { useState, useEffect } from "react";
import "../css/Tabs.css";
import SpotifyWebApi from "spotify-web-api-js";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import RecentlyPlayed from "./RecentlyPlayed";

const spotifyApi = new SpotifyWebApi();

function Tabs() {
  const [activeTab, setActiveTab] = useState("topTracks");
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (activeTab === "topTracks") {
      getTopTracks();
    } else if (activeTab === "topArtists") {
      getMyTopArtists();
    } else if (activeTab === "recentlyPlayed") {
      getRecentlyPlayed();
    }
  }, [activeTab]);

  const getTopTracks = () => {
    spotifyApi.getMyTopTracks().then((response) => {
      const topTracksData = response.items;
      for (let i = 0; i < topTracksData.length; i++) {
        if (topTracksData[i].artists.length > 1) {
          let multipleArtists = topTracksData[i].artists;
          let artistName = multipleArtists.map((artists) => {
            return artists.name;
          });
          topTracksData[i].artists[0].name = [...artistName].join(", ");
        }
      }
      setTopTracks(topTracksData);
    });
  };

  const getMyTopArtists = () => {
    spotifyApi.getMyTopArtists().then((response) => {
      const topArtistData = response.items;
      setTopArtists(topArtistData);
    });
  };

  const getRecentlyPlayed = () => {
    spotifyApi.getMyRecentlyPlayedTracks().then((response) => {
      const recentlyPlayed = response.items;
      setRecentlyPlayed(recentlyPlayed);
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab">
        <button
          className={`tablinks ${activeTab === "topTracks" ? "active" : ""}`}
          aria-label="top tracks"
          onClick={() => handleTabChange("topTracks")}
        >
          Top Tracks
        </button>

        <button
          className={`tablinks ${activeTab === "topArtists" ? "active" : ""}`}
          aria-label="top artists"
          onClick={() => handleTabChange("topArtists")}
        >
          Top Artists
        </button>

        <button
          className={`tablinks ${
            activeTab === "recentlyPlayed" ? "active" : ""
          }`}
          aria-label="recently played"
          onClick={() => handleTabChange("recentlyPlayed")}
        >
          Recently Played
        </button>
      </div>

      {activeTab === "topTracks" && <TopTracks topTracks={topTracks} />}
      {activeTab === "topArtists" && <TopArtists topArtists={topArtists} />}
      {activeTab === "recentlyPlayed" && (
        <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
      )}
    </div>
  );
}

export default Tabs;
