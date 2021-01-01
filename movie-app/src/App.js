import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import MovieList from './components/MovieList';

import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue]=useState("");

        const getMovieRequest = async () => {
          const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=c11f878b`;

          const response = await fetch(url);
          const responseJson = await response.json();

          if(responseJson.Search){
              setMovies(responseJson.Search);
          }          
        };

        useEffect(()=>{
          getMovieRequest(searchValue);
        },[searchValue]);

        const addFavouriteMovie = (movie) => {
          const newFavouriteList = [...favourites,movie];
          setFavourites(newFavouriteList);
        };

        const removeFavouriteMovie = (movie) => {
          const newFavouriteList = favourites.filter((favourites) => favourites.imdbID !== movie.imdbID)

          setFavourites(newFavouriteList);
        };


  return (
    <div className='container-fluid movie-app'>
  <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
  </div>
  <div className='row'>
        <MovieList movies = {movies}
        handleFavouriteClicks={addFavouriteMovie} favouriteComponent={AddFavourites}/>
  </div> 
  <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
        
  </div>
  <div className='row'>
        <MovieList movies = {favourites}
        handleFavouriteClicks={removeFavouriteMovie} favouriteComponent={RemoveFavourites}/>
  </div> 
  </div>
  );
}

export default App;
