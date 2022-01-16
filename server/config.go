package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/joho/godotenv"
)

type config struct {
	port         int
	env          string
	corsEndpoint string
	db           database
	jwt          struct {
		secret string
	}
}

type database struct {
	dsn string
}

func getSecretFromAws() (SecretData, error) {
	var secretData SecretData

	svc := secretsmanager.New(
		session.New(),
		aws.NewConfig().
			WithRegion(region).
			WithCredentials(credentials.NewStaticCredentials(goDotEnvVariable("AWS_ACCESS_KEY"), goDotEnvVariable("AWS_SECRET_KEY"), "")),
	)

	input := &secretsmanager.GetSecretValueInput{
		SecretId:     aws.String(secretName),
		VersionStage: aws.String(versionStage),
	}

	result, err := svc.GetSecretValue(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case secretsmanager.ErrCodeResourceNotFoundException:
				fmt.Println(secretsmanager.ErrCodeResourceNotFoundException, aerr.Error())
			case secretsmanager.ErrCodeInvalidParameterException:
				fmt.Println(secretsmanager.ErrCodeInvalidParameterException, aerr.Error())
			case secretsmanager.ErrCodeInvalidRequestException:
				fmt.Println(secretsmanager.ErrCodeInvalidRequestException, aerr.Error())
			case secretsmanager.ErrCodeDecryptionFailure:
				fmt.Println(secretsmanager.ErrCodeDecryptionFailure, aerr.Error())
			case secretsmanager.ErrCodeInternalServiceError:
				fmt.Println(secretsmanager.ErrCodeInternalServiceError, aerr.Error())
			default:
				return secretData, aerr
			}
		} else {
			// Print the error, cast err to awserr.Error to get the Code and
			return secretData, err
		}
	}

	var secretString string
	if result.SecretString != nil {
		secretString = *result.SecretString
	}

	err = json.Unmarshal([]byte(secretString), &secretData)
	if err != nil {
		panic(err.Error())
	}
	return secretData, nil
}

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func getDsn(secretData SecretData) string {
	port, _ := strconv.Atoi(secretData.Port)
	return fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		secretData.Host, port, secretData.DBUser, secretData.DbPass, secretData.DbName)
	//return secretData.DbEngine + "://" + secretData.DBUser + ":" + secretData.DbPass + "@" + secretData.Host + ":" + secretData.Port + "/" + secretData.DbName + "?sslmode=disable"
}

func getEnvironment() string {
	if goDotEnvVariable("REACT_APP_ENV") == "dev" {
		return "development"
	} else {
		return "production"
	}
}

func getEnvironmentEndpoint(environment string) string {
	if environment == "development" {
		return "http://localhost:58000"
	} else {
		return "https://luvandkrishi.com"
	}
}
