-- Create the 'people' table
CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    birthdate DATE
);

-- Create the 'events' table
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    event_name TEXT,
    event_date DATE,
    location TEXT
);

-- Insert mock data into the 'people' table
INSERT INTO people (first_name, last_name, email, birthdate) VALUES
    ('John', 'Doe', 'john.doe@example.com', '1990-01-15'),
    ('Jane', 'Smith', 'jane.smith@example.com', '1985-03-20'),
    ('Michael', 'Johnson', 'michael.johnson@example.com', '1978-07-10'),
    ('Emily', 'Wilson', 'emily.wilson@example.com', '1995-09-25'),
    ('William', 'Brown', 'william.brown@example.com', '1983-11-30'),
    ('Olivia', 'Taylor', 'olivia.taylor@example.com', '1992-04-05'),
    ('James', 'Anderson', 'james.anderson@example.com', '1970-12-12'),
    ('Sophia', 'Martinez', 'sophia.martinez@example.com', '1989-08-18'),
    ('Benjamin', 'Garcia', 'benjamin.garcia@example.com', '1997-02-22'),
    ('Emma', 'Miller', 'emma.miller@example.com', '1982-06-08');

-- Insert mock data into the 'events' table
INSERT INTO events (event_name, event_date, location) VALUES
    ('Birthday Party', '2023-01-20', '123 Main St'),
    ('Conference', '2023-03-15', '456 Elm St'),
    ('Wedding', '2023-05-05', '789 Oak St'),
    ('Company Picnic', '2023-07-10', '101 Park Ave'),
    ('Graduation Ceremony', '2023-06-30', '222 Pine St'),
    ('Product Launch', '2023-09-12', '333 Maple St'),
    ('Family Reunion', '2023-08-25', '444 Cedar St'),
    ('Art Exhibition', '2023-04-08', '555 Birch St'),
    ('Charity Gala', '2023-10-05', '666 Willow St'),
    ('Sporting Event', '2023-11-15', '777 Redwood St');
