import requests

def scrape(username, month, year):

    url = f"https://api.chess.com/pub/player/{username}/games/{year}/{month}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    if not response.status_code==200:
        return None
    
    data = response.json()
    games = data['games']
    if (len(games) == 0):
        return False
    
    gameInfoList = []
    for game in games:
        gameInfo = {
            "black":{
                "username": game['black']['username'],
                "rating": game['black']['rating']
            },
            "white":{
                "username": game['white']['username'],
                "rating": game['white']['rating']
            },
            "pgn": game['pgn']
        }
        gameInfoList.append(gameInfo)
    return gameInfoList
