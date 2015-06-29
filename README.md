# Edify

> Skill sharing platform

## Team

  - __Product Owner__: Colin Parsons
  - __Scrum Master__: Timmy Luong
  - __Development Team Members__: JP Ji, Mike Kim

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Install dependencies

> Start MySQL server

> Log in via Github

## Requirements

- Node 0.10.x
- Express 4.12.x
- MySQL 2.7.x
- Bookshelf 0.8.x
- Knex 0.8.6
- Passport 0.2.2
- Passport-github2 0.1.9
- Bluebird 2.9.30

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
mysql.server start
```

From client directory

```sh
bower install
```

### Deployment

Set up with Heroku & ClearDB (mySQL)

From root directory:

'''sh
grunt build
heroku addon:add cleardb:ignite
new github application vars -> server/oauth.js
push to heroku
'''

### Database

'''sh
grunt backup - Store current db as the backup
grunt reset - Restore db from backup
grunt dbInit - Initialize db with default data
'''

### Roadmap

Future
 - Add upvoting system to allow user to "like" other users
 - Add favorites view for user to see all "liked" entries
 - Add location service to allow user to find other nearby users
 - Remove dichotomy of learners/teachers and
    - replace with just learners

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
