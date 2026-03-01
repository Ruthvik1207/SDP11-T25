import React from 'react';
import '../css/UserVoting.css';

function Createdpoll() {

  const members = [
    { id: 1, name: "AP ELECTIONS", options: "TDP", description: "Telugu Desam Party" },
    { id: 2, name: "AP ELECTIONS", options: "JSP", description: "Jana Sena Party" },
    { id: 3, name: "AP ELECTIONS", options: "YSRCP", description: "YSR Congress Party" },
    { id: 4, name: "AP ELECTIONS", options: "CONGRESS", description: "Indian National Congress" },
  ];

  return (
    <div className="voting-container">
      <h2 className="ct-headline">Created Voting</h2>

      <table className="voting-table">
        <thead>
          <tr>
            <th className="table-header">Title</th>
            <th className="table-header">Options</th>
            <th className="table-header">Description</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="table-data">{member.name}</td>
              <td className="table-data">{member.options}</td>
              <td className="table-data">{member.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Createdpoll;