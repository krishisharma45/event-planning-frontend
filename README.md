## Event Planning Site
This is a wedding website for Krishi and Luv's wedding. It will allow hosts to log into the app to track guest responses, as well as allow guests to view updates on wedding related events.

### Developer Setup
To run this application, you need to first make sure you have the correct version of Node installed:
```bash
brew install nvm && nvm install 12.13.1
```

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

### Near Future Updates
In the future, this wedding site will have a timeline of events (with the option to choose Luv or Krishi, as both will have separate pre-wedding ceremonies).
It will also have the a static page for common questions, travel suggestions and the couple's story.


### Future Updates
Later on, we will have a page where people can enter song requests and even send in their responses to events, including any food specifications. This will be tied to a backend, and will store user's responses in a Postgres database.

### Architecture
This application will be hosted on AWS.