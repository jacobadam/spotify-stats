import React from "react";
import "../css/RecentlyPlayed.css";

export default function RecentlyPlayed({ recentlyPlayed }) {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div id="recentlyPlayed" className="tabcontent">
      <h3>Recently Played</h3>
      {recentlyPlayed.length > 0 && (
        <table className="recentlyPlayedTable">
          <thead>
            <tr className="recentlyPlayedTitle">
              <th>Track</th>
              <th>Artist</th>
              <th>Time Played</th>
            </tr>
          </thead>
          <tbody>
            {recentlyPlayed.map((recent, i) => (
              <tr key={`${recent.track.id}-${i}`}>
                <td className="trackName">
                  {i + 1}. {recent.track.name}
                </td>
                <td className="artistName">{recent.track.artists[0].name}</td>
                <td className="timePlayed">
                  {formatTimestamp(recent.played_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
