import PoolClient from './poolClient.js'



var conn = null
var lastPeerId = null
var lastConnectedPeerId = null
var lastPeerName = null
var lastName = null


var connect_btn = document.getElementById("start-btn")
var name_input = document.getElementById("input-name")
var start_btn = document.getElementById("start-btn")
var h3_loading = document.getElementById("h3-loading")
var chat_input = document.getElementById("input-text")
var send_btn = document.getElementById("send-btn")
var text_area = document.getElementById("chat-tarea")



var poolClient = new PoolClient("localhost", 8000)
var peer = new Peer({
  host: 'localhost',
  port: 9000,
  path: '/myapp'
});



peer.on('open', function(id) {
  lastPeerId = id
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






const start = async function(e) {
  lastName = name_input.value
  await poolClient.register(name_input.value, peer._id)
  h3_loading.hidden = false
  var result = await poolClient.random_peer()

  if (result['status'] !== "ok") {
    console.log(result['status'])
  } 
  else {
    var random_peer_id = result['peer']['peer_id']
    var random_peer_name = result['peer']['peer_name']
    lastPeerName = random_peer_name
    console.log(`connecting to ${random_peer_id}`)
    conn = peer.connect(random_peer_id)


    lastConnectedPeerId = conn.peer

    console.log("connected to other peer!")
    h3_loading.hidden = true
    chat_input.disabled = false

    conn.on('close', function() {
      poolClient.remove_peer(lastPeerId)
      poolClient.remove_peer(lastConnectedPeerId)
      console.log("Disconnected from other peer")
    })
    

    conn.on('data', function(data) {
      console.log('Received', data)
      update_message(data)
    });
  }
}



start_btn.addEventListener("click", start);

 
peer.on('connection', function(dataConnection) {
  lastName = name_input.value
  dataConnection.on('close', function() {
    poolClient.remove_peer(lastPeerId)
    poolClient.remove_peer(lastConnectedPeerId)
    console.log("Disconnected from other peer")
  })
});


peer.on('connection', function(dataConnection) {
  lastConnectedPeerId = dataConnection.peer

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



chat_input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
      send_btn.click()
  }
});

name_input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    start_btn.click();
  }
})


function send_message(message) {
  text_area.value = text_area.value  + "\n" + lastName + ": " + message + "\n"
  text_area.scrollTop = text_area.scrollHeight
  chat_input.focus()
  chat_input.value = ""
  conn.send(message)
}

function update_message(message) {
  text_area.value = text_area.value  + "\n" + lastPeerName + ": " + message + "\n"
  
}

