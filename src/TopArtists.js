import React from "react";
import "./TopArtists.css";

export default function TopArtists({ topArtists }) {
  return (
    <div id="topArtists" className="tabcontent">
      <h3>Top Artists (last 6 months)</h3>
      {topArtists.length > 0 && (
        <div className="topArtistContainer">
          {topArtists.map((topArtist, i) => (
            <div className="topArtistItem" key={topArtist.id}>
              <div className="topArtistImage">
                <img alt="artist" src={topArtist.images[0].url} />
              </div>
              <div className="artistName">
                {i + 1}. {topArtist.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
