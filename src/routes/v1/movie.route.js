const express = require("express");

const auth = require("../../middlewares/auth");

const validate = require("../../middlewares/validate");
const movieValidation = require("../../validations/movie.validation");

const movieController = require("../../controllers/movie.controller");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.filename + "-" + Date.now());
//   },
// });

// const upload = multer({ storage });

const router = express.Router();
router.get("/filter", auth, validate(movieValidation.getFilteredMovies), movieController.getFilteredMovies);

router.get("/:movieId", auth, validate(movieValidation.getMovieById), movieController.getMovieById);

router.get("/", auth, movieController.getMovies);

router.post('/', auth, validate(movieValidation.addMovie), movieController.addMovie);
router.put("/:movieId", auth, validate(movieValidation.updateMovie), movieController.updateMovie);

router.delete('/:movieId',auth, validate(movieValidation.deleteMovie), movieController.deleteMovie);

module.exports = router;
