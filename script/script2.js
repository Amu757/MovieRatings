// Gobal variables
let database = []; //movies data
let currentpage = 1; //movies data
let actionwithmovie = "createnew"; //movies data
let updatemovie = null;
let updatemovindex = null;

let paginateStart = 0;
let paginateEnd = 10;
let totalpage = 0;
let srnumStart = 1; // serial number starting
let srnumEnd = 1; //saerial number ending

// Fetching data from local storage
if (localStorage.getItem("database") !== null) {
  database = JSON.parse(localStorage.getItem("database"));
  totalpage = Math.ceil(database.length / 10);
} else {
  console.log("no data in local storage");
}

// to print information
function showtable(tabledata) {
  const tablebody = document.getElementById("tablebody");
  tablebody.innerHTML = "";
  // show acxact same number of rows that of databse length
  tabledata.forEach((movieobj, movieindex) => {
    let row = document.createElement("tr");
    let cells = [];
    // making 7 cell in each row
    for (let i = 0; i < 7; i++) {
      cells[i] = document.createElement("td");
      row.appendChild(cells[i]);
    }
    tablebody.appendChild(row);
    // classes to be added in cells
    let classitem = [
      "index",
      "table-title",
      "table-release",
      "table-generes",
      "table-duration",
      "table-IMDB",
      "table-actions",
    ];
    // insert data into cells
    cells.forEach((td, index) => {
      td.classList.add(classitem[index]);
      switch (index) {
        case 0:
          td.innerHTML = srnumEnd++;
          break;
        case 1:
          td.innerHTML = movieobj.title;
          break;
        case 2:
          td.innerHTML = movieobj.releaseDate;
          break;
        case 3:
          td.innerHTML = movieobj.genres;
          break;
        case 4:
          td.innerHTML = movieobj.duration;
          break;
        case 5:
          td.innerHTML = movieobj.imdbRating;
          break;
        case 6: //actions
          // view details icon
          let eyeicon = document.createElement("i");
          eyeicon.setAttribute("title", "VIEW");
          eyeicon.classList.add("fa-solid");
          eyeicon.classList.add("fa-eye");
          eyeicon.style.color = "#5454fb";
          eyeicon.setAttribute("onclick", "showmodel('modeloverlay')");
          eyeicon.onclick = showMovieDetails.bind(
            this,
            movieobj.id,
            "modeloverlay"
          );
          td.appendChild(eyeicon);

          // edit details icon
          let editicon = document.createElement("i");
          editicon.setAttribute("title", "EDIT");
          editicon.classList.add("fa-regular");
          editicon.classList.add("fa-pen-to-square");
          editicon.style.color = "green";
          editicon.onclick = Editmovie.bind(this, movieobj.id, "addmoviemodal");
          td.appendChild(editicon);
          // bin icon
          let binicon = document.createElement("i");
          binicon.setAttribute("title", "DELETE");
          binicon.classList.add("fa-sharp");
          binicon.classList.add("fa-solid");
          binicon.classList.add("fa-trash");
          binicon.style.color = "#fe5555";
          binicon.onclick = Deletemovie.bind(this, movieobj.id);
          td.appendChild(binicon);
          break;
      }
    });

    document.getElementById("currentpage").innerText = currentpage;
    document.getElementById("totalpage").innerText = totalpage;
    // table styling
    if (movieindex % 2 !== 0) {
      row.style.backgroundColor = "#E4EEF4"; // silver color
    }
  });
}

// icons onclick functions
function showmodel(modal) {
  document.getElementById(modal).style.display = "flex";
}
//switch new movie or old movie
function changeaction() {
  actionwithmovie = "createnew";
}
// close models with id
const closemodel = (modalid) => {
  document.getElementById(modalid).style.display = "none";
  // document.getElementById("addmovieform").reset();
};

// change input type of date field
function datetype() {
  document.getElementById("formrelease").type = "date";
}

//temp object
let newmovie = {};
function createMovie() {
  event.preventDefault(); //prevent form submmission
  newmovie = {
    userRating: [],
  };
  //reading input values
  newmovie.title = document.getElementById("inputTitle").value;
  newmovie.genres = document.getElementById("inputGeneres").value;
  newmovie.actors = document.getElementById("inputActors").value;
  newmovie.imdbRating = document.getElementById("inputImdb").value;
  newmovie.duration = document.getElementById("inputDuration").value;
  newmovie.releaseDate = document.getElementById("formrelease").value;
  newmovie.posterurl = document.getElementById("inputUrl").value;
  newmovie.storyline = document.getElementById("inputStoryline").value;
  if (actionwithmovie === "createnew") {
    if (database.length !== 0) {
      // having previous movies data
      newmovie.id = database[database.length - 1].id + 1;
    } else {
      // if no previous data
      newmovie.id = 1;
    }
    // save to databse object
    database.push(newmovie);
  } else if (actionwithmovie === "updateold") {
    newmovie.id = updatemovie.id;
    database[updatemovindex] = newmovie; // replacing old obj with new
  }
  // save to Local storage
  localStorage.setItem("database", JSON.stringify(database));
  showtable(database.slice(paginateStart, paginateEnd));
  closemodel("addmoviemodal");
}
// show full movie data
function showMovieDetails(id, modalname) {
  showmodel(modalname);
  movindex = database.findIndex((movie, index) => {
    //extract movie to be shown
    return movie.id === id;
  });

  const img = document.querySelector(".image img");
  img.src = database[movindex].posterurl;

  const title = document.getElementById("title");
  const storyline = document.getElementById("storyline");
  const actors = document.getElementById("actors");
  const release = document.getElementById("release");
  const generes = document.getElementById("generes");
  generes.innerHTML = ""; // if enters second time 1st step is to clean previous

  generes.innerHTML = database[movindex].genres.split(",");

  const duration = document.getElementById("duration");
  const imdb = document.getElementById("imdb");
  const average = document.getElementById("average");

  title.innerHTML = database[movindex].title;
  storyline.innerHTML = database[movindex].storyline;
  actors.innerHTML = ""; // if enters second time 1st step is to clean previous

  actors.innerHTML = database[movindex].actors.split(",");

  release.innerHTML = database[movindex].releaseDate;
  duration.innerHTML = database[movindex].duration;
  imdb.innerHTML = database[movindex].imdbRating;
}

function Editmovie(id, modalname) {
  showmodel(modalname);
  actionwithmovie = "updateold";
  updatemovindex = database.findIndex((movie, index) => {
    return movie.id === id;
  });
  updatemovie = database.find((movie, index) => {
    return movie.id === id;
  });

  // show movie data in input fields
  document.getElementById("inputTitle").value = updatemovie.title;
  document.getElementById("inputGeneres").value = updatemovie.genres;
  document.getElementById("inputActors").value = updatemovie.actors;
  document.getElementById("inputImdb").value = updatemovie.imdbRating;
  document.getElementById("inputDuration").value = updatemovie.duration;
  document.getElementById("formrelease").value = updatemovie.releaseDate;
  document.getElementById("inputUrl").value = updatemovie.posterurl;
  document.getElementById("inputStoryline").value = updatemovie.storyline;
}

// deletemovie from database
const Deletemovie = (id) => {
  let movieindex = database.findIndex((movie, index) => {
    return movie.id === id;
  });
  // gets user input for confirmation
  if (confirm("Confirt you want to delete movie !")) {
    database.splice(movieindex, 1); // delete item
    // save to Local storage
    localStorage.setItem("database", JSON.stringify(database));
    showtable(database.slice(paginateStart, paginateEnd));
  }
};

// onclick show prev page data
function prevPage() {
  if (currentpage > 1) {
    srnumStart -= 10;
    srnumEnd = srnumStart;
    currentpage--;
    paginateStart -= 10;
    paginateEnd -= 10;
    showtable(database.slice(paginateStart, paginateEnd));
  }
}
// onclick show next page data
function nextPage() {
  if (currentpage < totalpage) {
    srnumStart = srnumEnd; //last updated value
    currentpage++;
    paginateStart += 10;
    paginateEnd += 10;
    showtable(database.slice(paginateStart, paginateEnd));
  }
}
// ----------x-------------
// page load function calls
showtable(database.slice(paginateStart, paginateEnd));
