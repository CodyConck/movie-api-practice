// 9346343d6766b81b076dfa97f8364b9e

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
  // console.log(movieData.Search);
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
  // console.log(movies);
  resultGrid.innerHTML = "";
  for (let index = 0; index < movies.length; index++) {
    let movieDisplay = document.createElement("div");
    //console.log(movieDisplay);
    movieDisplay.dataset.id = movies[index].imdbID;
    movieDisplay.classList.add("result-container");

    // movieDisplay.innerHTML = `
    // <div class="movie-poster">
    //          <img src="${movies[index].Poster}" alt="movie poster" />
    //        </div>
    //        <div class="movie-info">
    //          <h3 class="movie-title">${movies[index].Title}</h3>
    //          <ul class="additional-movie-info">
    //            <li class="Year">Year: ${movies[index].Year}</li>
    //          </ul>
    //       </div>
    // `;
    resultGrid.appendChild(movieDisplay);
  }
  loadAdditionalDetails();
}

function loadAdditionalDetails() {
  const searchedMovies = resultGrid.querySelectorAll(".result-container");
  // console.log(searchedMovies);
  searchedMovies.forEach(async (movie) => {
    let movieId = movie.dataset.id;
    // console.log(movieId);
    searchBox.value = "";
    const result = await fetch(
      `http://www.omdbapi.com/?i=${movieId}&apikey=9c901ace`
    );
    const moreInfo = await result.json();
    //console.log(moreInfo);
    displayAdditionalDetails(moreInfo);
  });
}

function displayAdditionalDetails(details) {
  // console.log(details);

  resultGrid.innerHTML = "";

  let movieInfoArray = Object.values(details);
  console.log(movieInfoArray.length);
  for (let index = 0; index < movieInfoArray.length; index++) {
    let display = document.createElement("div");
    // console.log(display);
    display.classList.add("result-container");

    resultGrid.appendChild(display);

    resultGrid.innerHTML = `
    <div class="movie-poster">
               <img src="${details.Poster}" alt="movie poster" />
             </div>
             <div class="movie-info">
               <h3 class="movie-title">${details.Title}</h3>
                 <ul class="additional-movie-info">
                   <li class="Year">Year: ${details.Year}</li>
                   <li class="rated">Rated: ${details.Rated}</li>
                   <li class="released">Released: ${details.Released}</li>
                 </ul>
             </div>
    `;
  }
  // {

  //   //console.log(details[title]);
  //   //console.log(`There are ${details[movieKey]} ${movieKey}`);
  //   // let additionalDetails = details[movieKey];
  //   // console.log(additionalDetails);
  //   let finalDisplay = document.createElement("div");
  //   //console.log(finalDisplay);
  //   finalDisplay.dataset.id = details[title];
  //   finalDisplay.classList.add("result-container");

  //   resultGrid.appendChild(finalDisplay);

  //   resultGrid.innerHTML = `
  //   <div class="movie-poster">
  //             <img src="${details.Poster}" alt="movie poster" />
  //           </div>
  //           <div class="movie-info">
  //             <h3 class="movie-title">${details.Title}</h3>
  //               <ul class="additional-movie-info">
  //                 <li class="Year">Year: ${details.Year}</li>
  //                 <li class="rated">Rated: ${details.Rated}</li>
  //                 <li class="released">Released: ${details.Released}</li>
  //               </ul>
  //           </div> `;
  // });
}

// function loadAdditionalDetails() {
//   const searchedMovies = resultGrid.querySelectorAll(".result-container");
//   searchedMovies.forEach((movie) => {
//     //console.log(movie.dataset.id);
//     searchBtn.addEventListener("click", async () => {
//       searchBox.value = "";
//       const result = await fetch(
//         `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9c901ace`
//       );
//       const additionalDetails = await result.json();
//       displayAdditionalDetails(additionalDetails);
//     });
//   });
// }

// function displayAdditionalDetails(details) {
//   resultGrid.innerHTML = `
//   <div class="movie-info">
//   <h3 class="movie-title">${details.Title}</h3>
//   <ul class="additional-movie-info">
//     <li class="rated">Rated: ${details.Rated}</li>
//     <li class="released">Released: ${details.Released}</li>
//   </ul>
// </div>

//   `;
// }
