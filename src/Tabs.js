import React, { useState } from "react";
import "./Tabs.css";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

function Tabs({ loggedIn }) {
  const [topTracks, setTopTracks] = useState([]);

  const getTopTracks = () => {
    spotifyApi.getMyTopTracks().then((response) => {
      const topTracksData = response.items;
      setTopTracks([...topTracksData]);
    });
  };

  function changeTab(event, spotifyStat) {
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(spotifyStat).style.display = "block";
    event.currentTarget.className += " active";
  }

  return (
    loggedIn && (
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
        </div>
      </div>
    )
  );
}

export default Tabs;
