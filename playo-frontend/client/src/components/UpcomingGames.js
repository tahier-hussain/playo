import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class UpcomingGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      upcomingGames: []
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/posts/upcoming-events-two"
    };

    axios(requestOptions).then(res => {
      this.setState({
        upcomingGames: res.data
      });
    });
  }
  render() {
    return (
      <div>
        <Container className=" border pt-3 pb-3 pl-5 pr-5 mt-2 mb-5">
          <h1>
            <strong>Upcoming Sport Games</strong>
          </h1>
          {this.state.upcomingGames ? (
            <div>
              {this.state.upcomingGames.map(game => (
                <Container className="border pt-2 pb-2 pl-5 pr-5 mb-3">
                  <h2 className="mt-2">
                    <Link to={`/club/${game.sports_club_id}`}>{game.sports_club_name}</Link>
                  </h2>
                  <img width="500px" height="auto" src={require(`../../public/${game.image}`)} />
                  <p>
                    <strong>{game.title}</strong>
                  </p>
                  <p>{game.description}</p>
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
          <Button href="/list-of-games" color="dark">
            See More
          </Button>
        </Container>
      </div>
    );
  }
}

export default UpcomingGames;
