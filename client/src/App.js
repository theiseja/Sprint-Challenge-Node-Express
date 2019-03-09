import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9090/api/projects")
      .then(res => {
        this.setState({ projects: res.data });
        console.log(this.state.projects);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.projects.map(project => {
          return (
            <div key={project.id}>
              <div>Project ID: {project.id}</div>
              <div>Description: {project.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;