import React from 'react';
// import './Letter.css';

const Letter = ({ active, color }) => {
  return (
    <div
      className={`letter ${active ? 'active' : ''}`}
      style={{
        backgroundColor: active ? color : 'black',
      }}
    ></div>
  );
};

export default Letter;
