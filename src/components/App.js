import React, { Component } from 'react'

// CSS
import '../css/App.css'

// Components
import Keyboard from './Keyboard'

// Charger listes de mots
import wordList from '../wordList'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
class App extends Component {
  state = {
    word: this.getRandomWord(),
    letters: this.generateKeyboard(),
    usedLetters: [],
    rightLetters: [],
    mask: this.maskToDisplay(),
  }

  //renvoi un mot aléatoire issu de notre liste
  getRandomWord() {
    const min = 0
    const max = wordList.length
    return wordList[Math.floor(Math.random() * (max - min + 1)) + min].split('')
  }

  generateKeyboard() {
    return letters.split('')
  }

  handleClick = letter => {
    const word = this.state.word
    const usedLetters = [...this.state.usedLetters]
    const rightLetters = [...this.state.rightLetters]
    usedLetters.push(letter)
    if (word.indexOf(letter) > -1) {
      rightLetters.push(letter)
    }
    this.setState({ usedLetters, rightLetters })
  }

  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  maskToDisplay() {
    const mask = []
    for (let i = 0; i < this.state.word.length; i++) {
      const wordKey = this.state.word.indexOf(this.state.usedLetters[i]);
      if ( > -1) {
        mask.push(this.state.usedLetters[i])
      } else {
        mask.push('_')
      }
    }
    this.setState({ mask })
  }

  render() {
    return (
      <div className="container">
        <div className="maskWord">
          {this.state.mask.map((value, index) => (
            <span key="index">{value}</span>
          ))}
        </div>
        <div className="keyboard">
          <Keyboard
            letters={this.state.letters}
            onClick={this.handleClick}
            usedLetters={this.state.usedLetters}
            rightLetters={this.state.rightLetters}
          />
        </div>
      </div>
    )
  }
}

export default App
