import React from 'react';
import { PROJECTS } from './data';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {PROJECTS.map((project) => (
          <div key={project.id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="tag-container">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            <div className="card-links">
              <a href={project.github} target="_blank" rel="noreferrer" className="card-link">GitHub</a>
              <a href={project.demo} target="_blank" rel="noreferrer" className="card-link highlight-link">Live </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}