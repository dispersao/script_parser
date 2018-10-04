# script_parser
parse the script and populates database with scenes, characters, locations

Install [node](https://nodejs.org/en/) and [npm]( https://www.npmjs.com/get-npm)


Run
```
npm install
```

Download the [fountain.js](https://github.com/pushchris/fountain) repo and unzip it on root level

Get a .fountain file in the root level

Create a ```dbconfig.js``` file on root level that exports a module with the db config for connection.

Run
```
node index.js [ FOUNTAIN_FILE_NAME ]
```
