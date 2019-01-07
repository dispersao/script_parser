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

Start mysql server locally and set up a database


## parse the script
parse the script and populates database with scenes, characters, locations

Get a .fountain file in the utils folder

Run
```
cd utils
CLEARDB_DATABASE_URL=mysql://[USER]:[PASS]@[SERVER]/[DATABASE]? node parser.js [ FOUNTAIN_FILE_NAME ]
```
Where
```
[USER] => is the mysql user
[PASS] => is the mysql user password
[SERVER] => is the server where the database is hosted (localhost if in your own computer)
[DATABASE] => is the name of the created database
[FOUNTAIN_FILE_NAME] => is the name of the file with the script
```

## start script api
Run
```
PORT=3001 CLEARDB_DATABASE_URL=mysql://[USER]:[PASS]@[SERVER]/[DATABASE]? node bin/www
```
Where
```
[USER] => is the mysql user
[PASS] => is the mysql user password
[SERVER] => is the server where the database is hosted (localhost if in your own computer)
[DATABASE] => is the name of the created database
```

## start frontend
Run
```
cd client
npm start
```
