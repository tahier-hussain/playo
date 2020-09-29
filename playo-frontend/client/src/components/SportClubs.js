import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";

class SportClubs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: JSON.parse(localStorage.getItem("user-details")),
      clubs: []
    };
  }

  componentDidMount() {
    let requestOptions = {
      method: "GET",
      url: "http://localhost:5000/api/sports-club/get"
    };

    axios(requestOptions).then(res => {
      this.setState({
        clubs: res.data.slice(0, 2)
      });
    });
  }
  render() {
    return (
      <div>
        <Container className=" border pt-3 pb-3 pl-5 pr-5 mt-2 mb-5">
          <h1>
            <strong>Sport Clubs</strong>
          </h1>
          {this.state.clubs ? (
            <div>
              {this.state.clubs.map(club => (
                <Container>
                  <div className="border pt-2 pb-2 pl-5 pr-5 mb-3">
                    <h3 className="mt-2">{club.club_name}</h3>
                    <img width="500px" height="auto" src={require(`../../public/${club.image}`)} />
                    <p className="pt-0">{club.description}</p>
                    <p>
                      <strong>Sport Type: {club.sports_type}</strong>
                    </p>
                    {this.state.userDetails.type === "admin" ? (
                      <div>
                        <button className="btn btn-primary mr-2">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Container>
              ))}
            </div>
          ) : (
            <p>No Upcoming Games</p>
          )}
          <Button color="dark">See More</Button>
        </Container>
      </div>
    );
  }
}

export default SportClubs;
