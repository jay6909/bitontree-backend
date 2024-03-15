project made using express and react

to register:
https://bitontree-backend.onrender.com/v1/auth/register
req body needs to have email, password: greater than 6 chars

to login:
https://bitontree-backend.onrender.com/v1/auth/login
req body needs to have email, password, upon successful login, server will slimit a bearer token, save it on localStorage or cookie


server requests for movies/ needs auth token recieved when logged in using previous request
get
https://bitontree-backend.onrender.com/v1/movies - will show all movies 
with query params skip & limit you can limit how much data we want from server
https://bitontree-backend.onrender.com/v1/movies/id - will show info on one movie

put
https://bitontree-backend.onrender.com/v1/movies/id - 
body should have {title, year, poster} inorder to change the movie data

delete
https://bitontree-backend.onrender.com/v1/movies/id - will delete the movie id passsed in https://bitontree-backend.onrender.com

post
https://bitontree-backend.onrender.com/v1/movies - will add movie
body should have {title, year, poster} inorder to change the movie data
