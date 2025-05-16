import React from 'react';
import './Header.css';

const MainHeader = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <header className="mheader">
      <div className="header-content">
        <h1>PRATS</h1>
        <h2>Service Provider Portal</h2>
        <div className="header-right">
  <span className="user-name">N Singh</span>
  
  <span className="date">Friday 16 May 2025</span>
</div>

      </div>
    </header>
  );
};

export default MainHeader;
