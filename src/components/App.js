import React, { Component } from 'react'
import InputMessage from './InputMessage'
import MsgContainer from './MsgContainer'
import LogWindow from './LogWindow'
import '../App.css'

class App extends Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            login: '',
            log_name: false,
            error: false,
        }

        this.connection = new WebSocket('ws://127.0.0.1:1337')
        this.HandleChange = this.HandleChange.bind(this)
    }

    HandleChange() {
        this.setState({ error: false })
    }
    componentDidMount() {
        this.connection.onopen = () => console.log('connection is opened!')
        this.connection.onmessage = message => {
            let mess = JSON.parse(message.data)
            mess.type && mess.type === 'error'
                ? this.setState({ error: true })
                : this.setState({
                      messages: mess.messages,
                      log_name: true,
                      login: mess.username,
                  })
        }
    }

    render() {
        let data
        this.state.error
            ? (data = (
                  <LogWindow
                      HandleChange={this.HandleChange}
                      error={this.state.error}
                      connection={this.connection}
                  />
              ))
            : (data = this.state.log_name ? (
                  <div id="Main-Container">
                      <MsgContainer
                          msges={this.state.messages}
                          name={this.state.login}
                      />
                      <InputMessage
                          name={this.state.login}
                          connection={this.connection}
                      />
                  </div>
              ) : (
                  <LogWindow connection={this.connection} />
              ))

        return <div>{data}</div>
    }
}

export default App
