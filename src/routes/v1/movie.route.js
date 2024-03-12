const express=require('express');
const validate=require('../../middlewares/validate');
const userValidation=require('../../validations/user.validation');
const movieValidation=require('../../validations/movie.validation');

const movieController=require('../../controllers/movie.controller');

const router=express.Router();

router.get("/", movieController.getMovies);
router.get('/:movieID', validate);

module.exports=router;