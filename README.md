
# Minimal project of a Web pp with Database

The project idea is from the challenge shown in this [repo](https://github.com/igorman/data-engineering). The solution on this repo is a React app that reads a `.txt` files and inserts the content to a PostgreSQL table. Once the data is loaded then it is fetched from the database and then presented in a table with the total count of sales.

## Requirements

### Web app (Javascript)

```
npm 6.14.12
create-react-app 4.0.2
lodash 4.17.21
axios 0.21.1
```

### API (Python)

```
flask 2.0.1
flask_api 3.0.x
flask_cors 3.0.10
pandas 1.2.4
psycopg2 2.8.6
```

## Setup (local run)

### 1. Create database
 
First the PostgreSQL must be running

`pg_ctl -D /usr/local/var/postgres start`

Then, it can be accesed with `psql postgres`

Once accesed to the PostgreSQL server run the following command to create the database

`CREATE DATABASE project ENCODING='UTF8' TEMPLATE='template0';`

### 2. Start API

In the terminal, from the `api` directory run:

`python main.py`

### 3. Create web app

On another terminal, create a react app with `my-app` directory:

`npx create-react-app web_app my-app`

Next, replace content of `my-app/src` directory with the content of `web_app/src` from this repository. Also, add `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />` to *head* tag of `my-app/public/index.html` file.

### 4. Start web app

On `my-app` directory run:

`npm start`




