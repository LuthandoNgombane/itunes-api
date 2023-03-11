import { useRef, useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";


// Search Box Component
function SearchComponent(props) {
  // We use the useRef hooks below to help store the values the user inputs
  const searchRef = useRef("");
  /**
   * @type {string}
   * This state is used to change the text on the dropdown button
   */
  const [dropdownButtonText, setDropdownButtonText] =
    useState("Select Media Type");

  // With this function we collect the user inputs and search using the iTunes API
  function searchItunesHandler(event) {
    // Collect the user input values using the useRef hooks
    const searchTerm = searchRef.current.value;
    const mediaType = dropdownButtonText.replace(" ", ""); // Sanitise mediaType value for use

    // Simple validation disallowing empty strings and checking for dropdown buton text
    if (
      !searchTerm ||
      onlySpaces(searchTerm) ||
      dropdownButtonText === "Select Media Type"
    ) {
      alert("Search field must not be empty | Select a media type");
    } else {
      const searchObj = {
        term: searchTerm,
        media: mediaType,
      };
      // Send the object back to App.js to be used in searching the iTunes API
      props.onSubmit(searchObj);
    }
  }

  // This function returns true if a string with only spaces is passed i.e. " "
  function onlySpaces(str) {
    return str.trim().length === 0;
  }
  // Array of different media the user can search for
  const mediaArray = [
    "Any",
    "Movie",
    "Podcast",
    "Music",
    "Audiobook",
    "TV Show",
    "Software",
    "eBook",
  ];

  // This function changes the dropdown button text to the dropdown item selected
  function changeDropdownButtonText(e) {
    setDropdownButtonText(e.target.text);
  }

    /**
     * 
     * 
     */
  return (
    <Card className="search-card">
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicSearch">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a search term"
              ref={searchRef}
            />
          </Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {dropdownButtonText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {mediaArray.map((media, index) => (
                <Dropdown.Item
                  href="#"
                  key={"media" + index}
                  onClick={changeDropdownButtonText}
                >
                  {media}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button id ="submit" variant="primary" type="button" onClick={searchItunesHandler}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SearchComponent;
