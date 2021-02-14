# Fullstack application with nodejs(backend) and angular(fronted)

Main object is the development an online ecommerce sales aplications, where we have products available with the possibility of marking purcharses, user registration and sales list.

## Prerequerement to run this app locally<br>
Nodejs - `https://nodejs.org` <br>
Angular CLI - `https://cli.angular.io/`<br>
database_script - `https://github.com/culyssander/script-sql/blob/master/mega_shop.sql`<br>
 
 ## Installation

1. clone the `git clone git@github.com repository: culyssander / ecommerce-nodejs-and-angular.git` || `https://github.com/culyssander/ecommerce-nodejs-and-angular.git`
2. Enter the project backed and install the `npm install` dependencies. After do the same with project frontend.


## Local Environment

Run `ng serves` to make the project go up locally. Access the url `http: // localhost: 4200 /`. The project is already reloaded automatically according to the changes you make to the code

## Simulating the Backend
To execute the backend, enter the project backend and type the command `npm start` to start the server on port 3000 with this a server will be initialized at the url `http: // localhost: 3000 /`, after initialization it will be possible to make http requests.

Endpoints<br>
`http: // localhost: 3000 / api / v1 / users`<br>
`http: // localhost: 3000 / api / v1 / categories`<br>
`http: // localhost: 3000 / api / v1 / products`<br>
`http: // localhost: 3000 / api / v1 / orders `<br>

## Generating component

Run `ng generate component component-name` to create a new component. You can also use `ng generate directive | pipe | service | class | guard | interface | enum | module`.

## Build

Run `ng build` to generate the project build. The project will be created inside the `dist /` directory. Add `--prod` together with the build command to generate minified and ready for the production environment. 