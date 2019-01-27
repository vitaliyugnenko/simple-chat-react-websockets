import React, { Component } from 'react'

class Message extends Component {
    render() {
        let clsName = this.props.clsName
        let text = this.props.text
        let nickName = this.props.nickName
        let date = this.props.date
        let dateObj = new Date(date)
        let messDate = `${(dateObj.getHours() < 10 ? '0' : '') +
            dateObj.getHours()}:${(dateObj.getMinutes() < 10 ? '0' : '') +
            dateObj.getMinutes()}`

        return (
            <div className={clsName}>
                <div className="Nickname">{nickName + ':'}</div>
                <div className="Data">
                    <div className="Mess-Text">{text}</div>
                    <div className="Mess-Date">{messDate}</div>
                </div>
            </div>
        )
    }
}

export default Message
