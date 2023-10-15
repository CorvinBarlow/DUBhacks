import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Questionnaire.css';

function Feed() {
    const location = useLocation();
    const answers = location.state?.answers || "No answers provided!!";

    return (
        <div className="App">
            <header className="App-header">
                <p>idk</p>
                <p>{answers.toString()}</p>
            </header>
        </div>
    );
}

export default Feed;
