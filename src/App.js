import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const API_URL = "https://www.omdbapi.com/?apikey=de1d8008";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [myOptions, setMyOptions] = useState([]);

  const searchMovies = async (title) => {
    const respone = await fetch(`${API_URL}&s=${title}`);
    const data = await respone.json();
    setMovies(data.Search);
  };

  const dynamicSearch = async (title) => {
      const respone = await fetch(`${API_URL}&s=${title}`);
      const data = await respone.json();
      for (var i = 0; i < data.Search.length; i++) {
        myOptions.push(data.Search[i].Title)
      }
      setMyOptions(myOptions);
  }

  useEffect(() => {
}, []);
  return (
    <div className="App">
      <h1>MovieLand</h1>
      <div className="search">
        <div className="searchbox">
        <input
          placeholder="Search for movies"
          value={search}
          onKeyPress={(e) => e.key === 'Enter' && searchMovies(search)}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          />

      
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(search);
          }}
        />
      </div>
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
