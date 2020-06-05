import random


class ChatRoom:

    def __init__(self):
        print("Chat room as been initialized!")
        self.peers = [] # {"peer_id": "id", "peer_name": "name", "available": True}
        

    def add_peer(self, peer_id, peer_name):
        print("new peer added name: {} id: {}".format(peer_name, peer_id))
        self.peers.append({
            "peer_id": peer_id,
            "peer_name": peer_name,
        })

    def remove_peer(self, peer_id):

        for peer in self.peers:
            if peer['peer_id'] == peer_id:
                self.peers.remove(peer)
                print("removed {}".format(peer_id))


    def random_peer(self, source_peer_id: str):
        available_peers = []
        for peer in self.peers:
            if peer['peer_id'] != source_peer_id:
                available_peers.append(peer)
        if available_peers:
            random_peer = random.choice(available_peers) 
            print("returning new random peer")
            return random_peer
        else:
            print("No available peer found")
            return None

