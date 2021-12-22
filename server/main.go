package main

import (
	"context"
	"database/sql"
	"event-planning/server/models"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var (
	secretName   string = "arn:aws:secretsmanager:us-east-1:527761931337:secret:rds/event-planning-db-Lc3jfe"
	region       string = "us-east-1"
	versionStage string = "AWSCURRENT"
)

//SecretData is used to get secret data from AWS
type SecretData struct {
	DBUser   string `json:"username"`
	DbPass   string `json:"password"`
	Port     string `json:"port"`
	Host     string `json:"host"`
	DbName   string `json:"dbName"`
	DbEngine string `json:"dbEngine"`
}

//AppStatus is used to track the status of the application
type AppStatus struct {
	Status      string `json:"status"`
	Environment string `json:"environment"`
}

type application struct {
	config config
	logger *log.Logger
	models models.Models
}

func main() {
	var cfg config
	flag.IntVar(&cfg.port, "port", 8080, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment")
	secretData, err := getSecretFromAws()
	connectionString := getDsn(secretData)
	fmt.Println(connectionString)
	flag.StringVar(&cfg.db.dsn, "dsn", connectionString, "Postgres connection string")
	flag.StringVar(&cfg.jwt.secret, "jwt-secret", "2dce505d96a53c5768052ee90f3df2055657518dad489160df9913f66042e160", "secret")
	flag.Parse()

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	db, err := openDB(cfg)
	if err != nil {
		logger.Fatal(err)
	}
	defer db.Close()
	app := &application{
		config: cfg,
		logger: logger,
		models: models.NewModels(db),
	}
	app.routes()
}

func pingHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func helloHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello, world",
	})
}

func openDB(cfg config) (*sql.DB, error) {
	db, err := sql.Open("postgres", cfg.db.dsn)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}
