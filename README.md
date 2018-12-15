# Researcher Directory

Universidad Nacional Autónoma de México

Facultad de Ciencias

Modelado y Programación

## Authors
* Becerril Torres Teresa
* García Pérez Adrían
* Miguel Torres Eric Giovanni
* Salgado Muñoz Rodrígo
* Sánchez Salgado Alma Rocío

## Description

This project is a website dedicated to serve as a directory for researchers, here they can sign up and set up a profile where they can give information they want to make visible for other people so it's easier to contact the researcher or learn about them.

### Getting Started

This project uses the **Express** library for **Node.js**. 

### Prerequisites

* NodeJS
* npm
* MariaDB or MySql

### Setting up database:

To set up the database:

```bash
$ sequelize db:create
```
```bash
$ sequelize db:migrate
```

You can configure the database in _server/config/config.json_

### Setting up server

After cloning the directory, run:

```bash
$ npm install
```
Then, to run the server:
```bash
$ npm run start
```
so, the server will start listening on _localhost:[PORT]_, where _PORT_ is defined
in _.env_ file.

### Environment variables

The project makes use of a file that defines the environment variables, which are:

* **NODE_ENV:** Mode which the program is executed
* **HOST:** site where the program can be accesed
* **PORT:** port where the program is listening
* **DATABASE_NAME:** name of the MySQL database
* **DATABASE_USERNAME:** MySQL username
* **DATABASE_PASSWORD:** MySQL password
* **SUPPORT_EMAIL:** email address that sends notifications to the users
* **SENDGRID_API_KEY:** Sendgrid API key
