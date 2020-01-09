from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS


application=Flask(__name__)
application.config["MONGO_DBNAME"]="iCitizen"
application.config["MONGO_URI"]="mongodb+srv://jrk4731:gA3lSR4PolahyURM@reps0db-0ag9h.mongodb.net/test?retryWrites=true"
client=MongoClient("mongodb+srv://jrk4731:gA3lSR4PolahyURM@reps"
                       "0db-0ag9h.mongodb.net/test?retryWrites=true")
reps=client.iCitizen.reps

bills=client.iCitizen.bills

CORS(application)

@application.route("/api/<congress>", methods=["GET"])
def find_congress(congress):
    congress=int(congress)
    rep = list(
        reps.find({"terms.congress": congress, "terms.type": "sen"}, {"_id":0,"id.bioguide": 1, "name.first": 1, "name.last": 1, "terms": {"$elemMatch": {"congress": congress}}})
    )
    return jsonify({"reps": rep})

@application.route("/api/<bioGuide>/<congress>", methods=["GET"])
def find_bills(bioGuide, congress):
    bill=list(
        bills.find({"congress": congress, "sponsor.bioguide_id": bioGuide}, {"_id":0, "enacted_as":1, "cosponsors": 1})
    )
    return jsonify({"bills": bill})

if __name__ == '__main__':
    application.run()