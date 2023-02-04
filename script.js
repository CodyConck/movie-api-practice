// const movieSearchBox = document.getElementById("movie-search-box");
const searchTerm = document.getElementById("movie-search-box");
const resultGrid = document.getElementById("result-grid");
const searchBtn = document.getElementById("search-btn");

async function fecthMovieData() {
  const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=9c901ace`;
  const res = await fetch(`${URL}`);
  const movieData = await res.json();
  // console.log(movieData);
  if (movieData.Response == "True") updateMovieDetails(movieData);
}

function updateMovieDetails(movies) {
  resultGrid.innerHTML = `
    <div class="movie-poster">
              <img src="${movies.Poster}" alt="movie poster" />
            </div>
            <div class="movie-info">
              <h3 class="movie-title">${movies.Title}</h3>
              <ul class="additional-movie-info">
                <li class="Year">Year: ${movies.Year}</li>
                <li class="rated">Rated: ${movies.Rated}</li>
                <li class="released">Released: ${movies.Released}</li>
              </ul>
            </div>
    
    `;
}

fecthMovieData();

// this works but lets try the btn
// function findMovies() {
//   let searchTerm = movieSearchBox.value.trim();

//   async function loadMovies(searchTerm) {
//     const URL = `https://omdbapi.com/?s=${searchTerm}&page1&apikey=9c901ace`;
//     const response = await fetch(`${URL}`);
//     const data = await response.json();
//     // console.log(data.Search);
//   }
//   loadMovies(searchTerm);
// }
