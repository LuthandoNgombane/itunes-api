import { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import SearchComponent from "./Search/SearchComponent";
import { SearchResultList } from "./Search/SearchResultList";


function HomePage(props) {
  /**
   * @type {json}
   * searchResultData is used to store the data received from the API call
   */
  const [searchResultData, setSearchResultData] = useState([]);
  /**
   * @type {boolean}
   * loading is used to indicate to the user that the application is still
   * waiting to receive data from the API
   */
  const [loading, setLoading] = useState(false);
  /**
   * @type {object}
   * error is used to indicate to the user if there has been an error trying to
   * retrieve data from the API
   */
  const [error, setError] = useState(null);

  // function uses the fetch API to obtain the details of the searched media.
  //  use the search term and the media type to fetch the rest of the details
  const fetchData = (searchObj) => {
    setLoading(true); // Set loading to true as we wait for a response
    const mediaType = searchObj.media.toLowerCase();
    // use URLSearchParams to set the paramaters for the call
    // URL would look like: /movie?terminator
    fetch(
      "/" +
        mediaType +
        "?" +
        new URLSearchParams({ term: searchObj.term }).toString()
    )
      .then((response) => {
        // get the response from the API call
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setSearchResultData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error); 
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // initialise the "favourites" array in the localStorage
  useEffect(() => {
    if (!localStorage.getItem("favourites")) {
      localStorage.setItem("favourites", JSON.stringify([]));
    }
  }, []);

  // loading is set to true when fetching the data, display a loading Card
  function LoadingCard() {
    return (
      <Container style={{ marginTop: "15px" }}>
        <Card border="warning">
          <Card.Body>
            <Card.Title>Loading Page...</Card.Title>
            <Card.Text>Please wait while we load your page...</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
  // if the error state is truthy after trying to fetch the data, display an
  // error Card
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

  return (
    <Container style={{ marginTop: "15px" }}>
      <Row className="mb-3">
        <SearchComponent onSubmit={fetchData}></SearchComponent>
      </Row>
      <Row>
        {loading && <LoadingCard />}
        {error && <ErrorCard />}
        {!loading && !error && (
          <SearchResultList
            searchResultData={searchResultData}
          />
        )}
      </Row>
    </Container>
  );
}

export default HomePage;
