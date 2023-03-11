import { useState } from "react";
import { Button, Card } from "react-bootstrap";
// this component is used to display Audiobook details only
export function AudiobookResult(props) {
  /**
   * @type {boolean}
   * inFavourites is used decide whether this component should display an AddButton or a DeleteButton,
   * depending on the page displayed
   */
  const [inFavourites, setInFavourites] = useState(
    localStorage.getItem("inFavourites") === "true"
  );

  // this function takes the ID of the media and adds it to the array of favourite IDs
  function addToFavHandler() {
  // parse the array
    let favourites = JSON.parse(localStorage.getItem("favourites")); 
    if (!favourites.includes(props.result.collectionId)) {
      // check if the media is already favourited
      // add the ID to the array
      favourites.push(props.result.collectionId); 
      // set the array in localStorage
      localStorage.setItem("favourites", JSON.stringify(favourites)); 
      alert("Media favourited!");
    } else {
      alert("Media already favourited!");
    }
  }

  // this function removes the media from favourites
  function deleteFavHandler() {
    // parse the array
    let favourites = JSON.parse(localStorage.getItem("favourites")); 
    // get the index of the media's ID
    const index = favourites.indexOf(props.result.collectionId); 
    if (index > -1) {
      // if the media's ID exists in the array
      // remove the ID at its index
      favourites.splice(index, 1); 
      // set the array in localStorage
      localStorage.setItem("favourites", JSON.stringify(favourites)); 
      // call the onDelete function in FavList.js to rerender the component
      props.onDelete(); 
    }
  }

  // add button 
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

  // delete button
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
          {props.result.collectionName}, {props.result.artistName}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Genre: {props.result.primaryGenreName}
        </Card.Subtitle>
        <Card.Text
          dangerouslySetInnerHTML={{ __html: props.result.raw.description }}
        ></Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Cost:{" "}
          {props.result.collectionPrice === 0.0
            ? "Free"
            : "$ " + props.result.collectionPrice}
        </Card.Subtitle>
        <Card.Link href={props.result.collectionViewUrl}>iTunes Link</Card.Link>
      </Card.Body>
      {!inFavourites && <AddButton />}
      {inFavourites && <DeleteButton />}
    </Card>
  );
}
