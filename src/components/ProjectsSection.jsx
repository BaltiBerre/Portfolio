// ProjectSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, image }) => {
  return (
    <Link to={`/project/${id}`} className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover transition-all duration-300 filter grayscale group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-2xl font-bold text-center transition-all duration-300 group-hover:scale-110">
          {title}
        </h3>
      </div>
    </Link>
  );
};

const ProjectsSection = () => {
  const projects = [
    { id: 1, title: 'Project 1', image: 'path/to/image1.jpg' },
    { id: 2, title: 'Project 2', image: 'path/to/image2.jpg' },
    { id: 3, title: 'Project 3', image: 'path/to/image3.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;