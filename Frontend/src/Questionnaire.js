import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Questionnaire.css';

function Questionnaire() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "No email provided";

    const [answers, setAnswers] = useState({
        question1: '',
        question2: '',
        question3: ''
        // ... add more questions if needed
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [name]: value
        }));
    };

    const handleButtonClick = () => {
        const newErrors = {};

        for (let key in answers) {
            if (!answers[key].trim()) {
                newErrors[key] = 'This field is required';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // All fields are filled out. You can continue to the next step or save data, etc.
        navigate("/feed", { state: { email: email, answers: answers } });
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Email: {email}</p>

                <div className='question'>
                    <label>
                        Question 1:
                        <input
                            type="text"
                            name="question1"
                            value={answers.question1}
                            onChange={handleInputChange}
                        />
                        {errors.question1 && <span className='err'>{errors.question1}</span>}
                    </label>
                </div>

                <div className='question'>
                    <label>
                        Question 2:
                        <input
                            type="text"
                            name="question2"
                            value={answers.question2}
                            onChange={handleInputChange}
                        />
                        {errors.question2 && <span className='err'>{errors.question2}</span>}
                    </label>
                </div>

                <div style={{paddingBottom: 20}}>
                    <label>
                        Question 3:
                        <input
                            type="text"
                            name="question3"
                            value={answers.question3}
                            onChange={handleInputChange}
                        />
                        {errors.question3 && <span className='err'>{errors.question3}</span>}
                    </label>
                </div>
                <button onClick={handleButtonClick}>
                    Submit
                </button>
            </header>
        </div>
    );
}

export default Questionnaire;
