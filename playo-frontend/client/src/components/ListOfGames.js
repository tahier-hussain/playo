import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";
import ChangeLocation from "./ChangeLocation";

class ListOfGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      ListOfGames: [],
      toggle: false
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/posts/upcoming-events",
      data: {
        latitude: localStorage.getItem("latitude"),
        longitude: localStorage.getItem("longitude")
      }
    };

    axios(requestOptions).then(res => {
      this.setState({
        ListOfGames: res.data
      });
      console.log(res.data);
    });
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container className=" border pt-3 pb-3 pl-5 pr-5 mt-2 mb-5">
          <h1>Upcoming games near your location</h1>
          <p>
            <strong>Your Location: </strong>
            {localStorage.getItem("address")}
          </p>
          {this.state.toggle ? (
            <Container>
              <ChangeLocation />
              <Button className="mt-2" onClick={this.toggle} color="danger">
                Cancel
              </Button>
            </Container>
          ) : (
            <Button color="dark" onClick={this.toggle} className="mb-3">
              Change Location
            </Button>
          )}
          {this.state.ListOfGames.length > 0 ? (
            <div>
              {this.state.ListOfGames.map(game => (
                <Container className="border pt-5 pb-5 pl-5 pr-5 mb-3">
                  <img width="500px" height="auto" src={require(`../../public/${game.image}`)} />
                  <h3 className="mt-2">{game.title}</h3>
                  <p>{game.description}</p>
                  <p>
                    <strong>Address: {game.address}</strong>
                  </p>
                  <p>
                    <strong>Club: {game.sports_club_name}</strong>
                  </p>
                  <p>
                    <strong>Type: {game.sports_type_name}</strong>
                  </p>
                  <p>
                    <strong>Total slots: {game.no_of_slots}</strong>
                  </p>
                  <p>
                    <strong>Available slots: {game.no_of_slots_available}</strong>
                  </p>
                  {this.state.userDetails.type === "admin" ? (
                    <div>
                      <button className="btn btn-primary mr-2">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                    </div>
                  ) : (
                    ""
                  )}
                </Container>
              ))}
            </div>
          ) : (
            <p>No Upcoming Games</p>
          )}
        </Container>
      </div>
    );
  }
}

export default ListOfGames;
