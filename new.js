//select elements by ID and assign them to const variables
const searchBox = document.getElementById("movie-search-box");
const resultGrid = document.getElementById("result-grid");

// load movies from API
async function fecthMovieData(searchTerm) {
  //console.log(searchTerm);
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page1&apikey=9c901ace`;
  const res = await fetch(`${URL}`);
  const movieData = await res.json();
  //console.log(movieData);
  if (movieData.Response == "True") displayMovieDetails(movieData.Search);
  //console.log(movieData.Search);
}

//trim and store searched term in let variable
function findMovies() {
  let searchTerm = searchBox.value.trim();

  //if theres no searchTerm, hide the result grid
  if (searchTerm.length > 0) {
    resultGrid.classList.remove("hide-result-grid");
    fecthMovieData(searchTerm);
  } else {
    resultGrid.classList.add("hide-result-grid");
  }
}

function displayMovieDetails(details) {
  //console.log(details);
  resultGrid.innerHTML = "";
  for (let i = 0; i < details.length; i++) {
    let display = document.createElement("div");

    //get imdbID and use that to fetch more movie data
    let movieId = details[i].imdbID;
    //console.log(movieId);
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=9c901ace`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        display.classList.add("result-container");

        display.innerHTML = `
          <div class="movie-poster">
          <img src="${data.Poster}" alt="movie poster" />
          </div>
          <div class="movie-info">
          <h3 class="movie-title">${data.Title}</h3>
          <ul class="additional-movie-info">
          <li class="Year">Year: ${data.Year}</li>
          <li class="rated">Rated: ${data.Rated}</li>
          <li class="released">Released: ${data.Released}</li>
          <li class="runtime"> Runtime:${data.Runtime}</li>
          </ul>
          </div>
          `;
        resultGrid.appendChild(display);
      });
  }
}
