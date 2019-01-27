let http = require('http')
//npm install websocket
let webSocketServer = require('websocket').server
let webSocketsServerPort = 1337
let server = http.createServer(function(request, response) {})
server.listen(webSocketsServerPort, function() {
    console.log(
        new Date() + ' Server is listening on port ' + webSocketsServerPort
    )
})

/**
 * WebSocket server
 */

let wsServer = new webSocketServer({
    httpServer: server,
})

let messages = []
let users = []
let connectionName
let userConnection
let userNickname
let date

wsServer.on('request', function(request) {
    console.log(new Date() + ' Connection from origin ' + request.origin + '.')

    let connection = request.accept(null, request.origin)

    console.log(new Date() + ' Connection accepted.')

    connection.on('message', function(msg) {
        let message = JSON.parse(msg.utf8Data)
        connectionName = message.nickname
        message.type === 'login'
            ? users.find(e => e.hasOwnProperty(message.nickname))
                ? (connection.sendUTF(
                      JSON.stringify({
                          type: 'error',
                          description: 'user already exists',
                      })
                  ),
                  console.log('user already exists'))
                : (users.push({ [connectionName]: connection }),
                  (date = new Date()),
                  (date = date.getTime()),
                  messages.push({
                      name: message.nickname,
                      text: message.text,
                      date: date,
                  }),
                  users.map(
                      user => (
                          (userConnection = Object.values(user)[0]),
                          (userNickname = Object.keys(user)[0]),
                          userConnection.sendUTF(
                              JSON.stringify({
                                  username: userNickname,
                                  messages: messages,
                              })
                          )
                      )
                  ))
            : ((date = new Date()),
              (date = date.getTime()),
              messages.push({
                  name: message.nickname,
                  text: message.text,
                  date: date,
              }),
              users.map(user => {
                  userConnection = Object.values(user)[0]
                  userNickname = Object.keys(user)[0]
                  userConnection.sendUTF(
                      JSON.stringify({
                          username: userNickname,
                          messages: messages,
                      })
                  )
              }))
    })

    connection.on('close', function(connection) {
        console.log(new Date() + ' Peer ' + ' disconnected.')

        for (i = 0; i < users.length; i++) {
            if (users[i].hasOwnProperty(connectionName)) users.splice(i, 1)
        }
    })
})
