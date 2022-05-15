# Node.js + Express and PM2 chess app service

Service based on Express v.^4.17.3 using PM2 as production process manager for Node.js and Mongodb as NoSql DB

## Table of Contents

* [Quickstart](#quickstart)
* [Environments variables](#environment-variables)
* [npm scripts](#npm-scripts)

### Quickstart
* Download MongoDB from [mongodb.com](https://www.mongodb.com/) (Recommended Version)
* Download node from [nodejs.org](https://nodejs.org/en/download/) (at least 14.x.x version)
* Download all service libraries and dependencies by running command `npm install` from the current directory

### Environment variables
* Environment variables that are used in service run:
    * `MONGO_URL` url where mongodb is running
        * Default value is `mongodb://127.0.0.1:27017`
    * `X_API_KEY` apikey for service restrictions
        * Default value is `abc123`
    * `PORT` port where service should run
        * Default value is `3000`

### npm scripts

* npm scripts in `package.json` file:
    * `start` script for running Express
    * `parse-db-data` script for parsing db data for Mongodb
    * `pm2-cluster-start` script for starting cluster with specied number of cores, check in `ex.config.js`
    * `pm2-cluster-stop` script for stopping cluster
    * `pm2-cluster-delete` script for deleting opened cluster
    * `pm2-all-clasters-delete` script for all clusters deleting 
    * `benchmark-test-new` script for running benchmark tests for new approach
    * `benchmark-test-old` script for running benchmark tests for old approach