import React, { Component } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

class Upload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: ''
    }
  }

  handleChange = event => {
    this.setState({ ...this.state, file: event.target.files[0] }, console.log('fired'))
    console.log(this.state)
  }

  handleSubmit = event => {
    event.preventDefault()
    const fileData = new FormData()

    fileData.append('imagefile', this.state.file)

    console.log(fileData)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="label">Upload image</label>
        <div className="control">
          <input className="input" type="file" name="file" onChange={this.handleChange}/>
        </div>
        <div>
          <button className="button is-link">Submit</button>
        </div>
      </form>
    )
  }
}

export default Upload
