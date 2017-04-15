document.addEventListener('DOMContentLoaded', function() {
  var movieData = {};
  var movieTitles = [];
  var words = [];

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
          movieTitles = Object.keys(movieData);
          movieTitles.forEach(function(title) {
            var titleWords = title.split(" ");
            titleWords.forEach(function(word) {
              if (!words.includes(word)) {
                words.push(word);
              }
            })
          })
          // console.log(words);
          setTableData(movieData, moviesTable)
        }
      }
      // else {
      //   console.log("Data unavailable...");
      // }
    }
  }

  for (var i = 16; i < 97; i++) {
    fetchMovie(i);
  }

  var search = document.getElementById('search');

  var dropDown = document.getElementById('drop-down');

  search.onblur = function() {
    dropDown.innerHTML = "";
  }

  search.onkeyup = function(e) {
    if (e.target.value !== '') {
      matches = [];
      matchObject = {};
      movieTitles.forEach(function(movie) {
        if (movie.match(e.target.value)) {
          matchObject[movie] = movieData[movie];
          matches.push(movie);
        }
      })

      setTableData(matchObject, moviesTable);

      // dropDown.innerHTML = "";
      //
      // matches.forEach(function(match) {
      //   var newItem = document.createElement('li');
      //   newItem.innerHTML = match;
      //   dropDown.appendChild(newItem);
      // })
      // console.log(e.target.value);
    }
  }

  // dropDown.addEventListener('click', function(e) {
  //   console.log("clicked on menu");
  // })
  // dropDown.onclick = function(e) {
  //   console.log("search clicked....");
  // }

  // future more general implementation should pass in fields.
  // here fields are hard-coded to details...
  function setTableData(dataObject, tableElement) {
    tableElement.innerHTML = "";
    Object.keys(dataObject).forEach(function(movie, id) {
      var newDataRow = document.createElement('tr');
      var newTitle = document.createElement('td');
      var newYear = document.createElement('td');
      var newGenre = document.createElement('td');

      newTitle.innerHTML = movie;
      newYear.innerHTML = movieData[movie].Year.slice(0,4);
      newGenre.innerHTML = movieData[movie].Genre;

      [newTitle, newYear, newGenre].forEach(function(tdTag) {
        newDataRow.appendChild(tdTag);
      });

      tableElement.appendChild(newDataRow);
    })
  }
})
