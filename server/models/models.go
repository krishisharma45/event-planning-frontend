package models

import (
	"database/sql"
	"time"
)

// Models is the wrapper for database
type Models struct {
	DB DBModel
}

// NewModels returns models with DB pool
func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

type AuthResponse struct {
	Exists   bool `json:"exists"`
	FamilyID int  `json:"family_id"`
}

type Auth struct {
	FamilyName string    `json:"family_name"`
	SecretID   int       `json:"secret_id"`
	FamilyID   int       `json:"family_id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// EventDetails is the response for how events attributed to a family
type EventDetails struct {
	FamilyID   int    `json:"family_id"`
	FamilyName string `json:"family_name"`
	Members    string `json:"members"`
	EventName  string `json:"event_name"`
	Venue      string `json:"venue"`
	EventID    int    `json:"event_id"`
	Attending  int    `json:"attending"`
}

// Events is the type for events
type Events struct {
	ID        int       `json:"id"`
	EventName string    `json:"event_name"`
	Venue     string    `json:"venue"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Family is the type for families
type Family struct {
	Members    int       `json:"members"`
	FamilyName string    `json:"family_name"`
	ID         int       `json:"id"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

// FamilyEvents is the type for FamilyEvents
type FamilyEvents struct {
	ID        int       `json:"id"`
	FamilyID  int       `json:"family_id"`
	EventID   int       `json:"event_id"`
	Attending int       `json:"attending"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Movie struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	ReleaseDate time.Time `json:"release_date"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Genre struct {
	ID        int       `json:"id"`
	GenreName string    `json:"genre_name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MovieGenre struct {
	ID        int       `json:"id"`
	MovieID   int       `json:"movie_id"`
	GenreID   int       `json:"genre_id"`
	Genre     Genre     `json:"genre"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
