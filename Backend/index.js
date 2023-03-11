const express = require("express");
const helmet = require("helmet");
// iTunes search module to make searching the iTunes API more manageable
const itunesAPI = require("node-itunes-search");
const app = express();
app.use(express.static("public"));
app.use(helmet());

// allow images to display from cross-origin
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// reoute handler for GET requests with path
app.get("/audiobook", function (req, res) {
  // https://itunes.apple.com/search?term=The%20Hobbit&media=audiobook&entity=audiobook&attribute=titleTerm&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    media: itunesAPI.ItunesMedia.AudioBook,
    entity: itunesAPI.ItunesEntityAudioBook.AudioBook,
    limit: 25,
    extras: { attribute: "titleTerm" },
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler for GET requests with relevant path
app.get("/ebook", function (req, res) {
  // https://itunes.apple.com/search?term=hello&country=ZA&media=ebook&entity=ebook&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Ebook,
    entity: itunesAPI.ItunesEntityEbook.Ebook,
    limit: 25,
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler for GET requests with relevant path
app.get("/movie", function (req, res) {
  // https://itunes.apple.com/search?term=hello&country=ZA&media=movie&entity=movie&attribute=movieTerm&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Movie,
    entity: itunesAPI.ItunesEntityMovie.Movie,
    limit: 25,
    extras: { attribute: "movieTerm" },
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler for GET requests with path
app.get("/music", function (req, res) {
  // https://itunes.apple.com/search?term=hello&country=ZA&media=music&entity=musicTrack&attribute=songTerm&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Music,
    entity: itunesAPI.ItunesEntityMusic.MusicTrack,
    limit: 25,
    extras: { attribute: "songTerm" },
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler for GET requests with path
app.get("/podcast", function (req, res) {
  // https://itunes.apple.com/search?term=hello&country=ZA&media=podcast&entity=podcast&attribute=titleTerm&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Podcast,
    entity: itunesAPI.ItunesEntityPodcast.Podcast,
    limit: 25,
    extras: { attribute: "titleTerm" },
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler for GET requests with path
app.get("/software", function (req, res) {
  // https://itunes.apple.com/search?term=hello&country=ZA&media=software&entity=software&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Software,
    entity: itunesAPI.ItunesEntitySoftware.Software,
    limit: 25,
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler for GET requests with relevant path
app.get("/tvshow", function (req, res) {
  // https://itunes.apple.com/search?term=hello&media=tvShow&entity=tvSeason&attribute=showTerm&limit=25
  const searchOptions = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    media: itunesAPI.ItunesMedia.TvShow,
    entity: itunesAPI.ItunesEntityTvShow.TvSeason,
    limit: 25,
    extras: { attribute: "showTerm" },
  });
  itunesAPI.searchItunes(searchOptions).then((searchResult) => {
    res.send(searchResult);
  });
});

// route handler if the user wants to search for any media type
// limited to 5 results per type
app.get("/any", function (req, res) {
  const searchOptionsAudioBook = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    media: itunesAPI.ItunesMedia.AudioBook,
    entity: itunesAPI.ItunesEntityAudioBook.AudioBook,
    limit: 5,
    extras: { attribute: "titleTerm" },
  });
  const searchOptionsEbook = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Ebook,
    entity: itunesAPI.ItunesEntityEbook.Ebook,
    limit: 5,
  });
  const searchOptionsMovie = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Movie,
    entity: itunesAPI.ItunesEntityMovie.Movie,
    limit: 5,
    extras: { attribute: "movieTerm" },
  });
  const searchOptionsMusic = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Music,
    entity: itunesAPI.ItunesEntityMusic.MusicTrack,
    limit: 5,
    extras: { attribute: "songTerm" },
  });
  const searchOptionsPodcast = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Podcast,
    entity: itunesAPI.ItunesEntityPodcast.Podcast,
    limit: 5,
    extras: { attribute: "titleTerm" },
  });
  const searchOptionsSoftware = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    country: "ZA",
    media: itunesAPI.ItunesMedia.Software,
    entity: itunesAPI.ItunesEntitySoftware.Software,
    limit: 5,
  });
  const searchOptionsTvShow = new itunesAPI.ItunesSearchOptions({
    term: req.query.term,
    media: itunesAPI.ItunesMedia.TvShow,
    entity: itunesAPI.ItunesEntityTvShow.TvSeason,
    limit: 5,
    extras: { attribute: "showTerm" },
  });
  // Collect all the searchOptions into one array
  const searchOptions = [
    searchOptionsAudioBook,
    searchOptionsEbook,
    searchOptionsMovie,
    searchOptionsMusic,
    searchOptionsPodcast,
    searchOptionsSoftware,
    searchOptionsTvShow,
  ];
  const searchResults = [];
  // array of Promises to callback later
  let promiseArr = searchOptions.map(function (option) {
    return itunesAPI.searchItunes(option).then(function (searchResult) {
      // add the search results to an array
      searchResults.push(searchResult);
    });
  });

  // consume all the Promises in the Promise array and deal with the values within the searchResults afterwards
  Promise.all(promiseArr).then(function (resultsArray) {
    const finalResultsArray = [];
    // get the results in a {resultCount: x, results[]} format to extract the results into a final array
    searchResults.forEach((result) => {
      result.results.forEach((item) => {
        finalResultsArray.push(item);
      });
    });
    // remake the {resultCount: x, results[]} format to be used in the frontend
    const response = {
      resultCount: finalResultsArray.length,
      results: finalResultsArray,
    };
    // send the response
    res.send(response);
  });
});

// route handler for GET requests with relevant path
app.get("/favourites", function (req, res) {
  const favIdArray = JSON.parse(req.query.idArray); // Parse the query into an array

  // lookup an array of IDs in one go and get all the details of the media matching said IDs
  const lookupOptions = new itunesAPI.ItunesLookupOptions({
    keys: favIdArray,
    keyType: itunesAPI.ItunesLookupType.ID, 
  });

  itunesAPI.lookupItunes(lookupOptions).then((result) => {
    res.send(result);
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
//port number according to environment
const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});

// export the app to use in testing
module.exports = app;
