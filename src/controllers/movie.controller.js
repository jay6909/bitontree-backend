const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { movieService } = require("../services");
const escapeRegex = require("../helpers/fuzzy-search.helper");
const multer = require("multer");

/**
 * Get movie by movieId
 *
 * Example responses:
 * HTTP 200
 * {
 *      "_id": "5f71c1ca04c69a5874e9fd45",
 *      "title": "Shawshank Redemption",
 *      "year":"2016",
 *      "poster": "google.com",
 *      "__v": 0
 * }
 *
 *
 */
const addMovie = catchAsync(async (req, res) => {
    const { title, year, poster } = req.body;
    const movie = await movieService.addMovie(title, year, poster);
    res.status(httpStatus.CREATED).send(movie);
  // const storage=multer.diskStorage({
  //     destination:'../uploads'
  // });
  // const upload=multer({
  //     storage:storage
  // }).any();
  // upload(req, res, function(err){
  //     if(err){
  //         console.log(err);
  //         return res.end('Error');
  //     }
  //     else{
  //         console.log(req.body);
  //         req.files.forEach(function(item){
  //             console.log(item);
  //         })
  //         res.end('Files Uploaded');
  //     }
  // })
  
});
const getMovieById = catchAsync(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.movieId);
  console.log(movie);
  res.status(httpStatus.OK).send(movie);
});

const getFilteredMovies = catchAsync(async (req, res) => {
  const movies = await movieService.getMovies();
  if (req.query.title) {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(req.query.title.toLowerCase())
    );

    res.status(httpStatus.OK).send(filtered);
  } else if (req.query.year) {
    const filtered = movies.filter(
      (movie) => movie.year == req.query.year
    );
    res.status(httpStatus.OK).send(filtered);

    // const movie = await movieService.getMovieByPublishYear(req.query.year);
    // res.status(httpStatus.OK).send(movie);
  }
});

const updateMovie = catchAsync(async (req, res) => {
  const { title, year, poster } = req.body;
  const id=req.params.movieId
  const movie = await movieService.updateMovie(
    id,
    title,
    year,
    poster
  );
  res.status(httpStatus.OK).send(movie);
});

const getMovies = catchAsync(async (req, res) => {
  const {limit, skip}=req.query
  if(limit && skip){
    const movies=await movieService.getLimitMovies(limit, skip);
    return res.status(httpStatus.OK).send({ data: movies });

  }
 else{
  const movies = await movieService.getMovies();
  
  return res.status(httpStatus.OK).send({ data: movies });
 }
});

const deleteMovie = catchAsync(async (req, res) => {
  await movieService.deleteMovie(req.params.movieId);
  res.status(httpStatus.NO_CONTENT).send({ message: "success" });
});

module.exports = {
  getMovieById,
  getMovies,
  addMovie,
  getFilteredMovies,
  updateMovie,
  deleteMovie,
};
