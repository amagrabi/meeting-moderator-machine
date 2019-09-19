import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)


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
