from flask_cors import CORS
from flask import Blueprint, request, jsonify
from modules.ChatRoom import ChatRoom



chat = ChatRoom()
api_blueprint = Blueprint('api_blueprint',__name__)
CORS(api_blueprint, resources={r"/*/*": {"origins": "*"}})


@api_blueprint.route('/register', methods=['GET'])
def add_peer():
    peer_id, name = request.args.get('id'), request.args.get('name')

    chat.add_peer(peer_id, name)

    response = jsonify({'status': "ok"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@api_blueprint.route('/random', methods=['GET'])
def random_peer():
    source_id = request.args.get('id')
    print("source_id= {}".format(source_id))
    rpeer = chat.random_peer(source_id)
    if rpeer:
        response = jsonify({
            'status': "ok",
            'peer': rpeer
        })
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    response = jsonify({
        'status': "no random peer has been found."
    })
    return response


@api_blueprint.route('/remove', methods=['GET'])
def remove_peer():
    peer_id = request.args.get('id')
    chat.remove_peer(peer_id)
    response = jsonify({'status': "ok"})
    return response




