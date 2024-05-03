import React from "react";
import "./TopTracks.css";

export default function TopTracks({ topTracks }) {
  return (
    <div id="topTracks" className="tabcontent">
      <h3>Top Tracks (last 6 months)</h3>
      {topTracks.length > 0 && (
        <table className="topTracksTable">
          {topTracks.map((topTrack, i) => (
            <tr className="artistRow" key={topTrack.id}>
              <td className="numberCount">{i + 1}. </td>
              <td className="artistImage">
                <img
                  alt="artist"
                  width="50px"
                  src={topTrack.album.images[0].url}
                />
              </td>
              <div className="topTrackDetail">
                <td className="topTrackArtist">{topTrack.name}</td>
                <td className="topTrackTitle">{topTrack.artists[0].name}</td>
              </div>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}
