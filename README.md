# What is this ?
This is a frontend (client) and a backend (api) for a SwapShop (Recupérathèque in french) : a place to facilitate reusing materials and objects.

# Installation

## Required environment
 - Node v20.11.0 or above (https://nodejs.org/).
 - Npm 10.2.4 or above (should be included with Node).
 - Postgres 16 or above, ideally (https://www.postgresql.org/). (Write down stuff like the password you use, as well as port number and others, as it will be usefull for the configuration file in one of the next sections)

## Recommended
 - VSCode as it offers many extension to simplify use and developpement.

## Clone the the repository
In the console/terminal, type "git clone https://github.com/Bestar7/SwapShop" (the url of this repository). This will download the whole source code for this app.

## Create the configuration files
There should be exemple.env that should be used as an exemple, or a .env directly.
Make sure you have a .env in the frontend AND backend. Rename exemple.env to .env if you want to use this template.
Make sure to fill the .env file with the correct values also make sure to fill it with the corresponding values from your database.

## Starting the app
Create a database. Give it the same name you gave in the .env file for the backend.
The database can be left empty, the backend will create the tables automatically.

## Install dependencies (for backend and frontend)
In the console/terminal, type 'npm install'. Do this inside of 'Backend' folder and 'Frontend' folder.
You can access the console/terminal from vscode easily by right clicking on the folder and going to 'open in integrated terminal'.

## Run (backend and frontend)
In the console/terminal, type 'npm start'.

## After starting the backend
you might want to populate the database when using it for the very first time using the material.csv file in DB_SEED folder

# tests

## setup de database
create another database only for the test and make sure the name correspond to the .env file

## populate the database
you might want to populate the database using the material.csv file in DB_SEED folder

## run the tests
then run the test with the following command npm run test:super (for end to end tests) npm run test:unit (for unit tests)
