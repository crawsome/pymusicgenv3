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
    result = musicGen.new_measure()

    if result != True:
        return jsonify({"measure_notes":musicGen.measure_note_str,
                        "measure_dur":musicGen.measure_duration_str,
                        "measure_title":musicGen.measure_title_str,
                        "error_msg":result}) 

    return jsonify({"measure_notes":musicGen.measure_note_str,
                    "measure_dur":musicGen.measure_duration_str,
                    "measure_title":musicGen.measure_title_str,
                    "error_msg":""})
    

@app.route("/reset", methods=["POST"])
def reset():
    musicGen.durations_freq = {
            "Chord":{ "checked":False, "frequency": 0},
            "32nd":{ "checked":False, "frequency": 0},
            "Sixteenth":{ "checked":False, "frequency": 0},
            "Eighth":{ "checked":False, "frequency": 0},
            "Quarter":{ "checked":False, "frequency": 0},
            "Half":{ "checked":False, "frequency": 0},
            "Whole":{ "checked":False, "frequency": 0}
        }
    musicGen.key = None
    musicGen.tension = None 
    musicGen.beatsperminute = None 
    musicGen.beatspermeasure = None 
    musicGen.seed = None 

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
    musicGen.beatsperminute = int(request.form['bpm'])
    return str(musicGen.beatsperminute)

@app.route("/update_bpmeas", methods=["POST"])
def update_bpmeas():
    musicGen.beatspermeasure = int(request.form['bpm'])
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
    musicGen.durations_freq[name]['frequency'] = int(freq) 

    return jsonify(musicGen.durations_freq)

@app.route("/random_seed", methods=["GET","POST"])
def random_seed():
    if request.method == "GET":
        musicGen.random_seed()
        return str(musicGen.seed)

    if request.method == "POST":
        musicGen.seed = int(request.form['seed'])
        return str(musicGen.seed)

if __name__ == "__main__":
    musicGen = PyMusicGen()
    app.run(debug=True)
