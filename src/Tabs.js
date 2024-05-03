import React, { useState } from "react";
import "./Tabs.css";
import SpotifyWebApi from "spotify-web-api-js";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

const spotifyApi = new SpotifyWebApi();

function Tabs() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

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

  function changeTab(event, spotifyStat) {
    if (spotifyStat === "topTracks") {
      getTopTracks();
    }

    if (spotifyStat === "topArtists") {
      getMyTopArtists();
    }

    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(spotifyStat).style.display = "block";
    event.currentTarget.className += "active";
  }

  return (
    <div>
      <div className="tab">
        <button
          className="tablinks"
          onClick={(event) => changeTab(event, "topTracks")}
        >
          Get Top Tracks
        </button>

        <button
          className="tablinks"
          onClick={(event) => changeTab(event, "topArtists")}
        >
          Get Top Artists
        </button>
      </div>

      <TopTracks topTracks={topTracks} />
      <TopArtists topArtists={topArtists} />
    </div>
  );
}

export default Tabs;
