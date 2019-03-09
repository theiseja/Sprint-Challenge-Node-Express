import React, { Component } from 'react';
import './App.css';
import Projects from './components/Projects.js'
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:9090/api/projects")
      .then(res => {
        this.setState({projects: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <h2>Projects</h2>
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;