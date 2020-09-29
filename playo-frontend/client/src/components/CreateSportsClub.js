import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
// import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

var address;
var latitude;
var longitude;

class CreateSportsClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      club_name: "",
      description: "",
      sports_type: "",
      sports_type_id: "",
      image: "",
      sport_types: []
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/sport/get"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          sport_types: res.data,
          sport_type: res.data[0].name
        });
      }
    });
  }

  changeHandler = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandlerForFile = event => {
    this.setState({
      file: event.target.files[0]
    });
  };

  submitHandler = async event => {
    event.preventDefault();

    console.log(this.state.sport_types);
    for (let i = 0; i < this.state.sport_types.length; i++) {
      if (this.state.sport_types[i].name === this.state.sports_type) {
        await this.setState({
          sports_type_id: this.state.sport_types[i]._id
        });
        console.log(this.state.sports_type_id);
        break;
      }
    }
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("club_name", this.state.club_name);
    formData.append("description", this.state.description);
    formData.append("sports_type_id", this.state.sports_type_id);
    formData.append("sports_type", this.state.sports_type);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/sports-club/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: formData
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Sports Club created successfully");
        this.props.history.push("/home");
        console.log(res.data);
      } else {
        console.log(res.data);
      }
    });
  };

  toggle = () => {
    this.setState({
      vendorSignUp: !this.state.vendorSignUp
    });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <Header />
        <Container className="mt-3">
          <Button color="dark" href="/home">
            {"<< "} Go Back
          </Button>
        </Container>
        <Container className="border mt-3">
          <Form className="mt-4 mb-4" onSubmit={this.submitHandler}>
            <Col>
              <h2> Create Club </h2>
            </Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Club Name</Label>
                <Input type="text" name="club_name" id="club_name" placeholder="name" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name="description" id="description" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleSelect">Select Category</Label>
                <Input type="select" name="sports_type" id="sport" onChange={this.changeHandler}>
                  {this.state.sport_types.map(sport => (
                    <option>{sport.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Upload Profile Picture (Optional)</Label>
                <Input type="file" name="file" id="file" placeholder="profile picture" onChange={this.changeHandlerForFile} />
              </FormGroup>
            </Col>
            <Col>
              <Button type="submit" color="dark">
                Submit
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateSportsClub;
