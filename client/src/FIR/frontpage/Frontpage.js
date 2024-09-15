import React from 'react';
import './CrimePage.css';

import { useNavigate } from 'react-router-dom';


function FrontPage() {
    const navigate = useNavigate();
  const navigateToURL = () => {
    navigate('/signin')
  };

  return (
    <>
      <div className="crime-page">
        <div className="crime-content">
          <h1>Crime Awareness</h1>
          <p>
            Crime is a social and moral issue that affects societies worldwide.
            Understanding its causes and consequences can help us build safer communities.
          </p>
          <button onClick={navigateToURL} className="crime-button">SIGN UP</button>
        </div>
      </div>
    </>
  )
}

export default FrontPage