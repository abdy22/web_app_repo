import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search(props) {
  const [movieTitle, setMovieTitle] = useState("");
  let options = props.data;

  const onClickSearch = () => {
    props.searchMovie(movieTitle);
    props.showNav(true)
  }

  const navigate = useNavigate();


  return (
    <div className="container">
      <div style={{
        display:"flex"
      }}>
        <div style={{
              flex:1
            }}>
            <Autocomplete size="sm"
              onChange={(event, newValue) => {
                setMovieTitle(newValue);
              }}
              
              options={options.map((option) => option["title"])}
              renderInput={(params) => (
                <TextField {...params} label="Search movies" />
              )}
            />
        </div>

        
        <button onClick={()=>{
          onClickSearch();
          navigate("/moviedata")
          } 
          }className=" btn btn-primary ">Search</button>
        
      </div>
    </div>
  );
}
