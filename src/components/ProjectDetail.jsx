// ProjectDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams();
  
  // In a real application, you would fetch project details based on the id
  const project = {
    id: id,
    title: `Project ${id}`,
    description: 'This is a detailed description of the project. It includes information about the technologies used, the challenges faced, and the solutions implemented.',
    image: 'path/to/project-image.jpg',
    technologies: ['React', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/yourusername/project-repo',
    liveDemo: 'https://project-demo-url.com'
  };

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">&larr; Back to Projects</Link>
        <h1 className="text-4xl font-bold text-blue-600 mb-6">{project.title}</h1>
        <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg shadow-lg mb-8" />
        <p className="text-gray-700 mb-6">{project.description}</p>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Technologies Used</h2>
        <ul className="list-disc list-inside mb-6">
          {project.technologies.map((tech, index) => (
            <li key={index} className="text-gray-700">{tech}</li>
          ))}
        </ul>
        <div className="flex space-x-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
            View on GitHub
          </a>
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;