import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      actions: []
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

  /*     axios
      .get("http://localhost:9090/api/actions")
      .then(res => {
        this.setState({ projects: res.data });
        console.log(this.state.projects);
      })
      .catch(err => {
        console.log(err);
      }); */
  }

  addProject = newProject => {
    axios
      .post("http://localhost:9090/api/project", newProject)
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/");
  };

  deleteProject = id => {
    axios
      .delete(`http://localhost:/api/project/${id}`)
      .then(res => {
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log(err);
      });

    this.props.history.push("/");
  };


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