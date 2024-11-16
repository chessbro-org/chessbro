import requests
from bs4 import BeautifulSoup
import re

def scrape(username, start_date, end_date):
    listOfElements = []
    counter = 1 
    while(True):
        params = {
            'endDate[date]': end_date,
            'startDate[date]': start_date,
            'page': counter
        }    
        data = requests.get(rf"https://www.chess.com/games/archive/{username}", params=params)
        soup = BeautifulSoup(data.text, 'html.parser')
        elements = soup.find_all('div', class_='archive-games-user-tagline')
        if (len(elements) == 0):
            break
        listOfElements.append(elements)
        counter+=1
    
    games = []
    for element in listOfElements:
        for counter in range(0, len(element), 2):
            name_and_rating1 = element[counter].text.strip()
            name_and_rating1 = "\n".join(line for line in name_and_rating1.split("\n") if line.strip())   
            name_and_rating2 = element[counter+1].text.strip()
            name_and_rating2 = "\n".join(line for line in name_and_rating2.split("\n") if line.strip()) 
            game = {}
            game['player1'] = name_and_rating1
            game['player2'] = name_and_rating2
            games.append(game)

    return games


    

def getGames(username, start_date, end_date):
    games = scrape(username, start_date, end_date)
    for game in games:
        player1 = re.match(r"^(.*)\s*\((\d+)\)$", game['player1'])
        player2 = re.match(r"^(.*)\s*\((\d+)\)$", game['player2'])

        player1_username = player1.group(1)  
        player1_rating = player1.group(2)    
        player2_username = player2.group(1)  
        player2_rating = player2.group(2)    
        game['player1'] = {"username": player1_username, "rating": player1_rating}
        game['player2'] = {"username": player2_username, "rating": player2_rating}
    return games
    
