import React from 'react'
import NavBar from './NavBar'



function DisplayMovieData(props) {
    console.log("Movies from display page: ", props.items);


    const showItem = (item) => {
        return(
            <tr>
                <th>{item["movieId"]}</th>
                <td>{item["tittle"]}</td>
                <td>{item["genres"]}</td>
                <td className='tdList'>
                    <li>{item["links"][0]}</li>
                    <li>{item["links"][1]}</li>
                </td>
                <td>{item["avarageRating"]}</td>
                <td className='tdList'>
                    {item["tags"].map((tag) => (                        <li>{tag}</li>
                    ))}   
                </td>
            </tr>
        )
    }



    
        return (
            
            <div className="container">
                <div className="row">
                    <table className="table table-hover table-striped">
                        <thead  className="thead-light bg-warning">
                            <tr>
                                <th className="displayth" scope="col">
                                    MovieID
                                </th>
                                <th className="displayth" scope="col">
                                    Title
                                </th>

                                <th className="displayth" scope="col">
                                    Genres
                                </th>

                                <th className="displayth" scope="col">
                                    Links
                                </th>

                                <th className="displayth" scope="col">
                                    Average Rating
                                </th>

                                <th className="displayth" scope="col">
                                    Tags
                                </th>
                            </tr>

                        </thead>
                        <tbody>
                            {props.items.map(showItem)}
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        )
    

}

export default DisplayMovieData;