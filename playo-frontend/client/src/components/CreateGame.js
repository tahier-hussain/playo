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
class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      sports_club_id: "",
      sports_club_name: "",
      sports_type_id: "",
      sports_type_name: "",
      no_of_slots: "",
      date_of_event: "",
      time_of_event: "",
      image: "",
      address: "",
      latitude: "",
      longitude: "",
      sports_clubs: [],
      sports_types: [],
      error_message: "",
      password_message: "Enter atleast 8 characters",
      password_alert: "primary"
    };
  }

  componentDidMount() {
    var latlng;
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on("results", function (data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
        latlng = data.results[i];
      }
      address = latlng.properties.LongLabel;
      latitude = latlng.latlng.lat;
      longitude = latlng.latlng.lng;
    });

    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/sports-club/get"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          sports_clubs: res.data,
          sports_club_name: res.data[0].club_name
        });
        console.log(res.data);
      }
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/sport/get"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          sports_types: res.data,
          sports_type_name: res.data[0].name
        });
        console.log(res.data);
      }
    });
  }

  changeHandler = event => {
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

    if (await this.state.sports_club_name) {
      for (let i = 0; i < this.state.sports_clubs.length; i++) {
        if (await (this.state.sports_club_name.trim() === this.state.sports_clubs[i].club_name.trim())) {
          this.setState({
            sports_club_id: this.state.sports_clubs[i]._id
          });
          break;
        }
      }
    }

    if (await this.state.sports_type_name) {
      console.log("HELLO");
      for (let i = 0; i < this.state.sports_types.length; i++) {
        if (await (this.state.sports_type_name.trim() === this.state.sports_types[i].name.trim())) {
          this.setState({
            sports_type_id: this.state.sports_types[i]._id
          });
        }
      }
    }
    console.log(this.state);
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("sports_club_id", this.state.sports_club_id);
    formData.append("sports_club_name", this.state.sports_club_name);
    formData.append("sports_type_id", this.state.sports_type_id);
    formData.append("sports_type_name", this.state.sports_type_name);
    formData.append("no_of_slots", this.state.no_of_slots);
    formData.append("date_of_event", this.state.date_of_event);
    formData.append("time_of_event", this.state.time_of_event);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/posts/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: formData
    };
    console.log(requestOptions);
    axios(requestOptions).then(res => {
      if (res.status === 200) {
        alert("Game created successfully");
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
    const center = [37.7833, -122.4167];
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
              <h2> Create Game </h2>
            </Col>
            {this.state.error_message ? <Alert color="danger">{this.state.error_message}</Alert> : ""}
            <Col>
              <FormGroup>
                <Label>Title</Label>
                <Input type="text" name="title" id="title" placeholder="title" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Description</Label>
                <Input type="textarea" name="description" id="description" placeholder="description" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleSelect">Sports Club</Label>
                <Input type="select" name="sports_club_name" id="sports_club_name" onChange={this.changeHandler}>
                  {this.state.sports_clubs.map(club => (
                    <option>{club.club_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="exampleSelect">Sports Type</Label>
                <Input type="select" name="sports_type_name" id="sports_type_name" onChange={this.changeHandler}>
                  {this.state.sports_types.map(sport => (
                    <option>{sport.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>No of Slots</Label>
                <Input type="number" name="no_of_slots" id="no_of_slots" placeholder="no of slots" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Date of Game</Label>
                <Input type="date" name="date_of_event" id="date_of_event" placeholder="date" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Time</Label>
                <Input type="time" name="time_of_event" id="time_of_event" placeholder="myemail@email.com" onChange={this.changeHandler} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label>Upload Profile Picture (Optional)</Label>
                <Input type="file" name="file" id="file" placeholder="picture" onChange={this.changeHandlerForFile} />
              </FormGroup>
            </Col>
            <Col>
              <Label>Address / Location: </Label>
            </Col>
            <Col>
              <Map
                style={{ height: "50vh" }}
                center={center}
                zoom="10"
                ref={m => {
                  this.leafletMap = m;
                }}
              >
                <TileLayer attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors" url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
                <div className="pointer" />
              </Map>
            </Col>
            <Col className="mt-2">{this.state.address ? <p>Address: {this.state.address}</p> : ""}</Col>
            <Col>
              <Button type="submit" color="dark">
                Submit
              </Button>
            </Col>
            <Col>
              Already have an account?
              <Button color="link">
                <Link to="/">Login</Link>
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateGame;
