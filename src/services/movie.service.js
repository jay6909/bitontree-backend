const httpStatus = require("http-status");
const { Movie, User } = require("../models");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const fs = require("fs");
const path = require("path");


/**
 * @returns {Promise<Movie>}
 */
const getLimitMovies=async(skip, limit)=>{
    // const  skip = Number(skip);
    const movies=await Movie.find().skip(skip).limit(limit).exec()
    return movies

    
}


/**
 * @returns {Promise<Movie>}
 */
const getMovies=async()=>{
    // const  skip = Number(skip);
    try {
        const movies=await Movie.find();
   return movies
        
    } catch (error) {
        console.log(error)
        throw new ApiError(500, error)
    }

    
}
/**
 * @param {title} movie title
 * @param {year} movie publishing year
 * @param {poster} poster image of movie
 * @returns {Promise<Movie>}
 * @throws {ApiError}
 */

const addMovie = async (title, year, poster) => {
//   let movieObj = {
//     title,
//     year,
//     poster: {
//       data: fs.readFileSync(path.join(__dirname + "/uploads/" + filename)),
//       contentType: "image/png",
//     },
//   };
  const movie = await Movie.create({title,year,poster});
  return movie;
};

/**
 * @param {movieId} movie id
 * @param {updateTitle} movie updatedTitle
  * @param {updateyear} movie updateyear
 * @param {updatePoster} movie updatePoster
 * @returns {Promise<Movie>}
 * @throws {ApiError}
 */
const updateMovie=async(movieId,updateTitle, updateyear, updatePoster)=>{
    const movie= await Movie.findById(movieId);
    if(movie){
        if(updateTitle){
            movie.title=updateTitle;
        }
        else if(updateyear){
            movie.year=updateyear;
        }
        else if(updatePoster){
            movie.poster=updatePoster;
        }


        try {
            await movie.save();
            return movie;
        } catch (error) {
            throw new ApiError(500, `internal sever error ${error}`)
        }
         
    }

}


/**
 * @param {movieId} movie id
 * @returns {Promise<Movie>}
 * @throws {ApiError}
 */
const getMovieById=async(movieId)=>{
    console.log(movieId)
    const movie= await Movie.findById(movieId);
    if(!movie) throw new ApiError(httpStatus.NOT_FOUND, "no movies found by that id");
    return movie
}

// const getMovieByTitle=async(movieName)=>{
//     const movie = await Movie.fuzzySearch(movieName);
//     if(!movie) throw new ApiError(httpStatus.NOT_FOUND, "no movie found by that title");

//     return movie
// }

/**
 * not used currently
  * @param {year} movie publishYear
 * @returns {Promise<Movie>}
 * @throws {ApiError}
 */
const getMovieByPublishYear=async(year)=>{
    const movies = await Movie.find({year});
    if(!movies) throw new ApiError(httpStatus.NOT_FOUND, "no movies found published that year");

    return movies
}


/**
 * @param {movieId} movie id
 * @throws {ApiError}
 */
const deleteMovie=async(movieId)=>{
    const movie=await Movie.findById(movieId);
    if(!movie) throw new ApiError(httpStatus.NOT_FOUND,"movie not found");
    await Movie.findByIdAndDelete(movieId);

    return;
}

module.exports={
    addMovie, updateMovie, deleteMovie, getMovies, getMovieById,getLimitMovies
}