import json
import boto3
import urllib.request


def load_table():
    dynamodb=boto3.resource('dynamodb')
    table=dynamodb.Table('Reps')
    return table

def delete_reps(table):
    scan=table.scan()
    with table.batch_writer() as batch:
        for each in scan['Items']:
            batch.delete_item(
                Key={
                    'id':each['id']
                }
            )

def insert_reps(current_url, historical_url, table):
    with urllib.request.urlopen(current_url) as current_url:
        data=json.loads(current_url.read().decode())
        with table.batch_writer() as batch:
            for item in data:
                    batch.put_item(Item=item)

    with urllib.request.urlopen(historical_url) as historical_url:
        data=json.loads(historical_url.read().decode())
        with table.batch_writer() as batch:
            for item in data:
                batch.put_item(Item=item)

def lambda_handler():
    current_url = "https://theunitedstates.io/congress-legislators/legislators-current.json"
    historical_url="https://theunitedstates.io/congress-legislators/legislators-historical.json"
    table=load_table()
    delete_reps(table) #Need this?
    insert_reps(current_url, historical_url, table)