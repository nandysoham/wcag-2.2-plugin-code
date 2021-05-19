import os
import time
import pymongo
import json
from flask import Flask,request, redirect,url_for

from flask_cors import CORS, cross_origin
app =Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
  return "<h1> WACCESS 2.2 html</h1>"


@app.route('/push_data',methods=['POST'])
def push_data():
    if request.method == 'POST':
        print(request.form["data"])
        
        print(type(request.form["data"]))
        document = json.loads(request.form["data"])
        # mongo_client = pymongo.MongoClient("mongodb+srv://soham_root:sohamsamir@cluster0.ihdlx.mongodb.net/wcag?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true")
        mongo_client = pymongo.MongoClient("mongodb+srv://soham_root:sohamsamir@cluster0.ihdlx.mongodb.net/wcag?retryWrites=true&w=majority")
        
        database = mongo_client["wcag"]
        collection = database["wcagobjects"]
        resp = collection.insert_one(document)
        print('Created  '.format(document,resp.inserted_id))
        return "True"
    return "False"

app.run(debug = True)