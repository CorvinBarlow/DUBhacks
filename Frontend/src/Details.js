import React from 'react';
import { useLocation } from 'react-router-dom';
import Alert from "@cloudscape-design/components/alert";

const Details = () => {
    const location = useLocation();
    console.log(location.state)
    if (!location.state) {
        return (
            <Alert
                statusIconAriaLabel="Error"
                type="error"
                header="Unable to continue"
                dismissible={true}
            >
                No additional info found.
            </Alert>
        );;
    }
    const event = location.state.event;
    console.log(location.state)


    return (
        <div className="event-details">
            <h2>Event Details</h2>
            <p><strong>Date:</strong> {event.at(1)}</p>
            <p><strong>Location:</strong> {event.at(2)}</p>
            {/* Add more event details as needed */}
        </div>
    );
}

export default Details;
