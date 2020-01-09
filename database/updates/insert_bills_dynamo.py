import json
import boto3
import os

def load_table():
	dynamodb=boto3.resource('dynamodb')
    table=dynamodb.Table('Bills')
    return table

def getFile(rootdir, table):
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
                        parseBill(filepath4, table)
						
def parseBill(path, table):
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
    intoDB(dict, table)

def intoDB(dict, table):
    with table.batch as batch:
		batch.put_item(Item=dict)

def lambda_handler():
    rootdir="https://github.com/icitizen-RIT/congress/tree/master/database/data/"
    table=load_table()
    getFile(rootdir, table)