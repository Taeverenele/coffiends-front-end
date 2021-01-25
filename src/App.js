import React, { useState, useEffect } from "react";
import CoffeesView from "./components/CoffeesView";
import NewCoffeeForm from "./components/NewCoffeeForm";
import axios from "axios";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import HomeView from "./components/HomeView"
import MapView from "./components/MapView"

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [reload, setReload] = useState(true);
  const [userCoffee, setUserCoffee] = useState("")
  const [userLocation, setUserLocation] = useState([-27.468298, 153.0247838])

  const updateCoffeeArray = (eachEntry) => {
    setCoffees([...coffees, eachEntry]);
  };

  const deleteCoffee = (id) => {
    axios
      .delete(`http://localhost:5000/coffees/${id}`, coffees)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (reload == true) {
      axios
        .get("http://localhost:5000/coffees/", coffees)
        .then((res) => {
          setCoffees(res.data);
          setReload(false);
        })
        .catch((error) => console.log(error));
    }
    // navigator.geolocation.getCurrentPosition(
    //   position => setUserLocation([position.coords.latitude, position.coords.longitude]),
    //   error => console.log(error.message)
    // )
  }, [reload]);

  return (
    <div className="container mt-4">
      <BrowserRouter>
        <header>
          <nav>
            <span><h3>COFFIENDS</h3></span>
            <Link to="/">HOME</Link> |
            <Link to="/coffees"> COFFEES</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" render={props =>
            <HomeView {...props} coffees={coffees} setUserCoffee={setUserCoffee} />} 
          />
          <Route exact path="/coffees" render={props =>
            <CoffeesView {...props} coffees={coffees} setReload={setReload} deleteCoffee={deleteCoffee} updateCoffeeArray={updateCoffeeArray} />}
          />
          <Route exact path="/map" render={props =>
            <MapView {...props} userCoffee={userCoffee} userLocation={userLocation} />}
          />
          {/* <Route exact path=""
            render={props =>
            <NewCoffeeForm {...props}
              updateCoffeeArray={updateCoffeeArray}
            />}
          /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;