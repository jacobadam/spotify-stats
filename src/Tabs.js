import React, { useState } from "react";
import "./Tabs.css";
import SpotifyWebApi from "spotify-web-api-js";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";
import RecentlyPlayed from "./RecentlyPlayed";

const spotifyApi = new SpotifyWebApi();

function Tabs() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

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
      setTopTracks([...topTracksData]);
    });
  };

  const getMyTopArtists = () => {
    spotifyApi.getMyTopArtists().then((response) => {
      const topArtistData = response.items;
      setTopArtists([...topArtistData]);
    });
  };

  const getRecentlyPlayed = () => {
    spotifyApi.getMyRecentlyPlayedTracks().then((response) => {
      const recentlyPlayed = response.items;
      setRecentlyPlayed([...recentlyPlayed]);
    });
  };

  function changeTab(event, spotifyStat) {
    if (spotifyStat === "topTracks") {
      getTopTracks();
    }

    if (spotifyStat === "topArtists") {
      getMyTopArtists();
    }

    if (spotifyStat === "recentlyPlayed") {
      getRecentlyPlayed();
    }

    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }

    event.currentTarget.classList.add("active");

    document.getElementById(spotifyStat).style.display = "block";
  }

  return (
    <div>
      <div className="tab">
        <button
          className="tablinks"
          aria-label="top tracks"
          onClick={(event) => changeTab(event, "topTracks")}
        >
          Top Tracks
        </button>

        <button
          className="tablinks"
          aria-label="top artists"
          onClick={(event) => changeTab(event, "topArtists")}
        >
          Top Artists
        </button>
        <button
          className="tablinks"
          aria-label="recently played"
          onClick={(event) => changeTab(event, "recentlyPlayed")}
        >
          Recently Played
        </button>
      </div>

      <TopTracks topTracks={topTracks} />
      <TopArtists topArtists={topArtists} />
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
    </div>
  );
}

export default Tabs;
