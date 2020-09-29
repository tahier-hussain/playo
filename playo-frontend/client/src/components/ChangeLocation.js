import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import * as ELG from "esri-leaflet-geocoder";
// import "leaflet/dist/leaflet.css";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "leaflet/dist/leaflet.js";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js";

var address;
var latitude;
var longitude;

class ChangeLocation extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    var latlng;
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
  }

  changeLocation = event => {
    event.preventDefault();
    localStorage.setItem("address", address);
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);

    window.location.replace("http://localhost:3000/list-of-games");
  };
  render() {
    const center = [37.7833, -122.4167];
    return (
      <div>
        <h2>
          <strong>Change Location</strong>
        </h2>
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
        <Button onClick={this.changeLocation} color="dark" className=" mt-2 mb-2">
          Change
        </Button>
      </div>
    );
  }
}

export default ChangeLocation;
