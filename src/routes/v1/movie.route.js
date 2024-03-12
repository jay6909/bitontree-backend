const express=require('express');
const validate=require('../../middlewares/validate');
const userValidation=require('../../validations/user.validation');
const movieValidation=require('../../validations/movie.validation');

const movieController=require('../../controllers/movie.controller');

const router=express.Router();

router.get("/", movieController.getAllMovies);
router.get('/:movieID', validate(movieValidation.getMovies), movieController.getMovies);

module.exports=router;