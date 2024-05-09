import React from "react";

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
        <div className="recentlyPlayedContainer">
          {recentlyPlayed.map((recent, i) => (
            <div className="recentlyPlayedItem" key={recent.track.id}>
              {/* <div className="artistImage">
                <img
                  alt="artist"
                  width="120px"
                  height="120px"
                  src={recent.images[0].url}
                />
              </div> */}
              <div className="trackName">
                {i + 1}. {recent.track.name}
              </div>
              <div className="artistName">{recent.track.artists[0].name}</div>
              <div className="timePlayed">
                {formatTimestamp(recent.played_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
