from flask import Flask, \
    render_template


app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')



app.run(debug=True, use_reloader=True, host="0.0.0.0", port=8500)