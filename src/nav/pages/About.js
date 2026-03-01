import React, { useEffect } from 'react';
import '../css/About.css';
import { FaBullseye, FaShieldAlt, FaUsers, FaLightbulb } from 'react-icons/fa';

function About() {
  useEffect(() => {
    const handleScrollAnimations = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.classList.add('show');
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();

    return () => {
      window.removeEventListener('scroll', handleScrollAnimations);
    };
  }, []);

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title animate-on-scroll">About VoteForChange</h1>
          <p className="about-subtitle animate-on-scroll">
            Transforming democratic processes through secure, accessible, and transparent online voting
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-content">
            <h2 className="section-heading animate-on-scroll">Our Mission</h2>
            <p className="section-text animate-on-scroll">
              VoteForChange is revolutionizing how organizations conduct elections. Our mission is to make democratic voting accessible, secure, and transparent for everyone, regardless of their location or technical expertise. We believe that every voice deserves to be heard, counted, and protected.
            </p>
            <p className="section-text animate-on-scroll">
              Founded with the vision of eliminating barriers to participate in important decision-making, VoteForChange provides a cutting-edge platform that combines military-grade security with user-friendly design. From corporate board elections to community referendums, we empower organizations to conduct fair, verifiable, and inclusive votes.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section alternate-bg">
        <div className="container">
          <h2 className="section-heading text-center animate-on-scroll">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card animate-on-scroll">
              <div className="value-icon">🔒</div>
              <h3>Security</h3>
              <p>End-to-end encryption and blockchain verification ensure every vote is secure, tamper-proof, and anonymous</p>
            </div>
            <div className="value-card animate-on-scroll">
              <div className="value-icon">🎯</div>
              <h3>Transparency</h3>
              <p>Complete audit trails and verifiable results give all stakeholders confidence in the election process</p>
            </div>
            <div className="value-card animate-on-scroll">
              <div className="value-icon">♿</div>
              <h3>Accessibility</h3>
              <p>User-friendly interface supporting multiple languages and accessibility features for everyone</p>
            </div>
            <div className="value-card animate-on-scroll">
              <div className="value-icon">⚡</div>
              <h3>Innovation</h3>
              <p>Continuously evolving technology to meet changing needs and emerging security challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-heading text-center animate-on-scroll">Why Choose VoteForChange?</h2>
          <div className="features-list">
            <div className="feature-item animate-on-scroll">
              <FaShieldAlt className="feature-icon" />
              <div className="feature-content">
                <h3>Military-Grade Security</h3>
                <p>Your votes are protected with the same encryption standards used by governments and financial institutions worldwide</p>
              </div>
            </div>
            <div className="feature-item animate-on-scroll">
              <FaUsers className="feature-icon" />
              <div className="feature-content">
                <h3>Global Scalability</h3>
                <p>Support for organizations of any size, from small teams to millions of voters across multiple countries</p>
              </div>
            </div>
            <div className="feature-item animate-on-scroll">
              <FaLightbulb className="feature-icon" />
              <div className="feature-content">
                <h3>Intuitive Design</h3>
                <p>Simple and clean interface that requires minimal training, making voting easy for everyone</p>
              </div>
            </div>
            <div className="feature-item animate-on-scroll">
              <FaBullseye className="feature-icon" />
              <div className="feature-content">
                <h3>Dedicated Support</h3>
                <p>24/7 expert support team ready to help with setup, troubleshooting, and compliance requirements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="about-section alternate-bg">
        <div className="container">
          <h2 className="section-heading text-center animate-on-scroll">Our Technology</h2>
          <div className="tech-content">
            <div className="tech-card animate-on-scroll">
              <h3>Blockchain Verification</h3>
              <p>Every vote is recorded on a distributed ledger, ensuring tamper-proof records and complete transparency</p>
            </div>
            <div className="tech-card animate-on-scroll">
              <h3>End-to-End Encryption</h3>
              <p>Military-grade AES-256 encryption protects voter identity and ensures ballot secrecy throughout the voting process</p>
            </div>
            <div className="tech-card animate-on-scroll">
              <h3>Real-Time Analytics</h3>
              <p>Instant result aggregation and visualization with detailed demographic breakdowns and trend analysis</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2 className="animate-on-scroll">Ready to Transform Your Elections?</h2>
          <p className="animate-on-scroll">Join organizations worldwide using VoteForChange for secure, transparent voting</p>
          <button className="btn-primary animate-on-scroll">Get Started Today</button>
        </div>
      </section>
    </div>
  );
}

export default About;