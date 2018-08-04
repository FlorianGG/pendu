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
    mask: [],
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
    const { word } = this.state
    const usedLetters = [...this.state.usedLetters]
    const rightLetters = [...this.state.rightLetters]
    usedLetters.push(letter)
    if (word.indexOf(letter) > -1) {
      rightLetters.push(letter)
    }
    const mask = this.maskToDisplay(word, usedLetters)
    this.setState({ usedLetters, rightLetters, mask })
  }

  componentWillMount() {
    const { word, usedLetters } = this.state
    const mask = this.maskToDisplay(word, usedLetters)
    this.setState({ mask })
  }
  // Produit une représentation textuelle de l’état de la partie,
  // chaque lettre non découverte étant représentée par un _underscore_.
  maskToDisplay(word, usedLetters) {
    let mask = []
    for (let i = 0; i < word.length; i++) {
      if (usedLetters.indexOf(word[i]) > -1) {
        mask.push(word[i])
      } else {
        mask.push('_')
      }
    }
    return mask
  }

  render() {
    const { word, letters, usedLetters, rightLetters, mask } = this.state
    const won = usedLetters.length === word.lenght
    return (
      <div className="container">
        <div className="maskWord">
          {mask.map((letter, index) => <span key={index}>{letter}</span>)}
        </div>
        <div className="keyboard">
          {!won && (
            <Keyboard
              letters={letters}
              onClick={this.handleClick}
              usedLetters={usedLetters}
              rightLetters={rightLetters}
            />
          )}
        </div>
      </div>
    )
  }
}

export default App
