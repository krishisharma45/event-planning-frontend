package main

type config struct {
	port int
	env  string
	db   database
	jwt  struct {
		secret string
	}
}

type database struct {
	dsn string
}

func NewConfig() *config {
	db := database{
		"postgres://luvjain@localhost/event_planning?sslmode=disable",
	}
	cfg := &config{
		port: 8000,
		env:  "development",
		db:   db,
	}
	return cfg
}
