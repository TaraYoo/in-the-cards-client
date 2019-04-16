import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

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
        meaning: 'This card represents the past'
      },
      {
        id: 9997,
        name: 'Future',
        icon: '😃',
        meaning: 'This card represents the past'
      }]
    }
  }

  onDraw = event => {
    event.preventDefault()

    if (this.props.user) {
      createDeck(this.props.user)
        .then(res => {
          this.setState({
            cards: res.data.deck.formatted_cards
          })
          console.log(this.state)
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

  render () {
    const { cards } = this.state

    return (
      <Fragment>
        {cards.map(card => (
          <Card key={card.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src="" />, Fragment
            <Card.Body>
              <Card.Text>
                {card.icon}
              </Card.Text>
              <Card.Title>{card.name}</Card.Title>
              <Card.Text>
                {card.meaning}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        <Button variant="primary" size="lg" onClick={this.onDraw} block>
          { this.props.user ? 'Draw cards' : 'Draw cards - sign in to save' }
        </Button>
      </Fragment>
    )
  }
}

export default withRouter(Cards)
