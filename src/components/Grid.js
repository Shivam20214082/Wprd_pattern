import React from 'react';
import './Grid.css';

const Grid = ({ activeColumns }) => {
  const numRows = 15;
  const numCols = 20;

  // Create a 2D grid of 15x20 divs
  const grid = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  // Mark the active columns as true (to indicate that they should be red)
  activeColumns.forEach(colIndex => {
    for (let row = 0; row < numRows; row++) {
      grid[row][colIndex] = true;
    }
  });

  return (
    <div className="grid-container">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`grid-cell ${cell ? 'active' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
