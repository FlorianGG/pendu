import React, { Component } from 'react'

// CSS
import '../css/App.css'

// Components
import Keyboard from './Keyboard'

// Charger listes de mots
import wordList from '../wordList'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const maxTry = 10
class App extends Component {
  state = {
    nbBadTry: 0,
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
    let nbBadTry = this.state.nbBadTry
    let test = word.indexOf(letter)
    if (test === -1) nbBadTry++
    usedLetters.push(letter)
    while (test !== -1) {
      rightLetters.push(letter)
      test = word.indexOf(letter, test + 1)
    }
    const mask = this.maskToDisplay(word, usedLetters)
    this.setState({ usedLetters, rightLetters, mask, nbBadTry })
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
  //on veut binder le this pour récupérer les states
  relaunchNewGame = () => {
    const word = this.getRandomWord()
    const usedLetters = []
    const rightLetters = []
    const nbBadTry = 0
    const mask = this.maskToDisplay(word, usedLetters)
    this.setState({ word, usedLetters, rightLetters, mask, nbBadTry })
  }

  componentWillMount() {
    const { word, usedLetters } = this.state
    const mask = this.maskToDisplay(word, usedLetters)
    this.setState({ mask })
  }

  render() {
    const {
      word,
      letters,
      usedLetters,
      rightLetters,
      mask,
      nbBadTry,
    } = this.state
    const lose = nbBadTry >= maxTry
    const won = rightLetters.length === word.length && !lose
    const remaingTrys = maxTry - nbBadTry
    return (
      <div className="container">
        <div className="remaingTrys">{remaingTrys}</div>
        <div className="gameContainer">
          <div className="maskWord">
            {mask.map((letter, index) => <span key={index}>{letter}</span>)}
          </div>
          <div className="endGameText">
            {won && <span className="win">You Win !</span>}
            {lose && <span className="lose">You Lose !</span>}
          </div>
          <div className="keyboard">
            {!won &&
              !lose && (
                <Keyboard
                  letters={letters}
                  onClick={this.handleClick}
                  usedLetters={usedLetters}
                  rightLetters={rightLetters}
                />
              )}
            {(won || lose) && (
              <button className="success" onClick={this.relaunchNewGame}>
                Recommencer une nouvelle partie
              </button>
            )}
          </div>
        </div>
        <div className="remaingTrys">{remaingTrys}</div>
      </div>
    )
  }
}

export default App
