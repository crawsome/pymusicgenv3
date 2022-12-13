from flask import Flask
from flask import render_template

from musicstructs import *

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html', notes=name_to_int_distance.keys())

if __name__ == "__main__":
    app.run(debug=True)
