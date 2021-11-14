package models

import (
	"context"
	"database/sql"
	"fmt"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

//GetFamilies will return a particular family
func (m *DBModel) GetFamilies(id int) (*Family, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, members, family_name, created_at, updated_at from family where id = $1`
	row := m.DB.QueryRowContext(ctx, query, id)
	var family Family

	err := row.Scan(
		&family.ID,
		&family.Members,
		&family.FamilyName,
		&family.CreatedAt,
		&family.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &family, nil
}

//GetEventsForFamily will return events for a particular family
func (m *DBModel) GetEventsForFamily(id int) (*[]EventDetails, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	//query := `select event_id, attending, created_at, updated_at from family_events fe where fe.family_id = $1`
	secondQuery := `select family_name, members, event_name, venue from family_events fe left join events e on e.id = fe.event_id left join family f on f.id = fe.family_id where family_id = $1`
	rows, err := m.DB.QueryContext(ctx, secondQuery, id)
	defer rows.Close()
	if err != nil {
		fmt.Print(err)
		return nil, err
	}

	var eventDetails []EventDetails
	for rows.Next() {
		var eventDetail EventDetails
		err = rows.Scan(
			&eventDetail.FamilyName,
			&eventDetail.Members,
			&eventDetail.EventName,
			&eventDetail.Venue,
		)
		if err != nil {
			return &[]EventDetails{}, err
		}
		eventDetails = append(eventDetails, eventDetail)
	}

	if err != nil {
		fmt.Print(err)
		return nil, err
	}
	return &eventDetails, nil
}

//GetEvents will return a particular event
func (m *DBModel) GetEvents(id int) (*Events, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, event_name, venue, created_at, updated_at from event where id = $1`
	row := m.DB.QueryRowContext(ctx, query, id)

	var event Events

	err := row.Scan(
		&event.ID,
		&event.EventName,
		&event.Venue,
		&event.CreatedAt,
		&event.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &event, nil
}

func (m *DBModel) All(id int) ([]*Movie, error) {
	return nil, nil
}
