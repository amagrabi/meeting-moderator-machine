import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("index.html")


@app.route('/<path:path>')
def send_site_files(path):
    return send_from_directory('templates', path)

@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('templates/static/js', path)

@app.route('/static/css/<path:path>')
def send_css(path):
    return send_from_directory('templates/static/css', path)

if __name__ == "__main__":
    app.run(debug=True)
