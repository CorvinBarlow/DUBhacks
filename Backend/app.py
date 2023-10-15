import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

# Function to insert a person into the "people" table
def insert_person(first_name, last_name, email, birthdate):
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute("INSERT INTO people (first_name, last_name, email, birthdate) VALUES (?, ?, ?, ?)",
              (first_name, last_name, email, birthdate))
    conn.commit()
    conn.close()

# Function to retrieve all people from the "people" table
def get_all_people():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute("SELECT * FROM people")
    results = c.fetchall()
    conn.close()
    return results

# Function to insert an event into the "events" table
def insert_event(event_name, event_date, location, hashtags):
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute("INSERT INTO events (event_name, event_date, location, hashtags) VALUES (?, ?, ?)",
              (event_name, event_date, location))
    conn.commit()
    conn.close()

# Function searches "events" table for all events with the searched hashtag.
def recommendation(search):
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute(f"SELECT event_name FROM events WHERE hashtags LIKE '{search}'")
    results = c.fetchall()
    conn.close()
    return results

# Function to retrieve all events from the "events" table
def get_all_events():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute("SELECT * FROM events")
    results = c.fetchall()
    conn.close()
    return results

@app.route("/people", methods=["POST"])
def add_person():
    data = request.json
    if data:
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')
        birthdate = data.get('birthdate')
        insert_person(first_name, last_name, email, birthdate)
        return jsonify({'message': 'Person added successfully'})
    else:
        return jsonify({'error': 'Invalid data provided'}), 400

@app.route("/people", methods=["GET"])
def list_people():
    people_data = get_all_people()
    return jsonify({'people': people_data})

@app.route("/events", methods=["POST"])
def add_event():
    data = request.json
    if data:
        event_name = data.get('event_name')
        event_date = data.get('event_date')
        location = data.get('location')
        insert_event(event_name, event_date, location)
        return jsonify({'message': 'Event added successfully'})
    else:
        return jsonify({'error': 'Invalid data provided'}), 400

@app.route("/events", methods=["GET"])
def list_events():
    events_data = get_all_events()
    return jsonify({'events': events_data})

# Check if the "people" table exists and create it if it doesn't
def create_people_table_if_not_exists():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()

    # Check if the "people" table exists
    c.execute('''SELECT count(name) FROM sqlite_master WHERE type='table' AND name='people' ''')
    table_exists = c.fetchone()[0]

    if not table_exists:
        # If the table doesn't exist, create it
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


# Check if the "events" table exists and create it if it doesn't
def create_events_table_if_not_exists():
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()

    # Check if the "events" table exists
    c.execute('''SELECT count(name) FROM sqlite_master WHERE type='table' AND name='events' ''')
    table_exists = c.fetchone()[0]

    if not table_exists:
        # If the table doesn't exist, create it
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


@app.route("/db", methods=["GET"])
def get_from_db():
    # Create the "people" table if it doesn't exist
    create_people_table_if_not_exists()

    # Create the "events" table if it doesn't exist
    create_events_table_if_not_exists()

    # Now you can query the "people" and "events" tables
    conn = sqlite3.connect('xpeerience.sqlite')
    c = conn.cursor()
    c.execute("SELECT * FROM people")
    people_results = c.fetchall()
    c.execute("SELECT * FROM events")
    events_results = c.fetchall()
    conn.close()

    return jsonify({'people': people_results, 'events': events_results})


if __name__ == '__main__':
    app.debug = True
    app.run(port=8000)
