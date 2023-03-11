import { FavList } from "./components/Favourites/FavList";

import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./components/Home/HomePage";

function App() {
  // on initial load,initialise the "inFavourites" value in session storage if there isnt any there 
  useEffect(() => {
  //if there is no session data
    if (sessionStorage.getItem("inFavourites") === null) { 
      //set value as inFavourites and set value to false
      sessionStorage.setItem("inFavourites", false); 
    }
  }, []);

  return (
    <div className="gradient-bg">
      <BrowserRouter>
        <div>
          <Header />
          <hr></hr>
          <Routes>
            <Route exact={true} path="/" element={<HomePage />}></Route>
            <Route path="/fav" element={<FavList />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
