# README for PointRoute v2 #

Please follow the directions to download the src code and setup the right environment to be able to load the website on the localhost.

Please read before performing any actions.

## What is this project?

- It is the PointRoute version 2 where the Frontend is based on Vanilla JS and HTML5 with Bootstrap 4.1.
- This project is generated from the server side of NodeJS and using ExpressJS Framework.
- This version uses a MySQL database to store the routes from Point A to Point B and also the weather during the journey.
- Using NPM as the package builder and the CLI task runner.

## System Requirements

- This website version needs NodeJS and NPM to run all the scripts and tasks.
- Please download the latest NodeJS or version 8.12.x for your machine OS from the following link https://nodejs.org/en/download/
- Please follow the instructions to download NodeJS and NPM and it comes with its own command line or you can use PowerShell or git bash (the recommended one, https://git-scm.com/downloads)
- Make sure to also download MySQL and follow all the instructions to install a local server and to start it up. https://www.mysql.com/downloads/

## Set Up

- Unzip the project labelled as "p1v2" to an appropriate destination.
- Please fill the "server/.env" file with the right port to point the localhost, the Google Maps key, the Open Weather API Key for the backend piece of the app and DB details for the MySQL.
- In addition, please fill the Google Api Key in the 'client/config.js" file for the frontend piece of the app.
- Direct yourself to the "p1v2/server" folder in the command line to run any commands.
- Once in the "p1v2/server" folder, please run the following command to install all packages. `npm install`
- After a successful install, please run `npm run db-setup` which will create the required tables for this website.

## Build and Run the project

- To start the server, please type `npm start` and this will start the app on localhost:PORT
- The port is the same one that you filled in the "server/.env" file which has 8000 by default.

## Using the project

- Direct yourself to any browser and type in the url as above and you can see the app load, with two boxes for origin and destination.
- Once entered valid choices from the autocomplete, the app will load and you can see the map with the blue line for the directions and a panel on the right side showing the step by step directions.
- You can click on the directions to see the marker on the map and if available the weather as well.

For any code questions, please refer to comments on the code.
