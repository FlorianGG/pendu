import React from 'react'
//CSS
import '../css/Keyboard.css'

const Keyboard = ({ letters, onClick }) => (
  <div className="keyboard">
    {letters.map((letter, index) => (
      <button
        key={index}
        className="buttonKeyboard"
        onClick={() => onClick(index)}
      >
        {letter}
      </button>
    ))}
  </div>
)

export default Keyboard
