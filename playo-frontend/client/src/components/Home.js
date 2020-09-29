import React, { Component } from "react";
import Header from "../components/Header";
import HomeUser from "../components/HomeUser";
import HomeAdmin from "../components/HomeAdmin";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      laitude: localStorage.getItem("latitude"),
      longitude: localStorage.getItem("longitude"),
      address: localStorage.getItem("address")
    };
  }
  render() {
    return (
      <div>
        <Header />
        {this.state.userDetails.type === "user" ? <HomeUser /> : <HomeAdmin />}
      </div>
    );
  }
}

export default Home;
