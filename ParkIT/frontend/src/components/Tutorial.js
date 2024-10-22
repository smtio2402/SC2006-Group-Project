import React, { useState } from 'react';
import axios from 'axios';

const Tutorial = ({ userId, onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to ParkIT!',
      content:
        'This tutorial will guide you through the main features of our app.',
    },
    {
      title: 'Finding a Car Park',
      content: 'Use the search bar to find car parks near your destination.',
    },
    {
      title: 'Car Park Details',
      content:
        'Click on a car park to see its details, including availability and rates.',
    },
    {
      title: 'Check In/Out',
      content:
        'Use the check-in and check-out features to track your parking time and expenses.',
    },
    {
      title: "That's it!",
      content: "You're all set to use ParkIT. Enjoy hassle-free parking!",
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      completeTutorial();
    }
  };

  const handleSkip = () => {
    completeTutorial();
  };

  const completeTutorial = async () => {
    try {
      await axios.post(
        `http://localhost:5001/api/auth/users/${userId}/complete-tutorial`
      );
      onComplete(); // Call the onComplete function passed from the parent
    } catch (error) {
      console.error('Error completing tutorial:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-bold">{steps[step].title}</h3>
        <p className="mt-2">{steps[step].content}</p>
        <div className="mt-3 flex justify-between">
          <button
            onClick={handleSkip}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {step < steps.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
