const Joi=require('joi');

const {objectId}=require('./custom.validation');

const getMovies={
    params:Joi.object().keys({
        movieId:Joi.string().custom(objectId),
    }),
}
const addMovie={
    body:Joi.object().keys({
        title: Joi.string().required(),
        pubYear: Joi.number().required(),
        poster:Joi.string().required(),
    })
}

module.exports={
    getMovies, addMovie,
}