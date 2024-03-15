project made using express and react

to register:
url/v1/auth/register
req body needs to have email, password: greater than 6 chars

to login:
url/v1/auth/login
req body needs to have email, password, upon successful login, server will send a bearer token, save it on localStorage or cookie


server requests for movies/ needs auth token recieved when logged in using previous request
get
url/v1/movies - will show all movies 
with query params start & end you can limit how much data we want from server
url/v1/movies/id - will show info on one movie

put
url/v1/movies/id - 
body should have {title, pubYear, poster} inorder to change the movie data

delete
url/v1/movies/id - will delete the movie id passsed in url

post
url/v1/movies - will add movie
body should have {title, pubYear, poster} inorder to change the movie data
