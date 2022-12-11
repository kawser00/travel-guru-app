import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import NoMatch from './Components/NoMatch/NoMatch';
import Destination from './Components/Destination/Destination';
import Booking from './Components/Booking/Booking';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import fakeData from './FakeData/FakeData'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header/Header';



export const LocationContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  const [place, setPlace] = useState("cox's bazar")
  const [selectedPlace, setSelectedPlace] = useState(null)
  useEffect(()=>{
    const matchLocation = fakeData.find(data => data.location === place)
    setSelectedPlace(matchLocation)
  },[place])

  return (
    <div className="bg-img">
      <LocationContext.Provider value={[{place, setPlace, selectedPlace, loggedInUser, setLoggedInUser}]}>
    <Router>
      <Header />
      <Switch>
        <Route path="/home">
        <Home></Home>
        </Route>
        <Route exact path="/">
        <Home></Home>
        </Route>
        <Route path="/news">
        <Home></Home>
        </Route>
        <Route path="/destination">
        <Destination></Destination>
        </Route>
        <Route path="/contact">
          <Booking></Booking>
        </Route>
        <Route path="/login">
        <Login></Login>
        </Route>
        <Route path="*">
        <NoMatch></NoMatch>
        </Route>
      </Switch>
    </Router>
    </LocationContext.Provider>
    </div>
  );
}

export default App;
