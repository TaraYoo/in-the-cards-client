import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Question from './Question.js'
import { drawCards, createDeck } from '../api'
import messages from '../messages'
import Button from 'react-bootstrap/Button'
import './Cards.scss'
import SingleCard from './SingleCard'

class Cards extends Component {
  constructor () {
    super()

    this.state = {
      cards: [{
        id: 9999,
        name: 'Past',
        icon: '😁',
        meaning: 'This card represents the past'
      },
      {
        id: 9998,
        name: 'Present',
        icon: '😂',
        meaning: 'This card represents the present'
      },
      {
        id: 9997,
        name: 'Future',
        icon: '😃',
        meaning: 'This card represents the future'
      }],
      question: null
    }
  }

  onDraw = event => {
    event.preventDefault()

    drawCards()
      .then(res => {
        this.setState({
          cards: res.data.cards
        })
      })
      .catch(() => {
        this.props.alert(messages.drawFailure, 'danger')
      })
  }

  onSubmit = event => {
    event.preventDefault()

    const question = this.state.question
    createDeck(this.props.user, question)
      .then(res => {
        this.setState({
          cards: res.data.deck.formatted_cards
        })
        this.props.alert(messages.saveSuccess, 'success')
      })
      .catch(() => {
        this.props.alert(messages.saveFailure, 'danger')
      })
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      question: event.target.value
    })
  }

  render () {
    const { cards } = this.state
    return (
      <Fragment>
        <div className="row">
          {cards.map((card, index) => (
            <SingleCard key={card.id} card={card} index={index}/>
          ))}
        </div>
        { this.props.user ? <Question handleChange={this.handleChange} handleSubmit={this.onSubmit} user={this.props.user} /> : <Button variant="light" size="lg" onClick={this.onDraw} block>
                  Draw cards - sign in to save
        </Button>
        }
      </Fragment>
    )
  }
}

export default withRouter(Cards)
