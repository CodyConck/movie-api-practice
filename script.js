//select elements by ID and assign them to const variables
const searchBox = document.getElementById("movie-search-box");
const resultGrid = document.getElementById("result-grid");

function clearMovieResults() {
  resultGrid.innerHTML = "";
}

// load movies from API
async function fecthMovieData(searchTerm) {
  //console.log(searchTerm);
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page1&apikey=9c901ace`;
  const res = await fetch(`${URL}`);
  const movieData = await res.json();
  //console.log(movieData);
  if (movieData.Response == "True") {
    clearMovieResults();
    displayMovieDetails(movieData.Search);
    //console.log(movieData.Search);
  }
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

async function fetchAdditionalMovieData(imdbID) {
  const res = await fetch(
    `http://www.omdbapi.com/?i=${imdbID}&apikey=9c901ace`
  );
  const data = await res.json();
  return data;
}

async function displayMovieDetails(details) {
  //console.log(details);

  function getPlaceholderText(value, placeholder) {
    return value !== "N/A" && value !== "" ? value : placeholder;
  }

  //loop thru details and create new div to display each movie returned
  for (let i = 0; i < details.length; i++) {
    let display = document.createElement("div");

    let poster = details[i].Poster;
    let genericImageUrl = `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`;
    if (poster === "N/A" || poster === "") {
      poster = genericImageUrl;
    }

    //get imdbID and use that to fetch more movie data
    let imdbID = details[i].imdbID;
    console.log(imdbID);
    try {
      const additionalData = await fetchAdditionalMovieData(imdbID);

      let year = getPlaceholderText(additionalData.Year, "No Year Listed.");
      let rated = getPlaceholderText(additionalData.Rated, "No Rating Listed.");
      let released = getPlaceholderText(
        additionalData.Released,
        "No Release Date Listed."
      );
      let plot = getPlaceholderText(
        additionalData.Plot,
        "No Plot Info Listed."
      );
      let runtime = getPlaceholderText(
        additionalData.Runtime,
        "No Runtime Listed."
      );

      display.classList.add("result-container");

      display.innerHTML = `
        <div class="movie-poster">
          <img src="${poster}" alt="movie poster" />
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${details[i].Title}</h3>
          <ul class="additional-movie-info">
            <li class="Year">Year: ${year}.</li>
            <li class="rated">Rated: ${rated}</li>
            <li class="released">Released: ${released}.</li>
            <li class="runtime">Runtime: ${runtime}</li>
          </ul>
          <h3 class="plot">${plot}</h3>
        </div>
      `;

      resultGrid.appendChild(display);
    } catch (error) {
      console.error(
        `Error fetching additional data for IMDb ID ${imdbID}: ${error}`
      );
    }
  }
}
