import React, { useState } from "react";
import "./Tabs.css";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Tabs() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const getTopTracks = () => {
    spotifyApi.getMyTopTracks().then((response) => {
      const topTracksData = response.items;
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
    event.currentTarget.className += " active";
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

      <div id="topTracks" className="tabcontent">
        <h3>Top Tracks</h3>
        {topTracks.length > 0 && (
          <ul>
            {topTracks.map((topTrack) => (
              <div key={topTrack.id}>
                {topTrack.artists[0].name} - {topTrack.name}
              </div>
            ))}
          </ul>
        )}
      </div>

      <div id="topArtists" className="tabcontent">
        <h3>Top Artists</h3>
        {topArtists.length > 0 && (
          <ul>
            {topArtists.map((topArtist) => (
              <div key={topArtist.id}>{topArtist.name}</div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Tabs;
