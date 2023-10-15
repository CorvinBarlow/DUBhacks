import React, { useState, useEffect } from 'react';
import './Feed.css';

const API_ENDPOINT = "http://127.0.0.1:5000/db";

const Feed = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch events from the API
        const fetchEvents = async () => {
            try {
                const response = await fetch(API_ENDPOINT);

                // Ensure the fetch was successful
                if (!response.ok) {
                    throw new Error(`Error with status: ${response.status}`);
                }

                const data = await response.json();
                const limitedEvents = data.events.slice(0, 9);
                setEvents(limitedEvents);
            } catch (err) {
                console.error("There was an error fetching the data", err);
                setError(err.message);
            }
        };

        fetchEvents();
    }, []);

    console.log(events)
    return (
        <div className="App">
        <header className="App-header">
        <div style={{alignSelf: "center"}}>
            <h2 style={{alignSelf: "center", color: 'White'}}>Events</h2>
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="cards" style={{alignSelf: "center"}}>
                    {events.map(event => (
                        <div className="card" key={event.id} style={{alignSelf: "center"}}>
                            <button>Details</button>
                            <p><strong>Date:</strong> {event.at(1)}</p>
                            <p><strong>Location:</strong> {event.at(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </header>
        </div>
    );
}

export default Feed;
