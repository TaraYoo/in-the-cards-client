import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Question from './Question.js'
import { drawCards, createDeck } from '../api'
// import messages from '../messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
    console.log('fired')

    const question = this.state.question
    console.log(question)
    if (this.props.user) {
      createDeck(this.props.user, question)
        .then(res => {
          this.setState({
            cards: res.data.deck.formatted_cards
          })
        })
        .then(console.error)
    } else {
      drawCards()
        .then(res => {
          this.setState({
            cards: res.data.cards
          })
        })
        .catch(console.error)
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      question: event.target.value
    })
    console.log('fired')
  }

  render () {
    const { cards } = this.state

    return (
      <Fragment>
        <div className="row">
          {cards.map(card => (
            <div key={card.id} className="col-sm-4 col-12 mb-5">
              <Card key={card.id} style={{ width: '18rem' }} className="tarot-cards">
                <Card.Img variant="top" src="" />
                <Card.Body>
                  <Card.Text className="icons">
                    {card.icon}
                  </Card.Text>
                  <Card.Title className="title">{card.name}</Card.Title>
                  <Card.Text>
                    {card.meaning}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        { this.props.user ? <Question handleChange={this.handleChange} handleSubmit={this.onDraw} user={this.props.user} /> : <Button variant="light" size="lg" onClick={this.onDraw} block>
                  Draw cards - sign in to save
        </Button>
        }
      </Fragment>
    )
  }
}

export default withRouter(Cards)
