import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import UpcomingGames from "./UpcomingGames";

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      upcomingGames: []
    };
  }

  createGame = () => {
    window.location.replace("http://localhost:3000/create");
  };

  createSportsClub = () => {
    window.location.replace("http://localhost:3000/create-sports-club");
  };

  addSport = () => {
    window.location.replace("http://localhost:3000/create-sport");
  };

  render() {
    return (
      <div>
        <Container className="border">
          <h1 className="mt-3 mb-3">Welcome {this.state.userDetails.name}</h1>
          <h3 className="mb-3">This is the Admin's page. The admin will be able to add, edit and delete sports events. Only the Admin will have the access to specify the details regarding the sports event.</h3>
          <Button onClick={this.createGame} color="dark" className="mr-3">
            Create New Event
          </Button>
          <Button color="dark" onClick={this.createSportsClub} className="mr-3">
            Create Sports Club
          </Button>
          <Button color="dark" onClick={this.addSport}>
            Add Sport
          </Button>
          <UpcomingGames />
        </Container>
      </div>
    );
  }
}

export default HomeAdmin;
