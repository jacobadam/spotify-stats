import React from "react";

export default function TopTracks({ topTracks }) {
  return (
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
  );
}
