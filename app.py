from flask import Flask
from flask import render_template

from musicstructs import *
from pymusicgen import rotate, floatequal, MidiNote, Song, PyMusicGen

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html', notes=name_to_int_distance.keys(), tensions=tensions)

@app.route("/random_seed")
def random_seed():
    musicGen.random_seed()
    return str(musicGen.seed)


if __name__ == "__main__":
    musicGen = PyMusicGen()
    app.run(debug=True)
