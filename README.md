# simple email client

## description

simple email client using react and typescript to implement ui.\
to show sent and received email or delete or send emails
also implemented json-server to create endpoint to delete or send email

### start project

````
git clone https://github.com/aryaOlya/active-cleaners
````

````
npm install
````

````
npm start
````

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### use json-server

there is a mock api using json server in mock/db.json
the project call [http://localhost:4000](http://localhost:3000) to access json-server

`GET  http://localhost:4000/emails`
\
`GET  http://localhost:4000/users`
\
`GET  http://localhost:4000/topics`

`GET  http://localhost:4000/topics/:id`
\
`GET  http://localhost:4000/topics/:id`
\
`GET  http://localhost:4000/topics/:id`

`DELETE  http://localhost:4000/emails/:id`

`POST  http://localhost:4000/emails`

