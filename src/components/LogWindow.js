import React, { Component } from 'react'

class LogWindow extends Component {
    render() {
        let connection = this.props.connection
        let error = this.props.error
        let HandleChange = this.props.HandleChange

        function LogIn() {
            let outgoingMessage = document.getElementById('Login-Input').value
            connection.send(
                JSON.stringify({
                    type: 'login',
                    nickname: outgoingMessage,
                    text: 'HI ALL!',
                })
            )
            console.log('message was sent!')
            connection.onerror = function(error) {
                console.log(`ERROR - ${error}`)
            }
        }

        let LogWindow = error ? (
            <div id="Log-Container">
                <span id="Caption">Enter Login</span>
                <form>
                    <input
                        id="Login-Input"
                        type="text"
                        autoFocus
                        autoComplete="off"
                        onChange={HandleChange}
                    />
                </form>
                <div id="Error">Error! User already exists!</div>
                <div id="Submit-Button" onClick={() => LogIn()}>
                    Submit
                </div>
            </div>
        ) : (
            <div id="Log-Container">
                <span id="Caption">Enter Login</span>
                <form id="Log-Container-Form">
                    <input
                        id="Login-Input"
                        type="text"
                        autoFocus
                        autoComplete="off"
                    />
                    <button
                        id="Submit-Button"
                        onClick={e => {
                            e.preventDefault()
                            LogIn()
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )

        return <div>{LogWindow}</div>
    }
}

export default LogWindow
