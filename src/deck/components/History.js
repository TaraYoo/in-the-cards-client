import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { getDecks, deleteDeck } from '../api'
import messages from '../messages'
import Table from 'react-bootstrap/Table'

class History extends Component {
  constructor () {
    super()

    this.state = {
      decks: []
    }
  }

  componentDidMount () {
    getDecks(this.props.user)
      .then(res => {
        this.setState({
          decks: res.data.decks
        })
      })
      .catch(() => {
        this.props.alert(messages.drawFailure, 'danger')
      })
  }

  handleDelete = event => {
    event.preventDefault()

    const deleteId = parseInt(event.target.id)

    deleteDeck(this.props.user, deleteId)
      .then(() => {
        this.props.alert(messages.deleteSuccess, 'success')
      })
      .then(() => {
        getDecks(this.props.user)
          .then(res => {
            this.setState({
              decks: res.data.decks
            })
          })
          .catch(() => {
            this.props.alert(messages.drawFailure, 'danger')
          })
      })
      .catch(() => {
        this.props.alert(messages.drawFailure, 'danger')
      })
  }

  render () {
    const { decks } = this.state

    if (!decks) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
      return (
        <Fragment>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Details</th>
                <th>#</th>
                <th>Reading Date</th>
                <th className="question">Question</th>
                <th>Accuracy</th>
                <th>Updated on</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {decks.map(deck => (
                <tr key={deck.id}>
                  <td>
                    <Link to={`/history/${deck.id}`}>Details</Link>
                  </td>
                  <td>{deck.id}</td>
                  <td>{deck.reading_date}</td>
                  <td>{deck.question}</td>
                  <td>{deck.accuracy}</td>
                  <td>{deck.updated_on}</td>
                  <td><Button variant="danger" id={deck.id} onClick={this.handleDelete}>Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      )
    }
  }
}

export default withRouter(History)
