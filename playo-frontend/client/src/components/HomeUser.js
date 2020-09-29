import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import UpcomingGames from "./UpcomingGames";
import SportClubs from "./SportClubs";
import ChangeLocation from "./ChangeLocation";

class HomeUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      toggle: false
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/"
    };
  }

  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  render() {
    return (
      <div>
        <Container className=" border">
          <div className="circular--landscape mt-4">
            <img src={require(`../../public/${this.state.userDetails.image}`)} className="img" />
          </div>
          <h1>
            <strong>Welcome {this.state.userDetails.name}</strong>
          </h1>
          <h4>This is the user's page. The user will be able to look for the sports events that is happening in the near by location. If the user wants to participate in the events which is far from his/her permanent addess, then they can click on the "Change Location" button and change the location.</h4>
          {this.state.toggle ? (
            <Container>
              <ChangeLocation />
              <Button className="mt-2 mb-2" onClick={this.toggle} color="danger">
                Cancel
              </Button>
            </Container>
          ) : (
            <Button onClick={this.toggle} color="dark" className="mt-3 mb-3">
              Change Location
            </Button>
          )}
          <Container>
            <UpcomingGames />
          </Container>
          <Container>
            <SportClubs />
          </Container>
        </Container>
      </div>
    );
  }
}

export default HomeUser;
