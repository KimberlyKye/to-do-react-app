import React from 'react'
import './Modal.css'

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={() => this.setState({ isOpen: true })}>Help</button>

        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>How to use it</h1>
              <p>
                You can add some new tasks by the field or set existing tasks as
                done
              </p>
              <button onClick={() => this.setState({ isOpen: false })}>
                Close
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }
}
