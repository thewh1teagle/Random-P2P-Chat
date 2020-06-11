import PoolClient from './poolClient.js'
var HOST = "localhost"
var PORT = 8080


var poolClient = null
var peer = null
var conn = null
var lastPeerId = null

var connect_btn = document.getElementById("start-btn")
var name_input = document.getElementById("input-name")
var start_btn = document.getElementById("start-btn")
var h3_loading = document.getElementById("h3-loading")
var chat_input = document.getElementById("input-text")
var send_btn = document.getElementById("send-btn")
var text_area = document.getElementById("chat-tarea")




poolClient = new PoolClient(HOST, PORT)

peer = new Peer({
  host: 'localhost',
  port: 9000,
  path: '/myapp'
});



peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
});


peer.on("error", function(e) {
  console.log(e)
})





name_input.addEventListener('input', function (e) {
  if (name_input.value === "") {
    connect_btn.disabled = true
  } else {
    connect_btn.disabled = false
  }
});




start_btn.addEventListener("click", async function(e) {
  await poolClient.register(name_input.value, peer._id)
  h3_loading.hidden = false
  var result = await poolClient.random_peer()

  if (result['status'] !== "ok") {
    console.log(result['status'])
  } 
  else {
    var random_peer_id = result['peer']['peer_id']
    var random_peer_name = result['peer']['name']
    console.log(`connecting to ${random_peer_id}`)
    conn = peer.connect(random_peer_id)
    console.log("connected to other peer!")
    h3_loading.hidden = true
    chat_input.disabled = false

    conn.on('data', function(data) {
      console.log('Received', data)
      update_message(data)
    });
  }
});

 
    
peer.on('connection', function(dataConnection) {
  console.log("connected to other peer!")
  conn = dataConnection
  h3_loading.hidden = true
  chat_input.disabled = false
  conn.on('data', function(data) {
        console.log('Received', data);
        update_message(data)
  });  
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
  if(typeof conn !== "undefined") {
    send_message(chat_input.value)
  } else {
    console.log("cant send message")
  }
})



function send_message(message) {
  text_area.value = text_area.value  + "\n" + "sended: " + message
  conn.send(message)
}

function update_message(message) {
  text_area.value = text_area.value  + "\n" + "received: " + message
}
