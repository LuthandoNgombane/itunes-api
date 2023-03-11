import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AudiobookResult } from "../SearchResults/AudiobookResult";
import { EbookResult } from "../SearchResults/EbookResult";
import { MovieResult } from "../SearchResults/MovieResult";
import { MusicResult } from "../SearchResults/MusicResult";
import { PodcastResult } from "../SearchResults/PodcastResult";
import { SoftwareResult } from "../SearchResults/SoftwareResult";
import { TVShowResult } from "../SearchResults/TVShowResult";

// The Component that displays the search results
export function SearchResultList(props) {
  /**
   * @type {object}
   * resultsComponents is used to store the components to be rendered within SearchResultList
   */
  const [resultsComponents, setResultsComponents] = useState(null);

// Everytime searchResultData changes, render the components to display the data
  useEffect(() => {
    // If there is any media matching the search term, render the components to display them
    if (props.searchResultData.resultCount > 0) {
      setResultsComponents(props.searchResultData.results.map(checkMediaKind));
    }
  }, [props.searchResultData]);

  // Depending on the media type/kind, return the respective Component to render
  function checkMediaKind(result, index, arr) {
    let mediaType = "";
    let key = "";
    // If the result has a "kind" value, set the media type to that value
    // If the result does not have a "kind" value, it has a "wrapperType" we can set the mediaType as
    if (result.kind !== undefined) {
      mediaType = result.kind;
      key = mediaType + index;
    } else {
      mediaType = result.wrapperType;
      key = mediaType + index;
    }
    // Switch case to return a Component respective to its mediaType
    switch (mediaType) {
      case "audiobook":
        return <AudiobookResult key={key} index={index} result={result} />;
      case "ebook":
        return <EbookResult key={key} index={index} result={result} />;
      case "feature-movie":
        return <MovieResult key={key} index={index} result={result} />;
      case "song":
        return <MusicResult key={key} index={index} result={result} />;
      case "podcast":
        return <PodcastResult key={key} index={index} result={result} />;
      case "software":
        return <SoftwareResult key={key} index={index} result={result} />;
      case "collection":
        return <TVShowResult key={key} index={index} result={result} />;
    }
  }

  return (
    <ListGroup >
      <ListGroup.Item variant="success">{resultsComponents}</ListGroup.Item>
    </ListGroup>
  );
}
