from flask import Flask
from markupsafe import escape

app = Flask(__name__)

@app.route("/")
def homePage():
    return "<p>Hello world</p>"

