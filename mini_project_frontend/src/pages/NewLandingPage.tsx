import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const NewLandingPage: React.FC = () => {
  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="landing-logo">Salary Disbursement System</div>
        <nav className="landing-nav">
          <Link to="/login" className="landing-login-btn">
            Sign In
          </Link>
        </nav>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <h1>Welcome to Salary Disbursement System</h1>
          <p>Efficient and secure salary processing</p>
          <Link to="/login" className="landing-cta">
            Get Started
          </Link>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          &copy; {new Date().getFullYear()} Salary Disbursement System
        </div>
      </footer>
    </div>
  );
};

export default NewLandingPage;
