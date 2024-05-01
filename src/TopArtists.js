import React from "react";

export default function TopArtists({ topArtists }) {
  return (
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
  );
}
