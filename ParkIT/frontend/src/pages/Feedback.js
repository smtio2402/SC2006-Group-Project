import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const baseurl = process.env.REACT_APP_API_URL;

const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('feedback', feedback);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    try {
      const response = await axios.post(`${baseurl}/api/feedback`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Feedback submitted successfully!');
      setFeedback('');
      setImage(null);
      setVideo(null);
    } catch (error) {
      setMessage('Error submitting feedback. Please try again.');
      console.error('Error submitting feedback:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="feedback" className="block mb-2">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">
            Attach Image (optional)
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="video" className="block mb-2">
            Attach Video (optional)
          </label>
          <input
            type="file"
            id="video"
            onChange={handleVideoChange}
            accept="video/*"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-[#707ab4] text-white py-2 px-4 rounded hover:opacity-70"
        >
          Submit Feedback
        </button>
      </form>
      {message && <p className="mt-4 text-[#70b49c]">{message}</p>}
    </div>
  );
};

export default Feedback;
