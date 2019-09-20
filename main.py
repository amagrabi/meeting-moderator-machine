import  analyze_speech
import base64
from flask import Flask, render_template, send_from_directory, request

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

@app.route("/uploadAudio",methods=["POST"])
def uploadAudio():
     content = request.files["file"].read()
     speakers_count = int(request.form.get('speakers_count'))
     print(speakers_count)
     with open('file.wav', 'wb') as f_vid:
         f_vid.write(content)
     return  analyze_speech.analyze_audio('file.wav', speakers_count)


if __name__ == "__main__":
    app.run(debug=True)
