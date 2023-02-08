// const movieSearchBox = document.getElementById("movie-search-box");
const searchBox = document.getElementById("movie-search-box");
const resultGrid = document.getElementById("result-grid");
const searchBtn = document.getElementById("search-btn");

async function fecthMovieData(searchTerm) {
  // console.log(searchTerm);
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page1&apikey=9c901ace`;
  const res = await fetch(`${URL}`);
  const movieData = await res.json();
  //console.log(movieData);
  if (movieData.Response == "True") displayMovieDetails(movieData.Search);
  // console.log(movieData);
}

function findMovies() {
  let searchTerm = searchBox.value.trim();
  // console.log(searchTerm);

  if (searchTerm.length > 0) {
    resultGrid.classList.remove("hide-result-grid");
    fecthMovieData(searchTerm);
  } else {
    resultGrid.classList.add("hide-result-grid");
  }
}

function displayMovieDetails(movies) {
  resultGrid.innerHTML = "";
  for (let index = 0; index < movies.length; index++) {
    let movieDisplay = document.createElement("div");
    // console.log(movieDisplay);
    movieDisplay.dataset.id = movies[index].imdbID;
    movieDisplay.classList.add("result-container");

    movieDisplay.innerHTML = `
    <div class="movie-poster">
             <img src="${movies[index].Poster}" alt="movie poster" />
           </div>
           <div class="movie-info">
             <h3 class="movie-title">${movies[index].Title}</h3>
             <ul class="additional-movie-info">
               <li class="Year">Year: ${movies[index].Year}</li>
             </ul>
          </div>
    `;
    resultGrid.appendChild(movieDisplay);
  }
  loadAdditionalDetails();
}

function loadAdditionalDetails() {
  const searchedMovies = resultGrid.querySelectorAll(".result-container");
  searchedMovies.forEach((movie) => {
    console.log(movie.dataset.id);
    // getting IMDB ID from above but need to work on async func to return additionalDetails below
    async () => {
      searchBox.value = "";
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9c901ace`
      );
      const additionalDetails = await result.json();
      // this is not firing
      console.log(additionalDetails);
    };
  });
}
