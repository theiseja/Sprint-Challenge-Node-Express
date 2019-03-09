import React from 'react';

const Projects = props => {
  return (
    <div className="project-container">
      {props.projects.map(project => {
      return (
        <div key={project.id}>
          <h4>{project.name}</h4>
          <p>{project.description}</p>
        </div>
      );
      })}
    </div>
  )
}

export default Projects;