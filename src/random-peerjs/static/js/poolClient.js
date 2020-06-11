export default class PoolClient {
    
    constructor(HOST, PORT) {
        this.HOST = HOST
        this.PORT = PORT
    }
  
    async register(name, peer_id) {
        console.log("registering pool server")
        this.name = name
        this.peer_id = peer_id
        let res = await fetch(`http://${this.HOST}:${this.PORT}/register?id=${peer_id}&name=${name}`)
        res = res.json()
        return res
    }
  
    async random_peer() {
      let response = await fetch(`http://${this.HOST}:${this.PORT}/random?id=${this.peer_id}`)
      response = response.json()
      return response
    }
  }
   