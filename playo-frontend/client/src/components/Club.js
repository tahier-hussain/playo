import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

class Club extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      club: {},
      games: [],
      member: [],
      member_toggle: false,
      member_toggle_id: "",
      toggle: false,
      toggle_id: ""
    };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/sports-club/get-one",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: params.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          club: res.data
        });
        console.log(res.data);
      }
    });

    requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/posts/get-single-club-posts",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id: params.id,
        user_id: this.state.userDetails.id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          games: res.data
        });
        console.log(res.data);
      }
    });

    requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/member/get"
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        this.setState({
          member: res.data
        });
      }
    });
  }

  joinGame = (id, no_of_slots_available) => {
    // let obj = {
    //   id: id,
    //   no_of_slots_available: parseInt(no_of_slots_available) - 1
    // };
    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/member/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: {
        id
      }
    };

    axios(requestOptions).then(res => {
      if (res.status === 200) {
        console.log(res.data);
        requestOptions = {
          method: "POST",
          url: "http://localhost:5000/api/posts/update-available-slots",
          headers: {
            "x-auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json"
          },
          data: {
            id
          }
        };

        axios(requestOptions).then(res => {
          if (res.status === 200) {
            alert("You have joined the game");
          }
        });
      }
    });

    this.setState({
      toggle: !this.state.toggle,
      toggle_id: id
    });
  };

  member = id => {
    for (let i = 0; i < this.state.member.length; i++) {
      if (this.state.member[i].event_id === id && this.state.member[i].user_id === this.state.userDetails.id) {
        this.setState({
          member_toggle: !this.state.member_toggle,
          member_toggle_id: id
        });
      }
    }
  };

  toggle = id => {
    this.setState({
      toggle: !this.state.toggle,
      toggle_id: id
    });
  };
  render() {
    return (
      <div>
        <Header />
        <Container className="border mt-3 p-3">
          {/* <div className="circular--landscape mt-4">
            <img src={require(`../../public/${this.state.club.image}`)} />
          </div> */}
          <h2>
            <strong>{this.state.club.club_name}</strong>
          </h2>
          <h4>{this.state.club.description}</h4>
          <Button color="dark">See Past Games</Button>
          <Container className="mt-3 p-3">
            <h2>Upcoming Game by {this.state.club_name}</h2>
            {this.state.games ? (
              <div>
                {this.state.games.map(game => (
                  <Container className="border m-3 p-2">
                    <h3 className="m-2">
                      <strong>{game.title}</strong>
                    </h3>
                    <img className="m-2" width="500px" height="auto" src={require(`../../public/${game.image}`)} />
                    <p className="m-2">
                      <strong>Address:</strong> {game.address}
                    </p>
                    <p className="m-2">
                      <strong>Sport Type: </strong> {game.sports_type_name}
                    </p>
                    <p className="m-2">
                      <strong>Total Slots: </strong> {game.no_of_slots}
                    </p>
                    <p className="m-2">
                      <strong>Available Slots: </strong> {game.no_of_slots_available}
                    </p>
                    {this.state.toggle === true && this.state.toggle_id === game._id ? (
                      <div>
                        <p className="m-2"> You are a member </p>
                        <Button className="m-2" color="danger" onClick={() => this.toggle(game._id)}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button onClick={() => this.joinGame(game._id, game.no_of_slots_available)} color="dark">
                        Join Game
                      </Button>
                    )}
                  </Container>
                ))}
              </div>
            ) : (
              <p>There are no upcoming games</p>
            )}
          </Container>
        </Container>
      </div>
    );
  }
}

export default Club;
