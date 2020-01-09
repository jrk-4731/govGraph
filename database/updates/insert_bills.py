from pymongo import MongoClient
import json
import os

client=MongoClient("mongodb+srv://jrk4731:gA3lSR4PolahyURM@reps"
                       "0db-0ag9h.mongodb.net/test?retryWrites=true")
bills=client.iCitizen.bills

rootdir='../../data'

def main():
    for directory in os.listdir(rootdir):
        filepath=os.path.join(rootdir, directory)
        filepath=os.path.join(filepath, 'bills')
        for subdirectory in os.listdir(filepath):
            filepath2 = os.path.join(filepath, subdirectory)
            for subdir in os.listdir(filepath2):
                filepath3=os.path.join(filepath2, subdir)
                for file in os.listdir(filepath3):
                    if file.endswith('.json'):
                        filepath4=os.path.join(filepath3, file)
                        parseBill(filepath4)


def parseBill(path):
    input_file=open(path, 'r')
    json_decode=json.load(input_file)
    dict={}
    dict['bill_id']=json_decode.get('bill_id')
    dict['committees']=json_decode.get('committees')
    dict['congress']=json_decode.get('congress')
    dict['cosponsors'] = json_decode.get('cosponsors')
    dict['enacted_as'] = json_decode.get('enacted_as')
    dict['official_title'] = json_decode.get('official_title')
    dict['popular_title'] = json_decode.get('popular_title')
    dict['sponsor'] = json_decode.get('sponsor')
    dict['status'] = json_decode.get('status')
    dict['status_at']=json_decode.get('status_at')
    intoDB(dict)

def intoDB(record):
    bills.insert_one(record)

if __name__ == '__main__':
    main()