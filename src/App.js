import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Search from "./Views/Search";
import DisplayMovieData from "./Views/DisplayMovieData";
import API from "./api/movies";
import useSwr from 'swr'
import NavBar from "./Views/NavBar";



function App() {
  const [movieData, setMovieData] = useState([]);
  const [showNav,setShowNav] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data: result, error } = useSwr('https://moviesearchapidata.herokuapp.com/movies',fetcher);

  const retrieveMovies = async () => {
    const respnse = await API.get("/movies");
    return respnse.data;
  };

  const showorhideNav = (value) => {
    setShowNav(value);
  }

  const processMovieData = async (movieName) => {
    const movieRequest = "/movies?title=".concat(movieName);
    const moviesResponse = await API.get(movieRequest);

    

    if (moviesResponse.status === 200) {
      let movieId = moviesResponse.data[0]["movieId"];
      console.log(movieId);
      let avarageRating = 0.0;
      let tags = [];

      let genre = moviesResponse.data[0]["genres"];
      let links = [];

      const ratingRequest = "/ratings?movieId=".concat(movieId);
      const ratingResponse = await API.get(ratingRequest);

      if (ratingResponse.data.length > 0) {
        console.log("ratings length: ", ratingResponse.data.length);
        let total = 0;
        ratingResponse.data.map((rate) => {
          let r = parseInt(rate["rating"]);
          console.log(typeof r);
          total += r;
        });

        avarageRating = (total / ratingResponse.data.length).toFixed(1);
      }

      const tagsRequest = "/tags?movieId=".concat(movieId);
      const tagsResponse = await API.get(tagsRequest);

      if (tagsResponse.data.length > 0) {
        console.log("Tags: ", tagsResponse.data);

        tagsResponse.data.map((tag) => {
          if (!tags.includes(tag["tag"])) {
            tags.push(tag["tag"]);
          }
        });
      }

      const linksRequest = "/links?movieId=".concat(movieId);
      const linksResponse = await API.get(linksRequest);

      if (linksResponse.data.length > 0) {
        console.log("Links: ", linksResponse.data);
        let imdbId = "http://www.imdb.com/title/".concat(
          linksResponse.data[0]["imdbId"],
          "/"
        );
        let tmdbId = "https://www.themoviedb.org/movie/".concat(
          linksResponse.data[0]["tmdbId"],
          "/"
        );
        links.push(imdbId);
        links.push(tmdbId);
      }

      let entry = {
        movieId: movieId,
        tittle: movieName,
        links: links,
        genres: genre,
        avarageRating: avarageRating,
        tags: tags,
      };

      let data = [];

      data.push(entry);
      setMovieData(data);
    }
  };

                                                                  
  let data = [];
  if ( result ) {
      data = result
          .map((e) => e["title"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter((e) => result[e])
          .map((e) => result[e]);
  }

  return (
    <div className="container">
      { showNav &&
         <div>
            <NavBar hideNav={showorhideNav}/>
          </div>
      }
      
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={<Search data={data} searchMovie={processMovieData} showNav= {showorhideNav} />}
          />
          <Route
            path="/moviedata"
            element={<DisplayMovieData items={movieData} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
