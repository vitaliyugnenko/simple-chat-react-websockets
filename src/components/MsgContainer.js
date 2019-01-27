import React, { Component } from 'react'
import Message from './Message'

class MsgContainer extends Component {
    scrollToBottom = () => {
        let container = document.getElementById('Message-List-Container')
        container.scrollTop = container.scrollHeight
    }

    componentDidMount() {
        this.scrollToBottom()
    }

    componentDidUpdate() {
        this.scrollToBottom()
    }

    render() {
        let qw = this.props.msges
        let name = this.props.name
        let msgs = qw
            ? qw.map(item =>
                  item.name === name ? (
                      <Message
                          clsName="Message Self"
                          nickName={item.name}
                          text={item.text}
                          key={item.date}
                          date={item.date}
                      />
                  ) : (
                      <Message
                          clsName="Message Quest"
                          nickName={item.name}
                          text={item.text}
                          key={item.date}
                          date={item.date}
                      />
                  )
              )
            : ''

        return (
            <div id="Message-List-Container">
                <div id="Message-List">{msgs}</div>
            </div>
        )
    }
}

export default MsgContainer
