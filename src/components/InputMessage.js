import React, { Component } from 'react'

class InputMessage extends Component {
    render() {
        let connection = this.props.connection
        let name = this.props.name

        function SendMessage() {
            let outgoingMessage = document.getElementById('Input-Text').value
            connection.send(
                JSON.stringify({
                    type: 'message',
                    nickname: name,
                    text: outgoingMessage,
                })
            )
            connection.onerror = function(error) {
                console.log(`ERROR - ${error}`)
            }

            document.getElementById('Input-Text').value = ''
        }

        return (
            <form id="Add-Message-Form">
                <input
                    id="Input-Text"
                    type="text"
                    autoFocus
                    autoComplete="off"
                />
                <button
                    id="Send-Button"
                    onClick={e => {
                        e.preventDefault()
                        SendMessage()
                    }}
                >
                    Send
                </button>
            </form>
        )
    }
}

export default InputMessage
