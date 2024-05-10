import React from "react";
import "./TopTracks.css";

export default function TopTracks({ topTracks }) {
  return (
    <div id="topTracks" className="tabcontent">
      <h3>Top Tracks (last 6 months)</h3>
      {topTracks.length > 0 && (
        <table className="topTracksTable">
          <tbody>
            {topTracks.map((topTrack, i) => (
              <tr className="artistRow" key={topTrack.id}>
                <td className="numberCount">{i + 1}. </td>
                <td className="topTrackArtistImage">
                  <img alt="artist" src={topTrack.album.images[0].url} />
                </td>
                <td className="topTrackDetail">
                  <span className="topTrackArtist">{topTrack.name}</span>
                  <span className="topTrackTitle">
                    {topTrack.artists[0].name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
