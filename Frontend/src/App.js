import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Feed from './Feed';
import Questionnaire from "./Questionnaire";
import './App.css';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/questionnaire" element={<Questionnaire />} />
            <Route exact path="/feed" element={<Feed />} />
        </Routes>
    );
}

export default App;
