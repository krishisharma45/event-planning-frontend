psql -h practice-db.cbnij5xwgxzf.us-east-1.rds.amazonaws.com -U postgres -d postgres -c '\COPY events FROM ''docs/events.csv'' CSV HEADER';
psql -h practice-db.cbnij5xwgxzf.us-east-1.rds.amazonaws.com -U postgres -d postgres -c '\COPY auth FROM ''docs/auth.csv'' CSV HEADER';
psql -h practice-db.cbnij5xwgxzf.us-east-1.rds.amazonaws.com -U postgres -d postgres -c '\COPY family_events FROM ''docs/family_events.csv'' CSV HEADER';
psql -h practice-db.cbnij5xwgxzf.us-east-1.rds.amazonaws.com -U postgres -d postgres -c '\COPY family FROM ''docs/family.csv'' CSV HEADER';