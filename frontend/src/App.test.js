import renderer from "react-test-renderer";
import App from "./App";
import { FavList } from "./components/Favourites/FavList";
import { SearchResultList } from "./components/Home/Search/SearchResultList";

// Test data to use for SearchResultList
const searchResultData = [
  {
    wrapperType: "track",
    kind: "feature-movie",
    trackId: 1108257204,
    artistName: "Michael Showalter",
    trackName: "Hello, My Name Is Doris",
    trackCensoredName: "Hello, My Name Is Doris",
    trackViewUrl:
      "https://itunes.apple.com/za/movie/hello-my-name-is-doris/id1108257204?uo=4",
    previewUrl:
      "https://video-ssl.itunes.apple.com/itunes-assets/Video127/v4/12/7c/34/127c340a-f411-4194-6b58-39fd26f6ec0b/mzvf_7747801430432270584.640x480.h264lc.U.p.m4v",
    artworkUrl30:
      "https://is3-ssl.mzstatic.com/image/thumb/Video50/v4/80/03/60/800360e0-7a81-159f-7226-0f31ba6100d2/HELLO_MY_NAME_IS_DORIS_2016_TH_INTL_Logo-WW-artwork.lsr/30x30bb.jpg",
    artworkUrl60:
      "https://is3-ssl.mzstatic.com/image/thumb/Video50/v4/80/03/60/800360e0-7a81-159f-7226-0f31ba6100d2/HELLO_MY_NAME_IS_DORIS_2016_TH_INTL_Logo-WW-artwork.lsr/60x60bb.jpg",
    artworkUrl100:
      "https://is3-ssl.mzstatic.com/image/thumb/Video50/v4/80/03/60/800360e0-7a81-159f-7226-0f31ba6100d2/HELLO_MY_NAME_IS_DORIS_2016_TH_INTL_Logo-WW-artwork.lsr/100x100bb.jpg",
    collectionPrice: 99.99,
    trackPrice: 99.99,
    releaseDate: "2016-03-11T08:00:00Z",
    collectionExplicitness: "notExplicit",
    trackExplicitness: "notExplicit",
    trackTimeMillis: 5396062,
    country: "ZAF",
    currency: "ZAR",
    primaryGenreName: "Comedy",
    raw: {
      wrapperType: "track",
      kind: "feature-movie",
      trackId: 1108257204,
      artistName: "Michael Showalter",
      trackName: "Hello, My Name Is Doris",
      trackCensoredName: "Hello, My Name Is Doris",
      trackViewUrl:
        "https://itunes.apple.com/za/movie/hello-my-name-is-doris/id1108257204?uo=4",
      previewUrl:
        "https://video-ssl.itunes.apple.com/itunes-assets/Video127/v4/12/7c/34/127c340a-f411-4194-6b58-39fd26f6ec0b/mzvf_7747801430432270584.640x480.h264lc.U.p.m4v",
      artworkUrl30:
        "https://is3-ssl.mzstatic.com/image/thumb/Video50/v4/80/03/60/800360e0-7a81-159f-7226-0f31ba6100d2/HELLO_MY_NAME_IS_DORIS_2016_TH_INTL_Logo-WW-artwork.lsr/30x30bb.jpg",
      artworkUrl60:
        "https://is3-ssl.mzstatic.com/image/thumb/Video50/v4/80/03/60/800360e0-7a81-159f-7226-0f31ba6100d2/HELLO_MY_NAME_IS_DORIS_2016_TH_INTL_Logo-WW-artwork.lsr/60x60bb.jpg",
      artworkUrl100:
        "https://is3-ssl.mzstatic.com/image/thumb/Video50/v4/80/03/60/800360e0-7a81-159f-7226-0f31ba6100d2/HELLO_MY_NAME_IS_DORIS_2016_TH_INTL_Logo-WW-artwork.lsr/100x100bb.jpg",
      collectionPrice: 99.99,
      trackPrice: 99.99,
      collectionHdPrice: 129.99,
      trackHdPrice: 129.99,
      releaseDate: "2016-03-11T08:00:00Z",
      collectionExplicitness: "notExplicit",
      trackExplicitness: "notExplicit",
      trackTimeMillis: 5396062,
      country: "ZAF",
      currency: "ZAR",
      primaryGenreName: "Comedy",
      contentAdvisoryRating: "10-12 PG",
      shortDescription:
        "After a lifetime of being overlooked and ignored, a woman of a certain age finds her world turned",
      longDescription:
        "After a lifetime of being overlooked and ignored, a woman of a certain age finds her world turned upside down by a handsome new co-worker and a self-help seminar that inspires her to take a chance on love in Hello, My Name is Doris, a witty and compassionate late-life coming-of-age-story.",
      hasITunesExtras: true,
    },
    releaseDate: "2016-03-11T08:00:00Z",
    trackCensoredName: "Hello, My Name Is Doris",
    trackExplicitness: "notExplicit",
    trackId: 1108257204,
    trackName: "Hello, My Name Is Doris",
    trackPrice: 99.99,
    trackTimeMillis: 5396062,
    trackViewUrl:
      "https://itunes.apple.com/za/movie/hello-my-name-is-doris/id1108257204?uo=4",
    wrapperType: "track",
  },
  {
    wrapperType: "track",
    kind: "podcast",
    collectionId: 811377230,
    trackId: 811377230,
    artistName: "CGP Grey & Brady Haran",
    collectionName: "Hello Internet",
    trackName: "Hello Internet",
    collectionCensoredName: "Hello Internet",
    trackCensoredName: "Hello Internet",
    collectionViewUrl:
      "https://podcasts.apple.com/za/podcast/hello-internet/id811377230?uo=4",
    trackViewUrl:
      "https://podcasts.apple.com/za/podcast/hello-internet/id811377230?uo=4",
    artworkUrl30:
      "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/30x30bb.jpg",
    artworkUrl60:
      "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/60x60bb.jpg",
    artworkUrl100:
      "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/100x100bb.jpg",
    collectionPrice: 0,
    trackPrice: 0,
    releaseDate: "2020-02-28T10:13:00Z",
    collectionExplicitness: "cleaned",
    trackExplicitness: "cleaned",
    trackCount: 100,
    country: "ZAF",
    currency: "ZAR",
    primaryGenreName: "Education",
    raw: {
      wrapperType: "track",
      kind: "podcast",
      collectionId: 811377230,
      trackId: 811377230,
      artistName: "CGP Grey & Brady Haran",
      collectionName: "Hello Internet",
      trackName: "Hello Internet",
      collectionCensoredName: "Hello Internet",
      trackCensoredName: "Hello Internet",
      collectionViewUrl:
        "https://podcasts.apple.com/za/podcast/hello-internet/id811377230?uo=4",
      feedUrl: "http://www.hellointernet.fm/podcast?format=rss",
      trackViewUrl:
        "https://podcasts.apple.com/za/podcast/hello-internet/id811377230?uo=4",
      artworkUrl30:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/30x30bb.jpg",
      artworkUrl60:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/60x60bb.jpg",
      artworkUrl100:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/100x100bb.jpg",
      collectionPrice: 0,
      trackPrice: 0,
      trackRentalPrice: 0,
      collectionHdPrice: 0,
      trackHdPrice: 0,
      trackHdRentalPrice: 0,
      releaseDate: "2020-02-28T10:13:00Z",
      collectionExplicitness: "cleaned",
      trackExplicitness: "cleaned",
      trackCount: 100,
      country: "ZAF",
      currency: "ZAR",
      primaryGenreName: "Education",
      contentAdvisoryRating: "Clean",
      artworkUrl600:
        "https://is5-ssl.mzstatic.com/image/thumb/Podcasts6/v4/19/33/fe/1933fe85-cd86-2191-8187-d725ca7359bf/mza_8038397602264410223.png/600x600bb.jpg",
      genreIds: ["1304", "26"],
      genres: ["Education", "Podcasts"],
    },
    releaseDate: "2020-02-28T10:13:00Z",
    trackCensoredName: "Hello Internet",
    trackCount: 100,
    trackExplicitness: "cleaned",
    trackId: 811377230,
    trackName: "Hello Internet",
    trackPrice: 0,
    trackViewUrl:
      "https://podcasts.apple.com/za/podcast/hello-internet/id811377230?uo=4",
    wrapperType: "track",
  },
];

// Test data to use for FavList
const testIDs = [1108257204, 811377230]

test("snapshot test of SearchResultList", () => {
  const tree = renderer
    .create(<SearchResultList searchResultData={searchResultData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("snapshot test of SearchResultList", async () => {
  const tree = renderer
    .create(<FavList testIDs={testIDs} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
