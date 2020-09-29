import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import CreateSport from "./components/CreateSport";
import CreateSportsClub from "./components/CreateSportsClub";
import ListOfGames from "./components/ListOfGames";
import Club from "./components/Club";
import ScheduledGames from "./components/ScheduledGames";
import AboutUs from "./components/AboutUs";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/home" component={Home} exact />
          <Route path="/create" component={CreateGame} exact />
          <Route path="/create-sports-club" component={CreateSportsClub} exact />
          <Route path="/create-sport" component={CreateSport} exact />
          <Route path="/list-of-games" component={ListOfGames} exact />
          <Route path="/club/:id" component={Club} exact />
          <Route path="/scheduled-games" component={ScheduledGames} exact />
          <Route path="/about-us" component={AboutUs} exact />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
