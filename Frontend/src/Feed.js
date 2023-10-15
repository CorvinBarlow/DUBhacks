import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavBar from "./NavBar";
import './Feed.css';

const API_ENDPOINT = "http://127.0.0.1:5000/list_events";

const Feed = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    const location = useLocation();
    const startDate = location.state?.startDate || null;
    const endDate = location.state?.endDate || null;

    useEffect(() => {
        // Fetch events from the API
        const fetchEvents = async () => {
            try {
                const params = {};

                if (startDate) params.startDate = startDate;
                if (endDate) params.endDate = endDate;

                const queryString = new URLSearchParams(params).toString();

                const response = await fetch(`${API_ENDPOINT}?${queryString}`);

                // Ensure the fetch was successful
                if (!response.ok) {
                    throw new Error(`Error with status: ${response.status}`);
                }

                const data = await response.json();
                const limitedEvents = data.events.slice(0, 20);
                setEvents(limitedEvents);
            } catch (err) {
                console.error("There was an error fetching the data", err);
                setError(err.message);
            }
        };

        fetchEvents();
    }, [startDate, endDate]);
    console.log(events)

    return (
        <div className="App" style={{paddingTop:'100px'}}>
            <header className="App-header">
                <NavBar style={{width: '100%'}}/>
                <div style={{alignSelf: "center"}}>
                    <h2 style={{alignSelf: "center", color: 'White'}}>Events</h2>
                    {error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <div className="cards" style={{alignSelf: "center"}}>
                            {events.map(event => (
                                <div className="card" key={event.id} style={{alignSelf: "center"}}>
                                    <Link
                                        to={{
                                            pathname: `/details/${event.at(0)}`,
                                            state: { event }
                                        }}
                                        style={{ textDecoration: 'none' }} // remove the default link styling
                                    >
                                        <button className="details-button">
                                            Details
                                        </button>
                                    </Link>
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
