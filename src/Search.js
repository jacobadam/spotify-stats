import React, { useState } from "react";
import axios from "axios";

function Search(props) {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      params: {
        q: searchKey,
        type: "artist",
      },
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
    });

    setArtists(data.artists.items);
  };
  const renderArtists = () => {
    return artists.map((artist) => console.log(artist.name));
  };

  return (
    <section>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      <div>{renderArtists()}</div>
    </section>
  );
}

export default Search;
