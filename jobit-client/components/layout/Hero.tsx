import React from "react";

const Hero: React.FC = () => {
  return (
    <div
      className="bg-cover bg-center h-3/5"
      style={{ backgroundImage: `url("img/pattern.svg")` }}
    >
      <div className="flex justify-center py-12 text-center">
        <div className="md:w-1/2 rounded-md bg-gray-800 p-12">
          <h1 className="text-5xl text-blue-500 font-bold mb-4">With jobIT</h1>
          <p className="text-2xl text-white font-bold">
            you can search millions of jobs online to find the next step in your
            career in IT
          </p>
        </div>
      </div>
      <div className="md:flex justify-center pb-12">
        <div className="mb-6 p-6 rounded-md bg-gray-800 md:mr-5 md:mb-0">
          <img src="img/suitcase.svg" className="h-12 w-auto" />
          <p className="text-2xl text-yellow-200 font-bold">Look for a job</p>
        </div>
        <div className="mb-6 p-6 rounded-md bg-gray-800 md:mr-5 md:mb-0">
          <img src="img/aim.svg" className="h-12 w-auto" />
          <p className="text-2xl text-yellow-200 font-bold">
            Match your profile
          </p>
        </div>
        <div className="mb-6 p-6 rounded-md bg-gray-800 md:mr-5 md:mb-0">
          <img src="img/deal.svg" className="h-12 w-auto" />
          <p className="text-2xl text-yellow-200 font-bold">Get a contract</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
