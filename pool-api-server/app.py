import flask
from flask import jsonify
from flask import request
from ChatRoom import ChatRoom
import logging
import os



app = flask.Flask(__name__)
app.config["DEBUG"] = True


log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)



chat = ChatRoom()


@app.route('/register', methods=['GET'])
def add_route():
    id = request.args.get('id', default = 1, type = str)
    name = request.args.get('name', default = 1, type = str)
    chat.add_peer(id, name)
    return {'status': "ok"}

@app.route('/random', methods=['GET'])
def random_route():
    source_id = request.args.get('id')
    print("source_id= ".format(source_id))
    random_peer = chat.random_peer(source_id)
    if random_peer:
        return jsonify({
            'status': "ok",
            'peer': random_peer
        })
    return jsonify({
        'status': "no random peer has been found."
    })

print("starting http server at localhost:5000")
app.run(host="0.0.0.0")





