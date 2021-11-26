## Event Planning Site
This is a wedding website for Krishi and Luv's wedding. It will allow hosts to log into the app to track guest responses, as well as allow guests to view updates on wedding related events.

### Developer Setup
To run this application, you need to first make sure you have the correct version of Node installed:
```
bash
brew install nvm && nvm install 12.13.1
```
- Postgres
- Go - https://golang.org/doc/install
- Postman (Or online if you prefer)
- Postico 

Optional: You can set the default version of Node using this command:
```bash
nvm alias default 12.13.1
```

Then, you need to install all dependencies required by the application:
```bash
npm install
```

And finally, you can launch this application using:
```bash
npm start
```

### Backend Set-Up
Create a localhost table in postico

Update server/main.go - postgres URL:
`postgres://<username>@localhost/<table_name>?sslmode=disable`

To copy SQL data into local DB
`psql -d <table_name> -f go_events.sql`

After installing go:

Run `go run server/*.go`

Please go to Postman to try routes


### Examples
To get events for a family
`http://localhost:8080/v1/family/events/1` - GET


### Near Future Updates
In the future, this wedding site will have a timeline of events (with the option to choose Luv or Krishi, as both will have separate pre-wedding ceremonies).
It will also have the a static page for common questions, travel suggestions and the couple's story.


### Future Updates
Later on, we will have a page where people can enter song requests and even send in their responses to events, including any food specifications. This will be tied to a backend, and will store user's responses in a Postgres database.

### Architecture
This application will be hosted on AWS.