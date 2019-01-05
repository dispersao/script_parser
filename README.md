# parsed_script_app

#setting up
Install [node](https://nodejs.org/en/) and [npm]( https://www.npmjs.com/get-npm)

Run
```
npm install
cd client
npm install
```

Download the [fountain.js](https://github.com/pushchris/fountain) repo and unzip it on root/utils level. The folder must be called fountain-master (and not just 'fountain').

Start mysql server locally and set up database

Create a ```dbconfig.js``` file on config folder that exports a module with the db config for connection.


## parse the script
parse the script and populates database with scenes, characters, locations

Get a .fountain file in the utils folder 

Run
```
cd utils
node parser.js [ FOUNTAIN_FILE_NAME ]
```

## start script api
Run
```
PORT=3001 node bin/www
```

## start frontend
Run
```
cd client
npm start
```
