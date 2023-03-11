import filesize from "filesize";
import { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
export function SoftwareResult(props) {
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
        src={props.result.raw.artworkUrl512}
        crossOrigin="true"
      />
      <Card.Body>
        <Card.Title>
          {props.result.trackName}, {props.result.artistName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Genres: {props.result.raw.genres.join(", ")}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Size: {filesize(props.result.raw.fileSizeBytes, { round: 0 })}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Age Rating: {props.result.raw.contentAdvisoryRating}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Version: {props.result.raw.version}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          User rating: {Number(props.result.raw.averageUserRating).toFixed(2)},
          Number of review: {props.result.raw.userRatingCount}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Minimum OS: {props.result.raw.minimumOsVersion}
        </Card.Subtitle>
        <Card.Text>{props.result.raw.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          {props.result.raw.formattedPrice}
        </Card.Subtitle>
        <Card.Link href={props.result.trackViewUrl}>iTunes Link</Card.Link>
      </Card.Body>
      <Stack direction="horizontal" style={{ display: "initial" }}>
        {props.result.raw.screenshotUrls.map((screenshot, index) => (
          <Card.Img
            key={index}
            style={{ width: "150px" }}
            className="ms-3 mb-3"
            src={screenshot}
            crossOrigin="true"
          />
        ))}
      </Stack>
      {!inFavourites && <AddButton />}
      {inFavourites && <DeleteButton />}
    </Card>
  );
}
