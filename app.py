from flask import Flask
from flask import render_template
from flask import request 
from flask import jsonify

from musicstructs import *
from pymusicgen import rotate, floatequal, MidiNote, Song, PyMusicGen

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html', keys=name_to_int_distance.keys(), tensions=tensions)

@app.route('/generate', methods=["POST"])
def generate():
    musicGen.new_measure()

    return ""


@app.route("/update_frequencies", methods=["POST"])
def update_frequencies():
    name = request.form['name']
    freq = request.form['freq']
    active = request.form['active']

    musicGen.durations_freq[name]['checked'] = active == 'true'
    musicGen.durations_freq[name]['frequency'] = int(freq)
   
    return jsonify({name:musicGen.durations_freq[name]})

@app.route("/update_bpmin", methods=["POST"])
def update_bpmin():
    musicGen.beatsperminute = request.form['bpm']
    return str(musicGen.beatsperminute)

@app.route("/update_bpmeas", methods=["POST"])
def update_bpmeas():
    musicGen.beatspermeasure = request.form['bpm']
    return str(musicGen.beatspermeasure)

@app.route('/update_key', methods=["POST"])
def update_key():
    musicGen.key = request.form['key']
    return str(musicGen.key)

@app.route('/update_tension', methods=["POST"])
def update_tension():
    musicGen.tension = request.form['tension']
    return str(musicGen.tension)

# Update the status of the given note duration
@app.route('/select_duration', methods=["POST"])
def select_duration():
    name = request.form['name']
    active = request.form['active']
    freq = request.form['frequency']

    musicGen.durations_freq[name]['checked'] = active 
    musicGen.durations_freq[name]['frequency'] = freq 

    return jsonify(musicGen.durations_freq)

@app.route("/random_seed")
def random_seed():
    musicGen.random_seed()
    return str(musicGen.seed)

if __name__ == "__main__":
    musicGen = PyMusicGen()
    app.run(debug=True)
