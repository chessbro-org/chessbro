import requests

def getOpening(fen):
    response = requests.get("https://explorer.lichess.ovh/masters", {"fen": fen})
    if response.status_code == 200:
        opening_data = response.json()['opening']
        return opening_data
    else:
        return False