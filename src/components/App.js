import React, { Component } from 'react'

// CSS
import '../css/App.css'

// Components
import Keyboard from './Keyboard'
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
class App extends Component {
  state = {
    letters: this.generateKeyboard(),
    indexLettersUsed: [],
    indexLettersAvailable: [],
  }

  generateKeyboard() {
    return letters.split('')
  }

  handleClick = index => {
    console.log(index)
  }

  render() {
    return (
      <div className="keyboard">
        <Keyboard letters={this.state.letters} onClick={this.handleClick} />
      </div>
    )
  }
}

export default App
