import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
//
import { getDeck } from '../api'
// import messages from '../messages'
// import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Deck extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deck: null
    }
  }

  componentDidMount () {
    const searchId = parseInt(this.props.match.params.id)

    getDeck(this.props.user, searchId)
      .then(res => {
        this.setState({
          deck: res.data.deck
        })
      })
      .catch(console.error)
  }

  render () {
    // const formattedCards = this.state.deck.formatted_cards
    if (!this.state.deck) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
      const { question } = this.state.deck
      const readingDate = this.state.deck.reading_date
      const formattedCards = this.state.deck.formatted_cards

      return (
        <Fragment>
          <h1>{question} asked on {readingDate}</h1>
          {formattedCards.map(card => (
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
          <Link to={`${this.props.match.url}/edit`}>
            <Button variant="primary">Edit</Button>
          </Link>
        </Fragment>
      )
    }
  }
}

export default Deck
