import React, { Component } from 'react'

// CSS
import '../css/App.css'

// Components
import Keyboard from './Keyboard'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

class App extends Component {
  state = {
    keyboard: this.generateKeyboard(),
  }
  generateKeyboard() {
    return letters.split('')
  }
  render() {
    const lettersInArray = this.state.keyboard
    return (
      <div className="keyboard">
        {lettersInArray.map((letter, index) => (
          <Keyboard key={index} letter={letter} />
        ))}
      </div>
    )
  }
}

export default App
