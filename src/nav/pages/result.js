import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/result.css';

const Result = () => {
  const [pollData, setPollData] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/poll/results');
        setPollData(response.data);
      } catch {
        console.log('No results');
      }
    };

    fetchResults();
  }, []);

  if (!pollData) return <div>No Results Available</div>;

  return (
    <div className="voting-container">
      <h2 className="ct-headline">Results</h2>

      <table className="voting-table">
        <thead>
          <tr>
            <th>Option</th>
            <th>Votes</th>
          </tr>
        </thead>

        <tbody>
          {pollData.options.map((option) => (
            <tr key={option._id}>
              <td>{option.name}</td>
              <td>{option.votes ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;