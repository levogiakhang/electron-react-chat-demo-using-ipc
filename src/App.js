import React, { Component } from 'react';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      message: [],
    };

    this.listener = this.listener.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('transport-message', this.listener);
  }

  componentWillUnmount() {
    ipcRenderer.removeListener('transport-message', this.listener);
  }

  listener(event, msg, id) {
    console.log(id);
    this.setState({ message: [...this.state.message, msg] });
  }

  handleSendMessage(msg) {
    ipcRenderer.send('send-message', msg);
  };

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  renderMessage = (message) => {
    return (
      <div className="content">
        {message.map((item, index) => {
          return (
            <div key={index}>
              <div className="message">
                <p>{item}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderInputView = (value) => {
    return (
      <form className="input-view">
        <div className="form-group">
          <input type="text"
                 className="form-control"
                 id="chatBox"
                 aria-describedby="emailHelp"
                 placeholder="Input something here..."
                 value={value}
                 onChange={this.handleChange.bind(this)}/>
        </div>
        <button type="button"
                onClick={this.handleSendMessage.bind(this, value)}>
          Click me!
        </button>
      </form>
    );
  };

  render() {
    const { value, message } = this.state;
    return (
      <div className="container">
        {this.renderMessage(message)}
        {this.renderInputView(value)}
      </div>
    );
  }
}

export default App;
