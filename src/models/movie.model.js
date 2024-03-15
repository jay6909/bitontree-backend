const mongoose=require('mongoose');

const movieSchema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        pubYear:{
            type:Number,
            required:true,
        },
        poster:{
           type:String,
           required:true,
        }
    }
)

/**
 * @typedef Movie
 */
const Movie=mongoose.model("Movie", movieSchema);
module.exports.Movie=Movie;
module.exports = {Movie};
