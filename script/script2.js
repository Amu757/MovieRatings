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
function retrivedata() {
  if (
    localStorage.getItem("database") !== null ||
    localStorage.getItem("database") == false
  ) {
    console.log("cought some data");
    database = JSON.parse(localStorage.getItem("database"));
    totalpage = Math.ceil(database.length / 10);
  } else {
    console.log("no data in local storage");
    // incase no stored data in browser local storage , store data from following
    database = [
      {
        id: "1",
        title: "Baazigar",
        genres: ["Crime", "Drama", "Musical"],
        ratings: [
          4, 3, 5, 8, 5, 5, 3, 10, 9, 8, 5, 9, 10, 5, 8, 9, 1, 1, 5, 7, 7, 10,
          7, 8, 1, 6, 6, 5, 10, 9,
        ],
        duration: "PT175M",
        releaseDate: "1993-11-12",
        storyline:
          "Widowed Madan Chopra lives a very wealthy lifestyle with two daughters, Seema and Priya. His passion is car racing, and realizing that he is not young anymore, has his last race and wins - only to find out that another competitor, Vicky Malhotra, let him win. Madan befriends Vicky, introduces him to Priya and invites him to work for him in Bombay. Vicky and Priya are attracted to each other, much to Madan's delight and he announces their marriage. Before that could happen, Seema kills herself by throwing herself down from the roof of a multi-storied building. While Madan wants to close this case due to embarrassment, Seema meets with her college friend, Police Inspector Karan, and together they begin to unravel a plot that may well end Madan and the lives of others as well.                Written by\nrAjOo (gunwanti@hotmail.com)",
        actors: ["Shah Rukh Khan", "Rakhee Gulzar", "Kajol"],
        imdbRating: 7.8,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc3OTE1MDAxNV5BMl5BanBnXkFtZTgwNjM1NDk5NTE@._V1_SY250_CR0,0,187,250_AL_.jpg",
      },
      {
        id: "2",
        title: "24",
        genres: ["Action", "Romance", "Sci-Fi"],
        ratings: [
          5, 1, 5, 1, 3, 9, 3, 2, 8, 6, 7, 2, 9, 9, 9, 10, 6, 5, 1, 10, 7, 4, 5,
          8, 6, 2, 4, 10, 9, 6,
        ],
        duration: "PT164M",
        releaseDate: "2016-05-06",
        storyline:
          "A Sci-Fi family revenge drama happening between a scientist, his evil brother and the scientist's son, over a time travel gadget.",
        actors: ["Suriya", "Samantha Ruth Prabhu", "Nithya Menon"],
        imdbRating: 8.0,
        posterurl:
          "https://i.pinimg.com/originals/f1/de/0f/f1de0f77581718016cbf82df9a647ce9.jpg",
      },
      {
        id: "3",
        title: "Jodhaa Akbar",
        genres: ["Action", "Adventure", "Biography"],
        ratings: [
          7, 2, 3, 8, 6, 1, 4, 2, 1, 10, 6, 3, 7, 4, 4, 1, 3, 9, 5, 10, 2, 6, 9,
          1, 3, 7, 9, 7, 3, 9,
        ],
        duration: "PT213M",
        releaseDate: "2008-02-15",
        storyline:
          "Jodhaa Akbar is a sixteenth century love story about a marriage of alliance that gave birth to true love between a great Mughal Emperor, Akbar and a Rajput princess, Jodhaa.",
        actors: ["Hrithik Roshan", "Aishwarya Rai Bachchan", "Sonu Sood"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI1ODQ2MDIxMl5BMl5BanBnXkFtZTcwNTc3Mzk1MQ@@._V1_SY361_SX250_AL_.jpg",
      },
      {
        id: "4",
        title: "Wake Up Sid",
        genres: ["Comedy", "Drama", "Romance"],
        ratings: [
          3, 6, 7, 10, 6, 7, 3, 3, 1, 4, 10, 2, 6, 3, 6, 1, 6, 7, 8, 4, 10, 9,
          10, 4, 6, 2, 5, 6, 2, 4,
        ],
        duration: "PT138M",
        releaseDate: "2009-10-02",
        storyline:
          "In Mumbai, Sid Mehra is, in the words of his father, an arrogant, spoiled brat. He lives with a doting mother, subservient brother, and a father ",
        actors: ["Ranbir Kapoor", "Konkona Sen Sharma", "Supriya Pathak"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2NTk2MjU5NV5BMl5BanBnXkFtZTcwNTY0Nzg4Mg@@._V1_SY489_SX324_AL_.jpg",
      },
      {
        id: "5",
        title: "Saala Khadoos",
        genres: ["Action", "Drama", "Sport"],
        ratings: [
          2, 3, 7, 2, 7, 2, 2, 10, 1, 2, 7, 6, 4, 2, 2, 1, 6, 3, 4, 2, 2, 2, 3,
          5, 7, 10, 7, 8, 3, 10,
        ],
        duration: "PT109M",
        releaseDate: "2016-01-29",
        storyline:
          "An under-fire boxing coach, Prabhu is transferred from Hisar in Haryana to Chennai as his bosses at the Boxing Council do not like his disrespectful rule-breaking unconventional ways.",
        actors: ["Madhavan", "Nassar", "Radha Ravi"],
        imdbRating: 7.7,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BM2Q5YmM3YjMtOTE2Mi00MDg5LThkZjctYzUxOWU2ZTM1ZDk4XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_SY334_SX250_AL_.jpg",
      },
      {
        id: "6",
        title: "Qayamat Se Qayamat Tak",
        genres: ["Action", "Drama", "Musical"],
        ratings: [
          5, 2, 10, 3, 2, 5, 8, 1, 4, 5, 3, 6, 9, 8, 9, 9, 8, 4, 10, 2, 1, 1, 5,
          9, 3, 1, 9, 8, 8, 7,
        ],
        duration: "PT162M",
        releaseDate: "1988-03-01",
        storyline:
          "Both Dhanraj Singh and Randhir Singh are two bitter and old time enemies. They faced a disastrous situation when there children, Raj and Rashmi falls deeply in love.",
        actors: ["Aamir Khan", "Juhi Chawla", "Goga Kapoor"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY4MDQyMDUzOF5BMl5BanBnXkFtZTcwMjUyNTAzMQ@@._V1_SY250_SX168_AL_.jpg",
      },
      {
        id: "7",
        title: "Delhi Belly",
        genres: ["Comedy", "Crime", "Drama"],
        ratings: [
          10, 9, 8, 4, 3, 1, 4, 4, 4, 1, 1, 4, 4, 3, 2, 9, 6, 3, 6, 8, 2, 8, 2,
          4, 10, 4, 5, 6, 3, 2,
        ],
        duration: "PT103M",
        releaseDate: "2011-07-01",
        storyline:
          "Delhi-based Sonia agrees to deliver a package for Vladimir Dragunsky and asks her rather unkempt and debt-ridden fianc\u00e9, Tashi Malhotra, to do it for her. Tashi, in turn, asks one of two of his room-mates,",
        actors: ["Imran Khan", "Vir Das", "Kunaal Roy Kapur"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNTI3ODQwNDAzN15BMl5BanBnXkFtZTcwMDg5NDExNg@@._V1_SY360_SX250_AL_.jpg",
      },
      {
        id: "8",
        title: "Magadheera",
        genres: ["Action", "Drama", "Romance"],
        ratings: [
          10, 9, 2, 8, 4, 9, 1, 9, 7, 8, 1, 4, 10, 3, 7, 2, 1, 2, 1, 3, 1, 8, 9,
          4, 1, 9, 10, 9, 10, 9,
        ],
        duration: "PT147M",
        releaseDate: "2009-07-30",
        actors: ["Kajal Aggarwal", "Dev Gill", "Srihari"],
        imdbRating: 7.7,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQxNWE0NjctMzgxZC00NTdlLTkxMWUtNGM1MmRiYjM4ZWIwXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY500_CR0,0,333,500_AL_.jpg",
      },
      {
        id: "9",
        title: "Highway",
        genres: ["Adventure", "Drama", "Romance"],
        ratings: [
          3, 6, 8, 8, 5, 2, 8, 10, 8, 8, 8, 1, 4, 2, 5, 5, 7, 6, 10, 9, 10, 3,
          5, 4, 8, 5, 1, 4, 5, 1,
        ],
        duration: "PT133M",
        releaseDate: "2014-02-21",
        storyline:
          "A city girl - young, full of life - is on the highway at night with her fianc\u00e9. Suddenly, her life is swung away from the brocade and jewelry of marriage to the harsh brutality of abduction. Her life will never be the same again. ",
        actors: ["Alia Bhatt", "Randeep Hooda", "Durgesh Kumar"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE5NjkyNTczM15BMl5BanBnXkFtZTgwNDg4MzE5MDE@._V1_SY500_CR0,0,344,500_AL_.jpg",
      },
      {
        id: "10",
        title: "Aankhen",
        genres: ["Comedy", "Thriller", "Crime"],
        ratings: [
          6, 9, 1, 10, 7, 2, 6, 2, 5, 10, 8, 4, 4, 4, 3, 1, 7, 4, 2, 7, 8, 4, 1,
          10, 10, 1, 1, 4, 1, 1,
        ],
        duration: "PT165M",
        releaseDate: "2002-04-05",
        storyline:
          "Vijay Singh Rajput (Amitabh Bachchan) is a quirky manager of Vilasrao Jefferson Bank. He is extremely strict at work and believes in pushing his workers to the limit. This means that his superiors hold him in high regard for his unblemished reputation and excellent track record. ",
        actors: ["Amitabh Bachchan", "Akshay Kumar", "Sushmita Sen"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BYmE2MTNkYTctN2FjYS00Zjc2LWFiOGQtNzFmZmE4YzM2NmM4XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY500_SX345_AL_.jpg",
      },
      {
        id: "11",
        title: "Rockstar",
        genres: ["Drama", "Music", "Musical"],
        ratings: [
          7, 9, 2, 7, 4, 2, 2, 9, 10, 10, 6, 9, 10, 2, 6, 3, 6, 9, 2, 7, 10, 10,
          4, 9, 2, 9, 9, 2, 6, 10,
        ],
        duration: "PT159M",
        releaseDate: "2011-11-11",
        storyline:
          'The film follows Janardhan Jhakar in a series of flashbacks and flash forwards, how the small collage boy became an international rock sensation "Jordan". To chase his dreams of a rockstar, the wanna-be singer his counseled that music and feelings only come with pain. In the process of which, he meets Heer,',
        actors: ["Ranbir Kapoor", "Nargis Fakhri", "Shammi Kapoor"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BOTc3NzAxMjg4M15BMl5BanBnXkFtZTcwMDc2ODQwNw@@._V1_SY500_SX375_AL_.jpg",
      },
      {
        id: "12",
        title: "Piku",
        genres: ["Comedy", "Drama"],
        ratings: [
          4, 1, 4, 5, 1, 5, 6, 10, 5, 5, 10, 9, 7, 8, 1, 8, 7, 1, 10, 6, 7, 8,
          2, 2, 10, 10, 9, 1, 1, 3,
        ],
        duration: "PT123M",
        releaseDate: "2015-05-08",
        storyline:
          "A quirky comedy about the relationship between a daughter and her aging father, whose eccentricities drive everyone crazy.",
        actors: ["Amitabh Bachchan", "Deepika Padukone", "Irrfan Khan"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwOTMxNjc2OV5BMl5BanBnXkFtZTgwODQ4OTMxNTE@._V1_SY500_SX375_AL_.jpg",
      },
      {
        id: "13",
        title: "Socha Na Tha",
        genres: ["Romance", "Comedy"],
        ratings: [
          6, 7, 4, 3, 4, 8, 6, 1, 7, 1, 3, 7, 1, 6, 8, 6, 5, 10, 5, 2, 8, 8, 5,
          1, 7, 1, 1, 10, 2, 10,
        ],
        duration: "PT137M",
        releaseDate: "2005-03-04",
        storyline:
          "Mr. Oberoi is a wealthy industrialist, and lives a comfortable lifestyle, with this two sons. The elder son is married, and Mr Oberoi wants his second son, Viren, to marry too. He has already selected a bride for him in Aditi Malhotra. Though Viren has always lived in his father and brother's shadows, he is quite romantic at heart,",
        actors: ["Abhay Deol", "Ayesha Takia", "Ayesha Jhulka"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMzMwNDcwNTAyOF5BMl5BanBnXkFtZTcwOTg2ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg",
      },
      {
        id: "14",
        title: "Dil Se..",
        genres: ["Drama", "Romance"],
        ratings: [
          10, 6, 2, 1, 5, 2, 9, 5, 2, 4, 2, 5, 4, 5, 4, 5, 6, 5, 4, 10, 2, 1,
          10, 1, 6, 1, 7, 5, 9, 1,
        ],
        duration: "PT163M",
        releaseDate: "1998-08-21",
        storyline:
          "Amar Varma, a producer for Indian news radio, meets an enigmatic woman at a railroad station and then again at a hill station. He falls in love with her, but the woman, who calls herself Meghna, rejects and leaves him although she seems to be interested. Later, Varma agrees to marry his family's choice, Preeti.",
        actors: ["Shah Rukh Khan", "Manisha Koirala", "Preity Zinta"],
        imdbRating: 7.8,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2NjU4MjkxOF5BMl5BanBnXkFtZTcwMTc3MDYxMQ@@._V1_SY237_CR0,0,165,237_AL_.jpg",
      },
      {
        id: "15",
        title: "Devdas",
        genres: ["Musical", "Romance"],
        ratings: [
          1, 6, 6, 7, 8, 5, 1, 1, 4, 7, 1, 9, 9, 6, 5, 2, 10, 5, 9, 7, 1, 8, 3,
          4, 7, 1, 10, 6, 3, 7,
        ],
        duration: "PT185M",
        releaseDate: "2002-07-12",
        storyline:
          "The son of Zamindar Narayan Mukherjee, Devdas (Shahrukh Khan) was born with a silver spoon in his mouth. He grew up in the lush village of Taj Sonapur, where he spent his childhood, indulged by his lovely playmate Paro (Aishwarya). They grew up sharing a special relationship, in which they existed only to each other.",
        actors: ["Shah Rukh Khan", "Madhuri Dixit", "Aishwarya Rai Bachchan"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BY2QxMGM4Y2QtMGFmMy00ZjZkLWExMWQtNTY1Yjc0MDFjZjY0XkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_SY500_CR0,0,345,500_AL_.jpg",
      },
      {
        id: "26",
        title: "Hum Aapke Hain Koun...!",
        genres: ["Comedy", "Drama", "Musical"],
        ratings: [
          10, 3, 10, 6, 8, 7, 6, 9, 5, 10, 4, 5, 6, 6, 3, 8, 8, 7, 8, 2, 10, 7,
          1, 8, 1, 5, 10, 5, 9, 10,
        ],
        duration: "PT206M",
        releaseDate: "1994-08-05",
        storyline:
          "Prem, a top student, is learning the ropes of business under his elder brother Rajesh and his uncle Kailashnath, a big industrialist. In another town, Nisha is studying computer science and is the darling of her elder sister, Pooja, and her parents, Professor Choudhry and Kamladevi. ",
        actors: ["Madhuri Dixit", "Salman Khan", "Mohnish Bahl"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcwMjk5NDg1Nl5BMl5BanBnXkFtZTgwMjA2NTkwMzE@._V1_SY250_CR0,0,187,250_AL_.jpg",
      },
      {
        id: "27",
        title: "Hum Dil De Chuke Sanam",
        genres: ["Comedy", "Drama", "Musical"],
        ratings: [
          5, 9, 2, 4, 1, 2, 10, 5, 7, 3, 3, 10, 10, 6, 2, 8, 1, 9, 6, 8, 10, 8,
          3, 3, 7, 6, 1, 8, 2, 5,
        ],
        duration: "PT188M",
        releaseDate: "1999-06-18",
        storyline:
          "When Sameer asks for Nandini's hand in marriage her family refuses. They have already chosen a husband for their daughter. Sameer returns to Italy. When Vanraj, Nandini's husband realizes that his new bride has been in love with someone else, he is prepared to sacrifice his love for her and take her to Italy to be reunited with her true love, Sameer.",
        actors: ["Salman Khan", "Ajay Devgn", "Aishwarya Rai Bachchan"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BZWI5ZWMxN2QtNjJmNS00M2EwLTg3ZmUtYzI5ODY3MWM2MzM1XkEyXkFqcGdeQXVyNDk3Mzg2OTc@._V1_SY500_CR0,0,350,500_AL_.jpg",
      },
      {
        id: "28",
        title: "1 - Nenokkadine",
        genres: ["Action", "Musical", "Mystery"],
        ratings: [
          10, 3, 7, 6, 5, 5, 9, 1, 3, 10, 7, 10, 2, 5, 8, 10, 6, 2, 7, 1, 6, 3,
          6, 7, 9, 4, 2, 5, 4, 1,
        ],
        duration: "PT170M",
        releaseDate: "2014-01-10",
        storyline:
          "Gautham (Mahesh Babu) is in search of the identity of his parents who were killed. He faces a psychological disorder which makes the search even more difficult. taking support of sameera(Kriti ) and figuring out ways to get to know what happened in the past makes the story.",
        actors: ["Mahesh Babu", "Kriti Sanon", "Nassar"],
        imdbRating: 8.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNzcwMzkwODE1NF5BMl5BanBnXkFtZTgwNzA1NzAwMTE@._V1_SY350_CR0,0,242,350_AL_.jpg",
      },
      {
        id: "19",
        title: "Jolly LLB 2",
        genres: ["Comedy", "Drama"],
        ratings: [
          5, 3, 1, 9, 2, 4, 10, 1, 8, 8, 6, 7, 6, 8, 3, 10, 10, 7, 10, 7, 8, 6,
          4, 6, 5, 9, 3, 8, 5, 2,
        ],
        duration: "PT137M",
        releaseDate: "2017-02-10",
        storyline:
          "Jolly is a clumsy lawyer who is faced with representing the most critical court case of his career.",
        actors: ["Ram Gopal Bajaj", "Sudhanva Deshpande", "Avijit Dutt"],
        imdbRating: 7.9,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMDY5MzFlYzEtNTg0YS00OGM5LWI1ZDMtZDkxN2Y2OTI1NGUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMjM1NjkwMDI@._V1_SY480_SX360_AL_.jpg",
      },
      {
        id: "20",
        title: "Ghilli",
        genres: ["Action", "Comedy", "Romance"],
        ratings: [
          3, 6, 6, 9, 1, 2, 9, 8, 2, 7, 3, 9, 8, 8, 5, 4, 4, 8, 4, 5, 5, 3, 2,
          7, 4, 8, 6, 8, 7, 8,
        ],
        duration: "PT160M",
        releaseDate: "2004",
        storyline:
          "Muthu Pandi, a village strongman, decides to marry his niece Dhanalakshmi, and begins his quest by eliminating everyone who opposes their union - starting with both her brothers. In desperation, Dhanalakshmi decides to escape from the village, and in the process is unwittingly assisted by a university Kabaddi player Velu.",
        actors: ["Joseph Vijay", "Trisha Krishnan", "Prakash Raj"],
        imdbRating: 7.8,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BYjU2NTY5ODUtMTI3Ni00YTJiLTliN2EtNTRkNWQzODFmNDA3XkEyXkFqcGdeQXVyMjA4NjIzMTA@._V1_SY500_SX375_AL_.jpg",
      },
      {
        id: "21",
        title: "Raanjhanaa",
        genres: ["Drama", "Romance"],
        ratings: [
          3, 10, 7, 3, 1, 3, 8, 5, 4, 7, 3, 7, 4, 6, 6, 7, 3, 3, 4, 4, 10, 4, 4,
          9, 7, 6, 2, 9, 4, 1,
        ],
        duration: "PT140M",
        releaseDate: "2013-06-21",
        actors: ["Dhanush", "Sonam Kapoor", "Mohammed Zeeshan Ayyub"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMjE2MDA3MTQ4MF5BMl5BanBnXkFtZTcwNjE5NjY0OQ@@._V1_SY500_CR0,0,319,500_AL_.jpg",
      },
      {
        id: "22",
        title: "Hungama",
        genres: ["Comedy", "Drama", "Romance"],
        ratings: [
          5, 5, 8, 8, 1, 8, 10, 8, 8, 9, 10, 6, 3, 4, 10, 4, 4, 8, 5, 6, 3, 2,
          3, 2, 8, 5, 8, 10, 6, 8,
        ],
        duration: "PT153M",
        releaseDate: "2003-08-01",
        storyline:
          "The story of a bunch of misfits whose misconception about each others backgrounds end up in a series of chaotic, yet comic outcomes. Aftab and Rimi play two strangers who have to pretend that are a married couple in order to get a place to live. Paresh Rawal plays a rich, yet ground to earth businessman whose business is named after his wife Anjali. Akshaye Khanna plays a young man starting a new business in electronic ware.",
        actors: ["Akshaye Khanna", "Aftab Shivdasani", "Rimi Sen"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA5NTQyMzU1MDBeQTJeQWpwZ15BbWU4MDE5NTY1MTQx._V1_SY250_CR0,0,171,250_AL_.jpg",
      },
      {
        id: "23",
        title: "Rangeela",
        genres: ["Comedy", "Drama", "Musical"],
        ratings: [
          4, 4, 7, 5, 8, 3, 6, 4, 4, 7, 7, 7, 4, 9, 9, 8, 5, 6, 4, 8, 2, 1, 6,
          6, 7, 8, 5, 3, 7, 5,
        ],
        duration: "PT142M",
        releaseDate: "1995-09-08",
        storyline:
          "Mili is a very poor Indian, and like many would like to be rich and famous one day. She wants to be an Indian actress. She is friendly with another poor man named Munna, who she knows from her childhood. One day while she is singing and dancing on the beach, she is approached by a rich and famous movie actor, Raj, who wants her to act in his next movie. Raj has actually fallen in love with Mili and wants to get married to her. Mili finds her dreams coming true when she gets very famous. Will Mili marry Raj and live a life full of wealth and fame forever?",
        actors: ["Jackie Shroff", "Aamir Khan", "Urmila Matondkar"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNDBlMjY5ZjMtNGE3YS00NGUzLWE5ZWQtYTBjNWU1ZmU5MTY0XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY500_CR0,0,354,500_AL_.jpg",
      },
      {
        id: "24",
        title: "Khakee",
        genres: ["Action", "Adventure", "Drama"],
        ratings: [
          3, 6, 5, 6, 7, 6, 7, 8, 10, 4, 3, 5, 8, 1, 7, 10, 8, 3, 8, 6, 10, 3,
          3, 2, 4, 5, 6, 8, 6, 1,
        ],
        duration: "PT174M",
        releaseDate: "2004-01-23",
        storyline:
          "DCP Anant Shrivastav (Amitabh Bachchan) has been assigned the mission to escort terrorist Iqbal Ansari (Atul Kulkarni) from Chandangarh to Mumbai. His terrorist organization are determined to obtain him again. The plan for this is led by Yashwant Angre (Ajay Devgan), a ruthless killer and a former police officer. Anant's team consists of Inspector Shekhar Sachdev (Akshay Kumar), rookie cop Ashwin Gupte (Tusshar Kapoor) and two more inspectors. Soon Mahalakshmi (Aishwarya Rai) joins them as she is the only witness to have seen Yashwant. The team are armed and ready to go but danger lurks everywhere as the terrorist organization are determined to make sure the officers do not make it to Mumbai. The trip turns into survival when the team are attacked at various times. Finally the team make it to an abandoned cottage in the forest but there is a shoot out and the team are heavily outnumbered. Shekhar tries to force an exchange but against Anant's and Ashwin's judgement. Finally Ansari, ...                Written by\ngavin@sunny_deol2009@yahoo.com",
        actors: ["Amitabh Bachchan", "Akshay Kumar", "Ajay Devgn"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3MDE4MDY1Ml5BMl5BanBnXkFtZTcwMzE2ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg",
      },
      {
        id: "25",
        title: "Kaththi",
        genres: ["Action", "Drama"],
        ratings: [
          9, 6, 10, 7, 6, 7, 9, 6, 8, 7, 9, 9, 2, 10, 6, 10, 10, 5, 3, 9, 5, 5,
          1, 5, 2, 2, 8, 1, 4, 6,
        ],
        duration: "PT166M",
        releaseDate: "2014-10-22",
        storyline:
          "A multinational company tries to forcefully take over a village that was once a fertile agricultural land to make way for its commercial projects. Jeevanantham, a Hydrology Grad and probably the most educated person in the village, takes the fight to the MNC and vows to reclaim what's their own. Does he deliver on his promise? Do his efforts bear fruit? - The answers form the crux of this sensitive-issue themed flick.                Written by\nPipingHotViews",
        actors: ["Joseph Vijay", "Samantha Ruth Prabhu", "Neil Nitin Mukesh"],
        imdbRating: 8.0,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BZTJhNGM4ZmMtNGE3My00YWI4LTgzMTQtNDQ2ZmQ4NDVkMjQxXkEyXkFqcGdeQXVyNjcwMjAyMDI@._V1_SY335_CR0,0,269,335_AL_.jpg",
      },
      {
        id: "26",
        title: "Dear Zindagi",
        genres: ["Drama", "Romance"],
        ratings: [
          1, 7, 1, 4, 8, 5, 4, 9, 3, 4, 1, 8, 3, 1, 3, 4, 9, 3, 4, 7, 8, 7, 6,
          9, 1, 3, 10, 4, 2, 10,
        ],
        duration: "PT151M",
        releaseDate: "2016-11-25",
        storyline:
          "This is the story of Kaira, a budding cinematographer in search of perfect life. A chance encounter with Jug, an unconventional thinker, helps her gain new perspective about life. She discovers that happiness is all about finding comfort in life's imperfections.",
        actors: ["Alia Bhatt", "Shah Rukh Khan", "Kunal Kapoor"],
        imdbRating: 8.0,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BZWQzYWI3ZGMtYzgyYy00OWZkLWEwODYtNGNiMTZhODBkNzUyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_SY500_CR0,0,375,500_AL_.jpg",
      },
      {
        id: "27",
        title: "Jaane Tu... Ya Jaane Na",
        genres: ["Comedy", "Drama", "Romance"],
        ratings: [
          8, 9, 1, 2, 1, 7, 8, 2, 8, 2, 4, 6, 3, 6, 3, 5, 1, 1, 1, 1, 5, 3, 5,
          8, 3, 7, 4, 10, 2, 2,
        ],
        duration: "PT155M",
        releaseDate: "2008-07-04",
        storyline:
          "While on the way to the airport, Mala, who Jignesh Patel believes is going to be his future girlfriend, must listen to the romantic overtures of a group who are obsessed with the popular number 'Jaane Tu Ya Jaane Na' from the movie 'Aa Gale Lag Jaa'. The story is about Jai Singh Rathore and Aditi Wadia, two friends who are so close that the Wadias decide to get them married. But both disagree, and decide to seek soul mates for each other. With Aditi's help, Jai meets Meghna, and both fall in love with each other. Jai is introduced to her parents, who also approve of him. Aditi's is then introduced to Sushant Modi, who instantly finds approval, even with her reclusive brother, Amit. Mala anxiously awaits the climax as the story unfolds with many twists and turns.                Written by\nrAjOo (gunwanti@hotmail.com)",
        actors: ["Imran Khan", "Genelia D'Souza", "Manjari Phadnis"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk5NzI2MDkzOF5BMl5BanBnXkFtZTcwODA5NTk5Mw@@._V1_SY250_CR0,0,185,250_AL_.jpg",
      },
      {
        id: "28",
        title: "Madaari",
        genres: ["Adventure", "Crime", "Drama"],
        ratings: [
          9, 2, 4, 10, 10, 3, 3, 10, 7, 5, 9, 8, 10, 4, 8, 3, 3, 4, 7, 4, 1, 9,
          9, 8, 3, 2, 8, 2, 5, 10,
        ],
        duration: "PT133M",
        releaseDate: "2016-07-22",
        storyline:
          "'Madaari' is the story of a common man who sets out to avenge the death of his son caused by rampant corruption in the government. Losing the only family he had brings him to kidnap the home minister's son and bring those responsible to justice.                Written by\nKeith Francis Bacon",
        actors: ["Irrfan Khan", "Jimmy Shergill", "Vishesh Bansal"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BZDFjODM0NDAtNGJkZC00NmRiLWI3NmYtZDFkYmRhYmE4Zjk3XkEyXkFqcGdeQXVyNTIwODMzNjc@._V1_SY500_CR0,0,346,500_AL_.jpg",
      },
      {
        id: "29",
        title: "Peepli (Live)",
        genres: ["Comedy", "Drama"],
        ratings: [
          3, 6, 9, 3, 6, 6, 3, 8, 6, 10, 4, 5, 7, 3, 5, 10, 2, 4, 6, 3, 7, 7, 4,
          2, 4, 6, 4, 10, 7, 5,
        ],
        duration: "PT95M",
        releaseDate: "2010-08-13",
        storyline:
          'In the lead up to state elections in the Indian village of Peepli, two poor farmers, Natha and Budhia, face losing their land over an unpaid bank loan. Desperate, they seek help from an apathetic local politician, who scornfully suggests they commit suicide to benefit from a government program that aids the families of indebted deceased farmers. When a journalist overhears Budhia urge Natha to "do what needs to be done" for the sake of their families, a media frenzy ignites around whether or not Natha will commit suicide.                Written by\nSundance Film Festival',
        actors: ["Omkar Das Manikpuri", "Raghuvir Yadav", "Shalini Vatsa"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTgwMzEzNjYyNl5BMl5BanBnXkFtZTcwOTg1MDI3Mw@@._V1_SX346_CR0,0,346,499_AL_.jpg",
      },
      {
        id: "30",
        title: "Dum Laga Ke Haisha",
        genres: ["Comedy", "Drama", "Romance"],
        ratings: [
          2, 3, 7, 4, 9, 7, 2, 7, 9, 3, 5, 9, 10, 2, 3, 4, 9, 7, 4, 10, 10, 3,
          4, 4, 10, 10, 4, 2, 2, 1,
        ],
        duration: "PT110M",
        releaseDate: "2015-02-27",
        storyline:
          "Prem Prakash Tiwari (Ayushmann Khurrana) listening to Kumar Sanu is the film's opening shot. Set in Haridwar, 1990s, the film captures the nascent feel of the town. Prem owns a cassette shop in the local market. His father is keen to get him hitched and the family goes to a local temple to meet Sandhya (Bhumi Pednekar). B.Ed, waiting for a teaching job, the most visible thing about her is her weight. Coming from a patriarchal cognitive set-up, she doesn't fit the quintessential idea of beautiful. And still, the school drop out Prem must marry her because he is incapable of attaining a girl with 'Juhi-Chawla-level-of-looks.' In an elaborate community-wedding ceremony, Prem and Sandhya get married. Their wedding night is uncomfortable with neither treading towards establishing conjugal relations. Prem has in his own reasons and the girl is naturally shy. Next morning on a call, she announces it to a friend and the whole family finds out.                Written by\nKing Motwani",
        actors: ["Bhumi Pednekar", "Sanjay Mishra", "Ayushmann Khurrana"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg2Njg1OTg4OV5BMl5BanBnXkFtZTgwMjczNzM2NDE@._V1_SY389_SX250_AL_.jpg",
      },
      {
        id: "31",
        title: "Mankatha",
        genres: ["Action", "Comedy", "Crime"],
        ratings: [
          6, 6, 4, 9, 10, 2, 8, 8, 10, 8, 7, 1, 1, 9, 2, 9, 7, 7, 1, 8, 2, 2, 1,
          6, 6, 5, 8, 9, 1, 9,
        ],
        duration: "PT155M",
        releaseDate: "2011-08-31",
        storyline:
          "Mankatha is a racy and adrenaline-rushing story of a Maharashtra police officer Vinayak Mahadevan (Ajith) who is suspended for helping a smuggler to escape from police encounter. He starts leading life in his own way. He falls for Sanjana (Trisha), daughter of an influential local goon Arumuga Chettiyar (Jayaprakash) in Mumbai. A tough cop Prithvi (Arjun) takes charge to end betting scandal in IPL cricket in Mumbai. Arumuga uses his links with dons in Mumbai tries to route through his old theatre, a cash of over Rs 500 crore to be used in betting. Sumanth (Vaibhav), a goon working for Arumuga Chettiyarplans to take away the booty with the help of his friends Ganesh (Ashwin), Mahanth (Mahanth), who owns a bar in Mumbai and Prem (Premji), a IIT graduate. Vinayak joins the race. he promises to help them and divide it between them. Trouble starts after they take away the cash. Both Arumugha Chettiyar and police are now on their heels. Meanwhile, Mahanth and Prem escape with the cash. It ...                Written by\nCaptain",
        actors: ["Ajith Kumar", "Arjun", "Trisha Krishnan"],
        imdbRating: 7.6,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BODAyOTNlMjktZjgxYS00Y2JiLWFiZTAtYjg0MTYyNzg3MjQyXkEyXkFqcGdeQXVyMjYwMDk5NjE@._V1_SY500_CR0,0,312,500_AL_.jpg",
      },
      {
        id: "32",
        title: "Ghajini",
        genres: ["Action", "Drama", "Mystery"],
        ratings: [
          9, 10, 6, 2, 10, 10, 3, 7, 10, 4, 2, 2, 4, 3, 7, 10, 6, 9, 10, 2, 3,
          7, 3, 9, 10, 1, 6, 4, 3, 4,
        ],
        duration: "PT175M",
        releaseDate: "2005-09-29",
        storyline:
          "Spunky and compassionate Kalpana rents an apartment and works as an ad-model. Her life changes when she invents a love affair between herself and wealthy Sanjay Ramaswamy. When Sanjay finds out, he decides to confront her to end this facade, but ends up falling in love with her. He pretends to be poor, proposes to her, and she subsequently accepts. Before they could get married, she gets killed, Sanjay gets assaulted, resulting in memory loss, and he is unable to remember anything beyond 15 minutes. During those 15 minutes, Sanjay manages to put together bit by bit through tattoos, Polaroid photos, notes, and maps on the wall of his apartment whatever he is able to recollect, as he sets out to avenge Kalpana's death. Sanjay does not know that the elusive killer knows about his agenda, and has already made plans to finish him off once and for all.                Written by\nrAjOo (gunwanti@hotmail.com)",
        actors: ["Suriya", "Asin", "Nayanthara"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMWY5OWMyYTYtYzRjOS00YjJjLWJiYjEtZWY3MzA2MmUwZDBkXkEyXkFqcGdeQXVyMjMwODI3NDE@._V1_SY331_CR0,0,225,331_AL_.jpg",
      },
      {
        id: "33",
        title: "Yuva",
        genres: ["Action", "Adventure", "Crime"],
        ratings: [
          7, 1, 4, 4, 6, 7, 1, 4, 8, 7, 4, 2, 1, 10, 6, 10, 3, 10, 8, 8, 10, 5,
          8, 5, 7, 2, 9, 2, 2, 5,
        ],
        duration: "PT161M",
        releaseDate: "2004-05-22",
        storyline:
          "Michael (Ajay Devgan) , Arjun (Vivek Oberoi) and Lallan (Abhishek Bachchan) are three young men in Kolkata , with different ideals and objectives . Michael is an idealistic youth leader who dreams of a better India being created by the youth power . Arjun is a self-centered , opportunistic , easygoing fellow whose objective is to immigrate to a developed country and make big money . Lallan is a goon who works for Prosenjit Chatterjee (Om Puri) , an immoral politician . The lives of these three different people become intertwined following a murder attempt and an accident in broad daylight on the Hooghly bridge .                Written by\nSoumitra",
        actors: ["Ajay Devgn", "Abhishek Bachchan", "Rani Mukerji"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNThiZjYxNDItMGQxYy00ODU0LWFmM2YtOTQyZmU3ZWI5ZjFmXkEyXkFqcGdeQXVyNjc5Mjg4Nzc@._V1_SY480_SX320_AL_.jpg",
      },
      {
        id: "34",
        title: "Baghban",
        genres: ["Drama", "Romance"],
        ratings: [
          2, 10, 9, 4, 4, 9, 6, 9, 1, 9, 10, 5, 2, 3, 5, 2, 9, 3, 8, 1, 4, 10,
          2, 3, 10, 9, 7, 2, 3, 8,
        ],
        duration: "PT181M",
        releaseDate: "2003-10-03",
        storyline:
          "Raj Malhotra and wife Pooja have four sons. The sons have settled down professionally and are quite independent. However, when Raj Malhotra retires, none of his children want to be burdened with the responsibility of taking care of their parents. Strangely, it is the adopted son who proves to be the most kind hearted of them all. Salman's girlfriend eventually marries him. The question is, will Raj and Pooja's sons learn the folly of their ways and turn over a new leaf?                Written by\ngavin@sunny_deol2009@yahoo.com",
        actors: ["Amitabh Bachchan", "Hema Malini", "Aman Verma"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2NTEyODY4Ml5BMl5BanBnXkFtZTcwOTk2ODgzMQ@@._V1_SY250_CR0,0,176,250_AL_.jpg",
      },
      {
        id: "35",
        title: "Badlapur",
        genres: ["Action", "Drama"],
        ratings: [
          6, 10, 6, 3, 10, 1, 1, 8, 10, 1, 1, 9, 3, 3, 6, 5, 7, 8, 9, 9, 4, 2,
          3, 7, 5, 4, 2, 6, 7, 4,
        ],
        duration: "PT128M",
        releaseDate: "2015-02-20",
        actors: ["Varun Dhawan", "Nawazuddin Siddiqui", "Yami Gautam"],
        imdbRating: 7.5,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNThkNmQwMzAtYTM0ZS00NGIzLWEzMGMtM2EzZjUzNTk4YmNkXkEyXkFqcGdeQXVyNDY5MTUyNjU@._V1_SY500_CR0,0,343,500_AL_.jpg",
      },
      {
        id: "36",
        title: "Thuppakki",
        genres: ["Action", "Crime", "Thriller"],
        ratings: [
          5, 6, 9, 8, 2, 5, 7, 7, 9, 4, 9, 7, 7, 10, 9, 1, 2, 5, 2, 3, 7, 6, 10,
          2, 3, 2, 1, 9, 7, 10,
        ],
        duration: "PT165M",
        releaseDate: "2012-11-13",
        storyline:
          "Jagdish (Vijay), an army captain, is back in Mumbai for a holiday to be with his parents and two sisters. They want him to get married and finds a bride Nisha (Kajal Aggarwal) for him. After the usual bickerings the couple fall in love. Meanwhile Jagadish an intelligence officer in the military, has a mission to crack down on terrorist sleeper cells in Mumbai. How Jagadish moving around as an ordinary person using his brain and brawn in the correct measure, tracks down the terrorist in his own unique way forms the rest of this escapist entertainer.                Written by\nSurya Prakash",
        actors: ["Joseph Vijay", "Kajal Aggarwal", "Vidyut Jamwal"],
        imdbRating: 7.9,
        posterurl:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BMGFjZTdmMmEtOGZmYi00NmU5LTk4MjEtYTdmN2QzMjRmMWZkXkEyXkFqcGdeQXVyNjUwNDEzNTE@._V1_SY480_SX310_AL_.jpg",
      },
    ];
    localStorage.setItem("database", JSON.stringify(database));
    retrivedata();
  }
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
  // remove value from inputes
  if (actionwithmovie === "createnew") {
    document.getElementById("inputTitle").value = "";
    document.getElementById("inputGeneres").value = "";
    document.getElementById("inputActors").value = "";
    document.getElementById("inputImdb").value = "";
    document.getElementById("inputDuration").value = "";
    document.getElementById("formrelease").value = "";
    document.getElementById("inputUrl").value = "";
    document.getElementById("inputStoryline").value = "";
  }
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

  // generes.innerHTML = database[movindex].genres.split(",");
  generes.innerHTML = database[movindex].genres;

  const duration = document.getElementById("duration");
  const imdb = document.getElementById("imdb");
  const average = document.getElementById("average");

  title.innerHTML = database[movindex].title;
  storyline.innerHTML = database[movindex].storyline;
  actors.innerHTML = ""; // if enters second time 1st step is to clean previous

  // actors.innerHTML = database[movindex].actors.split(",");
  actors.innerHTML = database[movindex].actors;

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
retrivedata(); // get data form local storage
showtable(database.slice(paginateStart, paginateEnd));
