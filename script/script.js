const table = document.getElementById("home-table");
const bodyrows = document.querySelectorAll("tbody tr");

let database; //our movies data

// fetching data form json file
async function getdata() {
  return new Promise((resolve, reject) => {
    let data = new XMLHttpRequest();
    data.onreadystatechange = () => {
      if (data.readyState == 4) {
        if (data.status == 200) {
          resolve(JSON.parse(data.responseText));
        } else {
          reject("connection error..");
        }
      }
    };

    data.open("GET", "moviesdata.json", true);
    data.send();
  });
}

// to print information on data via json file
async function showtable() {
  try {
    database = await getdata();
    // table styling
    bodyrows.forEach((row, index) => {
      if (index % 2 !== 0) {
        //even row
        row.style.backgroundColor = "#E4EEF4"; // silver color
      }

      // printing data
      let cellsInRow = row.getElementsByTagName("td");
      cellsInRow[1].innerHTML = database[index].title;
      cellsInRow[2].innerHTML = database[index].releaseDate;
      database[index].genres.forEach((item, index) => {
        cellsInRow[3].innerHTML += item + " | ";
      });
      cellsInRow[4].innerHTML = database[index].duration;
      cellsInRow[5].innerHTML = database[index].imdbRating;

      let icon = document.createElement("i");
      icon.setAttribute("title", "VIEW");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-eye");
      icon.style.color = "#5454fb";
      icon.setAttribute("onclick", "showmodel('modeloverlay')");
      cellsInRow[6].appendChild(icon);

      icon = document.createElement("i");
      icon.setAttribute("title", "EDIT");
      icon.classList.add("fa-regular");
      icon.classList.add("fa-pen-to-square");
      icon.style.color = "green";
      icon.addEventListener("click", Editmovie);
      cellsInRow[6].appendChild(icon);

      icon = document.createElement("i");
      icon.setAttribute("title", "DELETE");
      icon.classList.add("fa-sharp");
      icon.classList.add("fa-solid");
      icon.classList.add("fa-trash");
      icon.style.color = "#fe5555";
      icon.addEventListener("click", Deletemovie);
      cellsInRow[6].appendChild(icon);
    });
  } catch (error) {
    console.error(error);
  }
}

showtable(); // calling after page load

// icons onclick functions
function showmodel(modalid) {
  document.getElementById(modalid).style.display = "flex";
}

// loading model data with user click
bodyrows.forEach((row, index) => {
  row.addEventListener("click", () => {
    const img = document.querySelector(".image img");
    img.src = database[index].posterurl;

    const title = document.getElementById("title");
    const storyline = document.getElementById("storyline");
    const actors = document.getElementById("actors");
    const release = document.getElementById("release");
    const generes = document.getElementById("generes");
    generes.innerHTML = ""; // if enters second time 1st step is to clean previous

    database[index].genres.forEach((item, index) => {
      generes.innerHTML += item + " | ";
    });

    const duration = document.getElementById("duration");
    const imdb = document.getElementById("imdb");
    const average = document.getElementById("average");

    title.innerHTML = database[index].title;
    storyline.innerHTML = database[index].storyline;
    actors.innerHTML = ""; // if enters second time 1st step is to clean previous

    database[index].actors.forEach((item, index) => {
      actors.innerHTML += item + " | ";
    });

    release.innerHTML = database[index].releaseDate;
    // title.innerHTML = database[index].title;
    duration.innerHTML = database[index].duration;
    imdb.innerHTML = database[index].imdbRating;

    let sum = 0;
    database[index].ratings.forEach((item, index) => {
      sum += item;
    });
    average.innerHTML = sum;
  });
});

const Editmovie = () => {
  console.log("nyet to complete the logic");
};
const Deletemovie = () => {
  console.log("nyet to complete the logic");
};
const closemodel = (modalid) => {
  document.getElementById(modalid).style.display = "none";
};

// changes input type of date field
function datetype() {
  document.getElementById("formrelease").type = "date";
}
