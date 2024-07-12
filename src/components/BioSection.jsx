// BioSection.jsx
import React from 'react';

const BioSection = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Hi, I'm Balti </h2>
          <p className="text-lg text-gray-700">
          I’m currently studying Computer Science at the College of Wooster. Originally from Uruguay, I spent 11 years living in Brazil, which has shaped my multicultural perspective. I’m passionate about learning about systems and finding ways to make a positive impact through technology. While I’m still exploring which subfield of computer science to pursue, I’ve worked on diverse projects, from video games to music plugins, and I’m excited to see where my journey in tech will lead me. <br></br> Beyond technology, I’m deeply passionate about music, especially house music, bossa nova, and cumbia. I love sound design and music production, and I’m also a DJ who enjoys creating and sharing musical experiences. My love for music and tech often intersects, inspiring creative projects and innovative approaches to both fields.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="w-64 h-64 bg-gray-300 rounded-full mx-auto">
            {/* Placeholder for your image */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Your Photo Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSection;