import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { getDecks } from '../api'
// import messages from '../messages'
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
        console.log(this.state)
      })
      .catch(console.error)
  }

  render () {
    const { decks } = this.state

    return (
      <Fragment>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Reading Date</th>
              <th>Question</th>
              <th>Accuracy</th>
              <th>Updated on</th>
            </tr>
          </thead>
          <tbody>
            {decks.map(deck => (
              <tr key={deck.id}>
                <td>{deck.id}</td>
                <td>placeholder</td>
                <td>{deck.question}</td>
                <td>{deck.accuracy}</td>
                <td>placeholder</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Fragment>
    )
  }
}

export default withRouter(History)
