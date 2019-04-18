import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import './Cards.scss'

class SingleCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cat: this.props.index,
      card: this.props.card,
      up: null
    }
  }

  componentDidMount () {
    console.log(this.props)
    if (this.props.index === 0) {
      this.setState({
        cat: 'past'
      })
    } else if (this.props.index === 1) {
      this.setState({
        cat: 'present'
      })
    } else {
      this.setState({
        cat: 'future'
      })
    }
  }

  render () {
    const { id, name, up } = this.state.card
    const meanUp = this.state.card.mean_up
    const meanReverse = this.state.card.mean_reverse

    return (
      <div key={id} className="col-sm-4 col-12 mb-5">
        <Card key={id} style={{ maxWidth: '20rem', marginRight: 'auto', marginLeft: 'auto' }} className="tarot-cards" bg="dark" text="white" border="warning">
          <Card.Img variant="top" src="" />
          <Card.Header>{this.state.cat}</Card.Header>
          <Card.Body>
            <Card.Text className="icons">
              <i className={ up ? 'icono-arrow1-up' : 'icono-arrow1-down' }></i>
            </Card.Text>
            <Card.Title className="title">{name}</Card.Title>
            <Card.Text>
              { up ? meanUp : meanReverse}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default SingleCard
