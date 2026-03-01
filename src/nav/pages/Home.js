import React from 'react';
import '../css/Home.css';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShieldAlt, FaUsers, FaChartBar, FaUserTie, FaMobileAlt } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Bank-Level Security',
      description: 'End-to-end encrypted voting with multi-factor authentication'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Mobile Responsive',
      description: 'Vote from any device, anywhere, anytime'
    },
    {
      icon: <FaChartBar />,
      title: 'Real-Time Results',
      description: 'Instant analytics and live voting statistics'
    },
    {
      icon: <FaUsers />,
      title: 'Scalable Platform',
      description: 'Support for organizations of any size'
    }
  ];

  const steps = [
    { number: '01', title: 'Create Account', description: 'Sign up and set up your election' },
    { number: '02', title: 'Add Candidates', description: 'Configure voting options and parameters' },
    { number: '03', title: 'Invite Voters', description: 'Send invitations to your participants' },
    { number: '04', title: 'View Results', description: 'Monitor and analyze voting outcomes' }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaCheckCircle /> Democratic Voting Made Simple
            </div>
            <h1 className="hero-title">
              Secure Online Voting Platform
              <span className="gradient-text"> for Modern Organizations</span>
            </h1>
            <p className="hero-subtitle">
              Empower your organization with transparent, secure, and accessible voting technology. 
              From corporate decisions to community elections—all in one platform.
            </p>
            <div className="hero-description">
              <p className="hero-detail">
                Our platform combines military-grade encryption, blockchain verification, and intuitive design to ensure every vote is counted securely and accurately. Whether you're running corporate elections, student body votes, or community referendums, VoteForChange provides the tools you need for transparent, accessible, and fraud-free elections.
              </p>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/login')}>
                Start Voting Now
              </button>
              <button className="btn-secondary" onClick={() => navigate('/about')}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose VoteForChange?</h2>
            <p>Everything you need for secure, transparent elections</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card card-hover">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple 4-step process to conduct your election</p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < steps.length - 1 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why VoteForChange Section */}
      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <h2>Why VoteForChange?</h2>
            <p>The most secure and accessible voting platform available</p>
          </div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🔐</div>
              <h3>Military-Grade Security</h3>
              <p>End-to-end encryption with blockchain verification ensures every vote is secure, tamper-proof, and cannot be traced back to the voter. Your voting data is protected with the same standards used by governments and financial institutions.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">⚡</div>
              <h3>Lightning Fast Results</h3>
              <p>Get instant election results with detailed analytics. Our platform processes votes in real-time, providing immediate feedback and comprehensive statistics for organizers and participants alike.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">👥</div>
              <h3>Fully Accessible</h3>
              <p>Designed for everyone. Vote from any device, anywhere in the world. Mobile-first interface supports multiple languages and accessibility features ensuring no one is left behind in the voting process.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">✅</div>
              <h3>Compliance & Auditing</h3>
              <p>GDPR compliant with full audit trails and transparency reports. Every action is logged and can be verified independently. Meets international standards for fair elections and data protection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Democratize Your Decisions?</h2>
            <p>Join thousands of organizations using VoteForChange</p>
            <button className="btn-primary" onClick={() => navigate('/signup')}>
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;