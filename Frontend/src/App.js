import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Feed from './Feed';
import Details from './Details';
import Questionnaire from "./Questionnaire";
import CreateEvent from "./CreateEvent";
import './App.css';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/questionnaire" element={<Questionnaire />} />
            <Route exact path="/feed" element={<Feed />} />
            <Route exact path="/createEvent" element={<CreateEvent />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
    );
}

export default App;
