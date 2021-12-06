## Event Planning Site
This is a wedding website for Krishi and Luv's wedding. It will allow hosts to log into the app to track guest responses, as well as allow guests to view updates on wedding related events.

### Developer Setup: Docker
The method for running this application is using Docker to containerize the services and Docker Compose to manage the different services required for this application. 
Please make sure you install Docker Desktop before proceeding:
https://docs.docker.com/desktop/mac/install/

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

Bringing the services up will also load the data into the Postgres database. In production, the data is stored in an AWS RDS instance. The database service brought up by Docker Compose is just for local development purposes.

Once you're finished, you can stop and remove all containers for the services by doing:
```bash
bin/down.sh
```

To play with the UI, navigate to 0.0.0.0:58000 in your browser once the services are up.
To play with the API, navigate to 0.0.0.0:59000 in your browser or Postman once the API and DB services are up.

Note that this application has two custom-built images. A publicly available image is used to bring up Postgres, the database we used to store guest information.


### Deployment Guide: Terraform
Deployment for this application is automated and codified using Terraform. To deploy this application, you first need to initialize the Terraform scripts, plan the resources that will be provisioned. Lastly, apply the resources.

This command initializes the Terraform scripts:
```shell
terraform init
```

This command plans the resources to be provisioned:
```shell
terraform plan
```

And this command applies the Terraform plan:
```shell
terraform apply
```

If you need to modify the Terraform scripts to make change, look at the Terraform files in the infrastructure directory of the project repo.


## Details About the Application
### API Examples
To get events for a family
`http://localhost:59000/v1/family/events/1` - GET

### Cloud Architecture
This application will be hosted on AWS. We use AWS ECS to host the application and AWS RDS to host the database.