from flask import Flask
from flask import render_template
from flask import request 

from musicstructs import *
from pymusicgen import rotate, floatequal, MidiNote, Song, PyMusicGen

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html', keys=name_to_int_distance.keys(), tensions=tensions)

@app.route("/random_seed")
def random_seed():
    musicGen.random_seed()
    return str(musicGen.seed)

@app.route('/update_key', methods=["POST"])
def update_key():
    musicGen.key = request.form['key']
    return str(musicGen.key)

@app.route('/update_tension', methods=["POST"])
def update_tension():
    musicGen.tension = request.form['tension']
    return str(musicGen.tension)

if __name__ == "__main__":
    musicGen = PyMusicGen()
    app.run(debug=True)
