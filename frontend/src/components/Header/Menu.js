import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// The Menu Component Function
function Menu(props) {
  //  set the value to indicate to the entire application
  function inFavouritesHandler() {
    localStorage.setItem("inFavourites", true);
  }
  // set the value to indicate to the entire application
  function inHomeHandler() {
    localStorage.setItem("inFavourites", false);
  }
  return (
    <Nav variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <NavLink className="nav-link" to="/" onClick={inHomeHandler}>
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/fav" onClick={inFavouritesHandler}>
          Favourites
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default Menu;
