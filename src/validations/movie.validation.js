const Joi=require('joi');

const {objectId}=require('./custom.validation');

const getMovieById={
    params:Joi.object().keys({
        movieId:Joi.string().custom(objectId).required(),
    }),
}
const getFilteredMovies={
    query:Joi.object().keys({
        title:Joi.string(),
        year:Joi.number(),

    }),
}

const addMovie={
    body:Joi.object().keys({
        title: Joi.string().required(),
        year: Joi.number().required(),
        poster:Joi.string().required(), 
    })
};

const updateMovie={
    params:Joi.object().keys({
        movieId:Joi.string().custom(objectId).required(),
    }),
    body:Joi.object().keys({
        title: Joi.string(),
        year: Joi.number(),
        poster:Joi.string(),
    })

}
const deleteMovie={
    params:Joi.object().keys({
        movieId:Joi.string().custom(objectId).required(),
    }),
}
module.exports={
    getMovieById, addMovie,updateMovie, deleteMovie, getFilteredMovies
}