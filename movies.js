document.addEventListener('DOMContentLoaded', function() {
  var movieData = {};

  var dataLoaded = false;

  var urlBase = 'http://www.omdbapi.com/?i=tt12850';

  var moviesTable = document.getElementById('movies-table');
  moviesTable.bgcolor = 'silver';

  function fetchMovie(idx) {
    var currentMovieUrl = urlBase + idx;

    var movieReq = new XMLHttpRequest();
    movieReq.open('GET', currentMovieUrl);
    movieReq.send();

    movieReq.onreadystatechange = function() {
      if (movieReq.status === 200 && movieReq.readyState === XMLHttpRequest.DONE) {
        var movie = JSON.parse(movieReq.response);

        if (movie.Title) {
          movieData[movie.Title] = movie;
        }

        if (idx === 96) {
          dataLoaded = true;
          Object.keys(movieData).forEach(function(movie, id) {
            var newDataRow = document.createElement('tr');
            var newTitle = document.createElement('td');
            var newYear = document.createElement('td');
            var newGenre = document.createElement('td');

            if (!(movieData[movie].Year)) {
              console.log("this one is undefined ", movie, id);
            }

            newTitle.innerHTML = movie;
            newYear.innerHTML = movieData[movie].Year.slice(0,4);
            newGenre.innerHTML = movieData[movie].Genre;

            [newTitle, newYear, newGenre].forEach(function(tdTag) {
              newDataRow.appendChild(tdTag);
            });

            moviesTable.appendChild(newDataRow);
          })
        }
      }
      else {

      }
    }
  }

  for (var i = 16; i < 97; i++) {
    fetchMovie(i);
  }
  // console.log(movieData);
})
