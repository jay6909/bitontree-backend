function  escapeRegex(search){
    return search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}
module.exports =escapeRegex;