import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [grid, setGrid] = useState(Array(15).fill().map(() => Array(15).fill(false))); // 15x15 grid
  const [shiftIndex, setShiftIndex] = useState(15); // Start at column 15
  const [currentWord, setCurrentWord] = useState(''); // Store the current word
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Start with the first letter
  const [waitingForNextLetter, setWaitingForNextLetter] = useState(false); // Flag for letter timing
  const [showDialog, setShowDialog] = useState(false); // Show dialog between words
  const [dialogMessage, setDialogMessage] = useState(''); // Message for the dialog box

  // Fetch a random word from the API
  const fetchRandomWord = async () => {
    try {
      
      const response = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
      const newWord = response.data[0].toUpperCase();
      setDialogMessage('Previous Word: '+newWord);
      setCurrentWord(newWord); // Set word to uppercase
      setCurrentLetterIndex(0); // Reset letter index
      setShiftIndex(15); // Reset shift index for new word
      setShowDialog(false); // Hide dialog when new word starts


    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  // Call the fetchRandomWord function on initial load
  useEffect(() => {
    fetchRandomWord();
  }, []);

  useEffect(() => {
    const createLetter = (letter, shift) => {
      let gridCopy = Array(8).fill().map(() => Array(15).fill(false));
      
      const letterPattern = {
        'A': [
          [0, 2], [1, 1], [1, 3], [2, 0], [2, 4], [3, 0], [3, 4], [4, 0], [4, 4], [2, 2]
        ],
        'B': [
          [0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [2, 1], [3, 0], [4, 0], [4, 1], [4, 2], [3, 2], [2, 2], [1, 2]
        ],
        'C': [
          [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [4, 1], [4, 2], [4, 3]
        ],
        'D': [
          [0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [3, 0], [4, 0],[4,1], [4, 2], [3, 2], [2, 2], [1, 2]
        ],
        'E': [
          [0, 0], [0, 1], [0, 2], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2], [2, 1], [2, 2]
        ],
        'F': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [2, 2], [0, 1], [0, 2]
        ],
        'G': [
          [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [4, 1], [4, 2], [4, 3], [3, 4], [2, 3]
        ],
        'H': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [2, 2]
        ],
        'I': [
          [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]
        ],
        'J': [
          [0, 3], [1, 3], [2, 3], [3, 3], [4, 1], [4, 2]
        ],
        'K': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [1, 2], [3, 2], [0, 3], [4, 3]
        ],
        'L': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [4, 2]
        ],
        'M': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1], [2, 2], [1, 3], [0, 4], [1, 4], [2, 4],[3,4],[4,4]
        ],
        'N': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [1, 1], [2, 2], [3, 3]
        ],
        'O': [
          [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [4, 1], [4, 2], [4, 3], [1, 4], [3, 4]
        ],
        'P': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [0, 2], [1, 3], [2, 3], [3, 2]
        ],
        'Q': [
          [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [4, 1], [4, 2], [4, 3], [1, 4], [3, 4], [2, 2], [3, 3], [4, 4]
        ],
        'R': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [4, 2]
        ],
        'S': [
          [0, 1], [0, 2], [1, 0], [2, 1], [2, 2], [2, 3], [3, 3], [4, 1], [4, 2]
        ],
        'T': [
          [0, 1], [0, 2], [0, 3], [1, 2], [2, 2], [3, 2], [4, 2]
        ],
        'U': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 4], [1, 4], [2, 4], [3, 4], [4, 1], [4, 2], [4, 3]
        ],
        'V': [
          [0, 0],[1,0], [2, 1], [3, 2], [2, 3], [1, 4], [0, 4]
        ],
        'W': [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [3, 1], [2, 2], [3, 3], [4, 4],[3,4],[2,4],[1,4],[0,4]
        ],
        'X': [
          [0, 0], [0, 4], [1, 1], [1, 3], [2, 2], [3, 1], [3, 3], [4, 0], [4, 4]
        ],
        'Y': [
          [0, 0], [0, 4], [1, 1], [1, 3], [2, 2], [3, 2], [4, 2]
        ],
        'Z': [
          [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 2], [3, 1], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]
        ]
      };

      const pattern = letterPattern[letter];
      if (pattern) {
        pattern.forEach(([row, col]) => {
          if (col + shift < 15) gridCopy[row][col + shift] = true;
        });
      }

      return gridCopy;
    };

    const createText = () => {
      let gridCopy = Array(8).fill().map(() => Array(15).fill(false));
      const letter = currentWord[currentLetterIndex];
      gridCopy = createLetter(letter, shiftIndex);

      setGrid([...gridCopy]);

      if (!waitingForNextLetter) {
        if (shiftIndex > -2) {
          setShiftIndex(shiftIndex - 1);
        } else {
          if (currentLetterIndex < currentWord.length - 1) {
            setWaitingForNextLetter(true);
            setTimeout(() => {
              setWaitingForNextLetter(false);
              setCurrentLetterIndex(currentLetterIndex + 1);
              setShiftIndex(15);
            }, 500); // Adjust timing between letters
          } else {
            setShowDialog(true); // Show dialog after word completes
            setTimeout(() => {
              setShowDialog(false);
              fetchRandomWord(); // Fetch a new random word
            }, 2000); // Show dialog for 2 seconds
          }
        }
      }
    };

    const interval = setInterval(() => {
      if (!waitingForNextLetter && !showDialog) createText();
    }, 60);

    return () => clearInterval(interval);
  }, [shiftIndex, currentLetterIndex, currentWord, waitingForNextLetter, showDialog]);

  return (
    <div className="App">
      <h1>How Sharp Are Your Senses?</h1>
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
      {showDialog && (
        <div className="dialog">
          <p>{dialogMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App;
