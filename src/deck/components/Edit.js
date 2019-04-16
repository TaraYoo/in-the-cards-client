import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { editDeck } from '../api'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      accuracy: null
    }
  }

  componentDidMount () {
    console.log(this.props)
  }

  handleSubmit = event => {
    event.preventDefault()
    const id = parseInt(this.props.match.params.id)
    const accuracy = this.state.accuracy

    editDeck(this.props.user, id, accuracy)
      .then(console.log)
      .catch(console.error)
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      accuracy: event.target.value
    })
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group controlId="formGridAccuracy">
            <Form.Label>On a scale of 1 to 5 (1 meaning terrible, and 5 meaning dead on), how accurate were the cards?</Form.Label>
            <Form.Control as="select" onChange={this.handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
}

export default Edit
