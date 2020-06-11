from flask import Blueprint, render_template, session,abort
from flask_cors import CORS

site_blueprint = Blueprint('site_blueprint',__name__)

CORS(site_blueprint, resources={r"/*": {"origins": "*"}})

@site_blueprint.route('/', methods=['GET'])
def home():
    response = render_template('index.html')
    return response




