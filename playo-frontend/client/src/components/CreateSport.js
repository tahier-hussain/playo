import React, { Component } from "react";
import { Container, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import Header from "./Header";

class CreateSport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      file: ""
    };
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

  submitHandler = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("name", this.state.name);

    let requestOptions = {
      method: "POST",
      url: "http://localhost:5000/api/sport/add",
      headers: {
        "x-auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      data: formData
    };

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
              <h2> Add new sport </h2>
            </Col>
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input type="text" name="name" id="name" placeholder="name" onChange={this.changeHandler} />
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
                Add
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default CreateSport;
