import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const authorizedForm = ({ handleChange, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicDeck">
      <Form.Label style={{ fontSize: '1.5rem' }}>What would you like to ask?</Form.Label>
      <Form.Control type="text" placeholder="Enter Question" onChange={handleChange}/>
      <Form.Text style={{ fontSize: '1rem' }}>
      This deck shows the past, present, and future - ask broad questions
      </Form.Text>
    </Form.Group>
    <Button variant="light" type="submit" size="lg" block>
      Draw Cards
    </Button>
  </Form>
)

export default authorizedForm
