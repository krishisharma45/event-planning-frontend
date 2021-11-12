package models

import (
	"context"
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

func (m *DBModel) Get(id int) (*Family, error) {
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

func (m *DBModel) All(id int) ([]*Movie, error) {
	return nil, nil
}
