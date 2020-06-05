import PoolClient from './poolClient.js'
var HOST = "127.0.0.1"
var PORT = 5000




const peer = new Peer('peer-id', {
  host: 'localhost',
  port: 9000,
  path: '/myapp'
});
var conn = null

var poolClient = new PoolClient(HOST, PORT)


var connect_btn = document.getElementById("start-btn")
var name_input = document.getElementById("input-name")
var start_btn = document.getElementById("start-btn")
var h3_loading = document.getElementById("h3-loading")
var chat_input = document.getElementById("input-text")
var send_btn = document.getElementById("send-btn")
var text_area = document.getElementById("chat-tarea")

name_input.addEventListener('input', function (e) {
  if (name_input.value === "") {
    connect_btn.disabled = true
  } else {
    connect_btn.disabled = false
  }
});




start_btn.addEventListener("click", async function(e) {
  var name = name_input.value
  console.log(peer)
  await poolClient.register(name, peer._id)
  h3_loading.hidden = false
  var random_peer = await poolClient.random_peer()
  var name = random_peer.peer.peer_name
  var peer_id = random_peer.peer.peer_id

  console.log(name)
  console.log(peer_id)
  conn = peer.connect(peer_id)
});






peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  console.log(peer._id)
});



peer.on('connection', function(dataConnection) {
  console.log("connected to other peer!")
  h3_loading.hidden = true
  chat_input.disabled = false
  start_receive_messages()
 });



 chat_input.addEventListener('input', function (e) {
  if (chat_input.value === "") {
    send_btn.disabled = true
  } else {
    send_btn.disabled = false
  }
});



send_btn.addEventListener("click", (e) => {
  console.log(`sending ${chat_input.value}`)
  send_message(chat_input.value)
})



function send_message(message) {
  text_area.value = text_area.value  + "\n" + "sended: " + message
  conn.send(message)
}



function receive_message(message) {
  text_area.value = text_area.value  + "\n" + "received: " + message
}


function start_receive_messages() {
  conn.on('data', function(data) {
    console.log('Received', data);
  });
}
