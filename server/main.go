package main

import (
	"context"
	"database/sql"
	"event-planning/server/models"
	"flag"
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

//AppStatus is used to track the status of the application
type AppStatus struct {
	Status      string `json:"status"`
	Environment string `json:"environment"`
}

type config struct {
	port int
	env  string
	db   struct {
		dsn string
	}
}

type application struct {
	config config
	logger *log.Logger
	models models.Models
}

func main() {
	var cfg config
	flag.IntVar(&cfg.port, "port", 8000, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment")
	flag.StringVar(&cfg.db.dsn, "dsn", "postgres://luvjain@localhost/event_planning?sslmode=disable", "Postgres connection string")
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
