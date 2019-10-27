#setting up#
Install [node](https://nodejs.org/en/) and [npm]( https://www.npmjs.com/get-npm)

Run
```
npm install
cd client
npm install
```

If the strapiio server runs locally, starts it.

##parse the script
parse the script and populates database with scenes, characters, locations

```PARSE_SCRIPT=[PATH TO THE .FOUNTAIN SCRIPT FILE] VIDEOS_FOLDER=[PATH TO THE FOLDER HOLDING THE VIDEO FILES] USER=[STRAPI AUTH USER] PASS=[STRAPI USER PASS] API=[URL TO THE STRAPI API] node index.js```
