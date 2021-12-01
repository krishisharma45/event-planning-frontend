## Event Planning Site
This is a wedding website for Krishi and Luv's wedding. It will allow hosts to log into the app to track guest responses, as well as allow guests to view updates on wedding related events.

### Developer Setup: Docker
The preferred method for running this application is using Docker to containerize the services and Docker Compose to manage the different services required for this application.

To start, you need to first make sure you have Git, Docker and Postgres installed. Below is the documentation for Git and Docker:
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
https://www.docker.com/products/docker-desktop

To install Postgres, use
```bash
brew install postgresql
```

Once you have Docker installed and have cloned this repo, all you need to do to build all the images for this application is:
```bash
bin/build.sh
```

If you want to just build one image for a specific service, do:
```bash
bin/build.sh api
```

To bring up the services for the application, do this once the images have finished building:
```bash
bin/up.sh
```

To add data to the event_planning database for the first time, use this command:
```bashc
psql -d event_planning -f ./server/go_events.sql -h 0.0.0.0
```

Once you're finished, you can stop and remove all containers for the services by doing:
```bash
bin/down.sh
```

To play with the UI, navigate to 0.0.0.0:58000 in your browser once the services are up.
To play with the API, navigate to 0.0.0.0:59000 in your browser or Postman once the API and DB services are up.

Note that this application has two custom-built images. A publicly available image is used to bring up Postgres, the database we used to store guest information.


### Developer Setup: Local

#### UI: Bringing up the frontend locally
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

#### API: Bringing up the backend locally
Create a localhost table in Postico.

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
It will also have a static page for common questions, travel suggestions and the couple's story.


### Future Updates
Later on, we will have a page where people can enter song requests and even send in their responses to events, including any food specifications. This will be tied to a backend, and will store user's responses in a Postgres database.

### Architecture
This application will be hosted on AWS.