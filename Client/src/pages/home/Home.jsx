import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartCreating = () => {
    // This function will navigate to the document creation page
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-4">
      {/* Hero Section */}
      <main className="max-w-4xl mx-auto mt-16">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight font-[Manrope]">
          Write Smarter, Not Harder.
          <br />
          <span className="text-blue-600">Your AI-Powered Document Assistant.</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto font-[Manrope]">
          From generating ideas to drafting content, our AI helps you create beautiful documents in minutes, not hours.
        </p>
        <div className="mt-10">
          <button
            onClick={handleStartCreating}
            className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out font-[Manrope]"
          >
            Start Creating for Free
          </button>
        </div>
      </main>

      {/* Placeholder for Features Section (You can add this later) */}
      <div className="mt-20 w-full max-w-6xl">
{/*         
        <h2 className="text-3xl font-bold text-gray-900">Features</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">AI-Powered Drafting</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Real-time Collaboration</div>
          <div className="bg-white p-6 rounded-lg shadow-md">Smart Formatting</div>
        </div>
        */}
      </div>
    </div>
  );
};

export default Home;