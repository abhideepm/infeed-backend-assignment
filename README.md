# TODO Backend

## Setting up the project

* Install [NVM](https://github.com/nvm-sh/nvm#installing-and-updating)
* Run `nvm install 18` to install Node 18
* Run `nvm use 18` to use Node 18
* Install pnpm using `npm install -g pnpm`
* Run `pnpm install` in the project directory
* Run `pnpm run start:dev` to start the development server

## Relevant curl commands

* `curl --location 'http://localhost:4000/v1/todo?limit=3'`

To get the first 3 todos (If limit is not specified, it defaults to 10)

* `curl --location '<http://localhost:4000/v1/todo?limit=3&nextTodoId=de86fdf3-78ad-405f-92bc-b07033e1b87a&nextDateCreated=2023-09-24T14%3A24%3A17.000Z>'`

To get the next 3 todos with the nextTodoId and nextDateCreated from the previous request

* `curl --location 'http://localhost:4000/v1/todo' \
--header 'Content-Type: application/json' \
--data '{
    "title": "ABC2",
    "description":"ABC",
    "status":"OPEN"
}''`

To create a new todo, here description and status are optional

* `curl --location 'http://localhost:4000/v1/todo/metrics?monthYear=09%2F2023'`

To get the metrics for a particular month and year based on status

* `curl --location --request DELETE 'http://localhost:4000/v1/todo/ece75b7a-0f2a-404b-900c-82339a0f9f1c'`

To delete a todo

* `curl --location --request PATCH 'http://localhost:4000/v1/todo/ece75b7a-0f2a-404b-900c-82339a0f9f1c' \
--header 'Content-Type: application/json' \
--data '{
    "description": "Testing"
}'`

To update a todo, here title, description and status are optional
