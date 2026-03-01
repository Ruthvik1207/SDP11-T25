import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../css/voting.css';

const Voting = () => {
  const [pollData, setPollData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPollOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/poll/options');
        setPollData(response.data);
      } catch (err) {
        setError('Could not load poll data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPollOptions();
  }, []);

  const handleVote = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setError("Please select an option.");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post('http://localhost:5000/api/vote', {
        optionId: selectedOption,
      });

      navigate('/result');

    } catch {
      setError('Vote failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">{error}</div>;
  if (user?.hasVoted) return <div className="voting-container"><h2>Already Voted</h2></div>;
  if (!pollData) return <div className="voting-container"><h2>No Poll Active</h2></div>;

  return (
    <div className="voting-container">
      <h2 className="ct-headline">{pollData.title}</h2>

      <form onSubmit={handleVote}>
        <table className="voting-table">
          <thead>
            <tr>
              <th className="table-header">Option</th>
              <th className="table-header">Select</th>
            </tr>
          </thead>

          <tbody>
            {pollData.options.map((option) => (
              <tr key={option._id}>
                <td className="table-data">{option.name}</td>
                <td className="table-data">
                  <input
                    type="radio"
                    checked={selectedOption === option._id}
                    onChange={() => setSelectedOption(option._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button type="submit" disabled={!selectedOption || isSubmitting}>
          Submit Vote
        </button>
      </form>
    </div>
  );
};

export default Voting;