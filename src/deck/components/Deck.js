import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getDeck, deleteDeck } from '../api'
import messages from '../messages'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Deck extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deck: null,
      redirect: false
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
      .catch(() => {
        this.props.alert(messages.showFailure, 'danger')
      })
  }

  handleDelete = event => {
    event.preventDefault()

    const deleteId = parseInt(event.target.id)

    deleteDeck(this.props.user, deleteId)
      .then(() => {
        this.setState({
          redirect: true
        })
        this.props.alert(messages.deleteSuccess, 'success')
      })
      .catch(() => {
        this.props.alert(messages.drawFailure, 'danger')
      })
  }

  render () {
    if (!this.state.deck) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/history'
        }}/>
      )
    } else {
      const { question, id } = this.state.deck
      const readingDate = this.state.deck.reading_date
      const formattedCards = this.state.deck.formatted_cards

      return (
        <Fragment>
          <h1>{question} asked on {readingDate}</h1>
          <div className="row">
            {formattedCards.map(card => (
              <div key={card.id} className="col-sm-4 col-12 mb-5">
                <Card key={card.id} style={{ width: '18rem' }} className="tarot-cards">
                  <Card.Img variant="top" src="" />
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
              </div>
            ))}
          </div>
          <Link to={`${this.props.match.url}/edit`}>
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" id={id} onClick={this.handleDelete}>Delete</Button>

        </Fragment>
      )
    }
  }
}

export default Deck
