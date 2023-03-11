import { useEffect, useState } from "react";
import { Card, Container, ListGroup, Row } from "react-bootstrap";
import { AudiobookResult } from "../Home/SearchResults/AudiobookResult";
import { EbookResult } from "../Home/SearchResults/EbookResult";
import { MovieResult } from "../Home/SearchResults/MovieResult";
import { MusicResult } from "../Home/SearchResults/MusicResult";
import { PodcastResult } from "../Home/SearchResults/PodcastResult";
import { SoftwareResult } from "../Home/SearchResults/SoftwareResult";
import { TVShowResult } from "../Home/SearchResults/TVShowResult";

// functional component for rendering user's favourite media list
export function FavList(props) {
  /**
   * @type {array}
   * 
   */ // to hold data fetched from server
  const [favouritesData, setFavouritesData] = useState([]);
  /**
   * @type {object}
   * 
   */// to hold components for favourite media
  const [favComponents, setFavComponents] = useState(null);
  /**
   * @type {boolean}
   * 
   */// to indicate if data is being loaded from server
  const [loading, setLoading] = useState(false);
  /**
   * @type {object}
   * 
   */// to hold error object if error occurs while fetching data
  const [error, setError] = useState(null);
  /**
   * @type {boolean}
   * 
   */// to indicate if no favourites are present yet
  const [nothing, setNothing] = useState(false);

  // useEffect hook to load favourites data from server when component is mounted
  useEffect(() => {
    loadFavourites();
  }, []);

  // Ffunction to fetch favourite data from server
  function loadFavourites() {
    
    let idLookup = [];
    
    if (props.testIDs !== undefined) {
      idLookup = props.testIDs;
    } else {
      
      idLookup = localStorage.getItem("favourites");
    }
    fetch(
      
      "/favourites?" + new URLSearchParams({ idArray: idLookup }).toString()
    )
      .then((response) => {
        
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setFavouritesData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); 
        setError(error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }

 // useEffect hook to render favourite media components when favouritesData state variable is updated
  useEffect(() => {
    
    if (favouritesData.resultCount > 0) {
      setNothing(false);
      setFavComponents(favouritesData.results.map(checkMediaKind));
    } else {
      setNothing(true);
    }
  }, [favouritesData]);

  // function to create media components based on the type of media
  function checkMediaKind(result, index, arr) {
    let mediaType = "";
    let key = "";
   
// checking if media type is defined in the object or not
    if (result.kind !== undefined) {
      mediaType = result.kind;
      key = mediaType + index;
    } else {
      mediaType = result.wrapperType;
      key = mediaType + index;
    }

    // switch case to create component based on media type
    switch (mediaType) {
      case "audiobook":
        return (
          <AudiobookResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
      case "ebook":
        return (
          <EbookResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
      case "feature-movie":
        return (
          <MovieResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
      case "song":
        return (
          <MusicResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
      case "podcast":
        return (
          <PodcastResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
      case "software":
        return (
          <SoftwareResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
      case "collection":
        return (
          <TVShowResult
            key={key}
            index={index}
            result={result}
            onDelete={loadFavourites}
          />
        );
    }
  }


  function LoadingCard() {
    return (
      <Container style={{ marginTop: "15px" }}>
        <Card border="warning">
          <Card.Body>
            <Card.Title>Please wait...</Card.Title>
            <Card.Text>Please wait while we load your page...</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  
  function ErrorCard() {
    return (
      <Container style={{ marginTop: "15px" }}>
        <Card border="danger">
          <Card.Body>
            <Card.Title>Error</Card.Title>
            <Card.Text>"Error fetching data"</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  
  function NoFavouritesCard() {
    return (
      <Container style={{ marginTop: "15px" }}>
        <Card border="info">
          <Card.Body>
            <Card.Title>No Selection yet!</Card.Title>
            <Card.Text>
              No Favourites added yet.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  
  return (
    <Container>
      <Row>
        <ListGroup>
          <ListGroup.Item variant="info">
            {loading && <LoadingCard />}
            {error && <ErrorCard />}
            {nothing && <NoFavouritesCard />}
            {!loading && !error && !nothing && favComponents}
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  );
}
