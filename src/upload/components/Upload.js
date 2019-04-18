import React, { Component, Fragment } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

class Upload extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: null
    }
  }

  handleChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]) })
  }

  handleSubmit = event => {
    event.preventDefault()
    const fileData = new FormData()

    fileData.append('imagefile', this.state.file)

    console.log(fileData)
  }

  render () {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <label className="label">Upload image</label>
          <div className="control">
            <input className="input" type="file" name="file" onChange={this.handleChange}/>
          </div>
          <div>
            <button className="button is-link">Submit</button>
          </div>
        </form>
        <img src={this.state.file} style={{ width: '100%' }}/>
      </Fragment>

    )
  }
}

export default Upload
