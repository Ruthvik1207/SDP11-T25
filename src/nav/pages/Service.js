import React from 'react';
import '../css/features.css';

function Service() {
  const votingFeatures = [
    {
      icon: '🔒',
      title: 'End-to-End Encryption',
      description: 'Military-grade encryption ensures your votes are completely secure and private. Your identity remains anonymous throughout the voting process.'
    },
    {
      icon: '📱',
      title: 'Mobile Accessible',
      description: 'Vote from any device - smartphones, tablets, or desktops with seamless experience. Our platform works offline and syncs when connection is restored.'
    },
    {
      icon: '⚡',
      title: 'Real-Time Analytics',
      description: 'Live voting statistics and instant result visualization for election organizers. Track participation rates, demographics, and trends as votes come in.'
    },
    {
      icon: '🎯',
      title: 'Precise Vote Counting',
      description: 'Accurate vote counting with blockchain verification for complete transparency. Every vote is verified and cannot be altered or duplicated.'
    },
    {
      icon: '🌍',
      title: 'Global Accessibility',
      description: 'Support for 50+ languages and international standards. Voters can participate from any country with secure cross-border voting capabilities.'
    },
    {
      icon: '🛡️',
      title: 'Fraud Detection',
      description: 'Advanced AI-powered fraud detection prevents duplicate votes and detects suspicious patterns. Complete audit trail for every transaction.'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center1">
            <div className="section-heading">
              <h2>Powerful Features</h2>
              <p className="text-muted">Secure - Swift - Simple | Everything for Modern Elections</p>
            </div>
          </div>
        </div>

        <div className="features-grid-container">
          {votingFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-badge">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Service;