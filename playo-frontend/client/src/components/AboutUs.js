import React, { Component } from "react";
import Header from "../components/Header";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container className="border mt-5 p-3">
          <h1 className="p-2">
            <strong>About Us</strong>
          </h1>
          <h3 className="p-2">This application is an intermediate between a normal user and the admin. The admin will be able to create the sport game happening by mentioning its credentials (Sport type, location etc). The user will be able to see all the sport games that are happening near his/her location. The nearest sport events are identified by using the latitude and longitude of the locations. This way the user will be able to identify the nearby events, and the take part in them.</h3>
        </Container>
      </div>
    );
  }
}

export default AboutUs;
