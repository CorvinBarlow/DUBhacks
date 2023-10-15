import sqlite3


def create_people_table():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            birthdate DATE
        )
    ''')
    conn.commit()
    conn.close()


def create_events_table():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY,
            event_name TEXT,
            event_date DATE,
            location TEXT,
            hashtags TEXT
        )
    ''')
    conn.commit()
    conn.close()


def insert_dummy_people():
    people = [
        ('John', 'Doe', 'john.doe@example.com', '1990-01-01'),
        ('Jane', 'Smith', 'jane.smith@example.com', '1992-05-15'),
        # Add more dummy people as needed
    ]

    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.executemany("INSERT INTO people (first_name, last_name, email, birthdate) VALUES (?, ?, ?, ?)", people)
    conn.commit()
    conn.close()


def insert_dummy_events():
    events = [
        ('Rock Concert', '2023-10-20', 'Stadium', '#rock #concert'),
        ('Tech Conference', '2023-11-05', 'Convention Center', '#tech #conference'),
        ('Art Exhibition', '2023-12-15', 'Art Gallery', '#art #exhibition'),
        ('Food Festival', '2023-12-28', 'City Park', '#food #festival'),
        ('Comedy Show', '2024-01-10', 'Comedy Club', '#comedy #show'),
        ('Science Fair', '2024-02-20', 'Science Museum', '#science #fair'),
        ('Movie Premiere', '2024-03-05', 'Cinema', '#movie #premiere'),
        ('Music Festival', '2024-04-18', 'Outdoor Venue', '#music #festival'),
        ('Fashion Show', '2024-05-02', 'Fashion Center', '#fashion #show'),
        ('Sports Championship', '2024-06-10', 'Sports Arena', '#sports #championship'),
        ('Book Launch', '2024-07-25', 'Bookstore', '#book #launch'),
    ]

    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.executemany("INSERT INTO events (event_name, event_date, location, hashtags) VALUES (?, ?, ?, ?)", events)
    conn.commit()
    conn.close()


def drop_tables():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS people")
    c.execute("DROP TABLE IF EXISTS events")
    conn.commit()
    conn.close()


if __name__ == '__main__':
    create_people_table()
    create_events_table()
    insert_dummy_people()
    insert_dummy_events()
    print("Database initialized and populated with dummy data.")
