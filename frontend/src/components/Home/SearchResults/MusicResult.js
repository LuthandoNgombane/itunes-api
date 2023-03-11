import { useState } from "react";
import { Button, Card } from "react-bootstrap";
export function MusicResult(props) {
  /**
   * @type {boolean}
   * inFavourites is used decide whether this component should display an AddButton or a DeleteButton,
   * depending on the page displayed
   */
  const [inFavourites, setInFavourites] = useState(
    localStorage.getItem("inFavourites") === "true"
  );

  // This function takes the ID of the media and adds it to the array of favourite IDs
  function addToFavHandler() {
    let favourites = JSON.parse(localStorage.getItem("favourites")); // Parse the array
    if (!favourites.includes(props.result.collectionId)) {
      // Check if the media is already favourited
      favourites.push(props.result.collectionId); // Add the ID to the array
      localStorage.setItem("favourites", JSON.stringify(favourites)); // Set the array in localStorage
      alert("Media favourited!");
    } else {
      alert("Media already favourited!");
    }
  }

  // This function removes the media from favourites
  function deleteFavHandler() {
    let favourites = JSON.parse(localStorage.getItem("favourites")); // Parse the array
    const index = favourites.indexOf(props.result.collectionId); // Get the index of the media's ID
    if (index > -1) {
      // If the media's ID exists in the array
      favourites.splice(index, 1); // Remove the ID at its index
      localStorage.setItem("favourites", JSON.stringify(favourites)); // Set the array in localStorage
      props.onDelete(); // Call the onDelete function in FavList.js to rerender the component
    }
  }

  // AddButton component, visible on the Search Page
  function AddButton() {
    return (
      <Button
        className="ms-3 mb-3"
        variant="primary"
        style={{ width: "20%" }}
        onClick={addToFavHandler}
      >
        Add to Favourites
      </Button>
    );
  }

  // DeleteButton component, visible on the Favourites Page
  function DeleteButton() {
    return (
      <Button
        className="ms-3 mb-3"
        variant="danger"
        style={{ width: "20%" }}
        onClick={deleteFavHandler}
      >
        Remove from Favourites
      </Button>
    );
  }
  return (
    <Card className="mb-3">
      <Card.Img
        style={{ width: "150px" }}
        className="ms-3 mt-3"
        variant="top"
        src={props.result.artworkUrl100}
        crossOrigin="true"
      />
      <Card.Body>
        <Card.Title>
          {props.result.trackName}, {props.result.artistName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Album name: {props.result.collectionName}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Genre: {props.result.primaryGenreName}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Length:{" "}
          {String(new Date(props.result.trackTimeMillis).getMinutes()).padStart(
            2,
            "0"
          )}
          {":"}
          {String(new Date(props.result.trackTimeMillis).getSeconds()).padStart(
            2,
            "0"
          )}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Track {props.result.trackNumber} of {props.result.trackCount}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Release Date: {props.result.releaseDate.slice(0, 10)}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Album: R {props.result.collectionPrice}, Track: R{" "}
          {props.result.trackPrice}
        </Card.Subtitle>
        <Card.Link href={props.result.collectionViewUrl}>
          iTunes Link to Album
        </Card.Link>
        <Card.Link href={props.result.artistViewUrl}>
          iTunes Link to Artist
        </Card.Link>
      </Card.Body>
      {!inFavourites && <AddButton />}
      {inFavourites && <DeleteButton />}
    </Card>
  );
}
