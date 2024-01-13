## Installation

````bash
git clone https://github.com/SAMRITIS/text-operation-apis
Docker
bash

$ docker-compose build
$ docker-compose up

# Or to run in detached mode
$ docker-compose up -d

Running the app
bash

$ npm install

# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
Test
bash

# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov


## Migration commands

```bash
# Run migrations
$ npm run migration

# Drop schema
# Warning: This will drop all tables from the database and clear all the data
$ npm run schema:drop

# Create migration file
$ npm run migration:create <path to migration directory>/filename
# Example: npm run migration:create ./src/database/migrations/CreateFileTable

# Generate migration automatically into a file
$ npm run migration:generate -n <path to migration directory>/filename
# Example: npm run migration:generate -n ./src/database/migrations/CreateFileTable

# Revert/Rollback the last migration
$ npm run migration:revert
````

## Postman Collections

Postman collections url is `https://api.postman.com/collections/24410382-19d8a6b3-1b3c-456e-bac2-73b47c471d3e?access_key=PMAT-01HM1DQ6JKPQMHR1RMY5SSVKTW` import it into your postman.

# Upload File

Method: POST
Endpoint: http://localhost:3000/file
Body: Formdata with a file parameter.
Response: JSON
json

{
"uuid": "14627225-c9b1-437c-a706-e92724be331e",
"message": "Successfully file uploaded"
}

# Create Task

Method: POST
Endpoint: http://localhost:3000/task
Body: JSON
{
"fileUuid": "14627225-c9b1-437c-a706-e92724be331e",
"kWord": 3,
"type": "count-word"
}

Response: JSON
{
"fileUuid": "14627225-c9b1-437c-a706-e92724be331e",
"kWord": 3,
"type": "count-word"
}

# Get Task

Method: GET
Endpoint: http://localhost:3000/task/:taskUuid
Response: JSON
{
"id": 21,
"name": "top-k-word",
"uuid": "66981cdf-4c63-4beb-af82-9c3a29c2eaee",
"kWord": 8,
"result": "{"hi":1,"is":4,"required":3,"design":2,"found":2,"modules":2,"not":2,"of":2}",
"createdAt": "2024-01-13T05:22:03.435Z",
"updatedAt": "2024-01-13T05:22:03.435Z"
}

## File Table Query

```sql
CREATE TABLE
  public.file (
    id serial NOT NULL,
    name character varying NOT NULL,
    uuid character varying NOT NULL,
    prev_name character varying NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now()
  );

ALTER TABLE
  public.file
ADD
  CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY (id);

```

## Task Table Query

```sql
CREATE TABLE
  public.task (
    id serial NOT NULL,
    name task_name_enum NOT NULL,
    uuid character varying NOT NULL,
    k_word integer NULL,
    result character varying NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    file_id integer NULL
  );

ALTER TABLE
  public.task
ADD
  CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id)

```

## Database View

Download Beekeeper Studio and select postgreSql connection and connect on below config

HOST=localhost
PORT=5432
NAME=boxer
USER=pguser
PASSWORD=password
