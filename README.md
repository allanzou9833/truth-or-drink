# [Truth or Drink Online](https://truth-drink.herokuapp.com/)

This is an online version of the game **Truth or Drink** by [Cut](https://www.youtube.com/user/watchcut) and allows you to play with friends anywhere in the world by creating a room and sharing the room link. 

### Gameplay:
[![Truth or Drink Video](http://img.youtube.com/vi/pKeynMccbZs/0.jpg)](https://www.youtube.com/watch?v=pKeynMccbZs)

### Demo
![Demo](https://media.giphy.com/media/W0EwYDaHAAKa3U16iy/source.gif)

### Built with
- [Angular9](https://angular.io/docs) - Frontend application design framework for creating SPAs
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell) - Robust, complete framework for running automated tests
- [socket.io](https://socket.io/docs/) - Real-time, bidirectional, and event-based communication
- [Node.js](https://nodejs.org/en/about/) - Javascript runtime environment executing Javascript code outside a web browser
- [Docker](https://www.docker.com/why-docker) - Create, deploy, and run applications easily using containers
- [TravisCI](https://docs.travis-ci.com/user/for-beginners/) - Continuous Integration(CI) service used to build, test, and deploy software
- [Heroku](https://www.heroku.com/about) - Cloud Platform as a Service(PaaS) for deploying, managing, and scaling apps


## Usage
### Setup
1. Buy the game [here](https://buy.cut.com/products/truth-or-drink-game?variant=31599164293216) or the print-at-home [pdf](https://gumroad.com/l/truthordrink) version
2. Parse pdf for questions and write into a file `Deck-name.txt` with each question on a newline and each card separated with an empty line.

>*Last-call.txt*

```
card1_questionA
card1_questionB

card2_questionA
card2_questionB

...
```
3. Pass the `.txt` file into the python script with the command `python parse.py Deck-name.txt`. This writes out `Deck-name.json`.

>*Last-call.json*
``` json
{
  "lc-1": {
    "id": "lc-1",
    questions: [question1, question2]
  }, 
  "lc-2": {
    "id": "lc-2",
    questions: [question1, question2]
  },
  ...
}
```

### Development
```
$ docker-compose up -d
```

### Testing
#### Unit Tests
```
$ npm run test
```

#### E2E Tests
##### Local
```
$ npm run cypress
```
##### CICD / Production Build
```
$ docker-compose -f docker-compose.ci.yml up -d
$ docker-compose -f docker-compose.ci.yml run cypress ./node_modules/.bin/cypress run
```

## Deployment
1. Set up [TravisCI](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci-using-github) and [Heroku](https://signup.heroku.com/) accounts
2. Add the following [Environment Variables](https://docs.travis-ci.com/user/environment-variables/#defining-variables-in-repository-settings) in TravisCI:
```
HEROKU_API_KEY    # heroku.com > Account Settings > API Key

HEROKU_USERNAME   # heroku username

HEROKU_APP_CLIENT # url of heroku app for client 
                  # (https://app-name.herokuapp.com)

HEROKU_APP_SERVER # url of heroku app for socketio server   
                  # (https://app-name.herokuapp.com)
```
3. Push changes to repository