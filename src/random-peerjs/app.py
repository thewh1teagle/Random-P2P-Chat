from flask import Flask
from flask_cors import CORS
from views.api import api_blueprint
from views.site import site_blueprint





app = Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app, resources={r"/*": {"origins": "*"}})


app.register_blueprint(api_blueprint)
app.register_blueprint(site_blueprint)


app.run(debug=True, use_reloader=True, host="0.0.0.0", port=8080)
