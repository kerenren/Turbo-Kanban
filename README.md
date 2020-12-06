# Turbo Kanban built for manage Turbo bots and database with Turbo server

## Client side
### Get started:
install [node.js](https://nodejs.org/en/download/ )

- install static server: 
   `npm install -g serve`

- add all the dependencies: 
    `npm install`

### to run the project
- on a default port 5000:
`serve -s build`

- to specify the port:
`serve -s build -l <port number>` 
- or you can configure it in Client/.env: 
 `PORT = <port number>`

## Server side:

configure mysql db sensitive data in Server/.env:
``` 
MYSQL_USER=<mysql user_name>
PASSWORD=<password>
DATA_BASE=<db_name>
```