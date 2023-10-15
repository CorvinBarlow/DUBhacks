import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import './Questionnaire.css';
import DatePicker from "@cloudscape-design/components/date-picker";
import FormField from "@cloudscape-design/components/form-field";


function CreateEvent() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "No email provided";
    const [date, setDate] = useState('');


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

    const handleButtonClick = async () => {
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

        // Prepare the event data based on the provided answers and date
        const eventData = {
            event_name: answers.question1,
            location: answers.question2,
            event_date: date,
            hashtags: answers?.question3 || '',
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eventData),
            });

            const responseData = await response.json();

            if (response.status === 200) {
                alert(responseData.message);
                // You can navigate to another page after successful submission if needed
                navigate("/feed", { state: { email: email, answers: answers } });
            } else {
                alert(responseData.error);
            }
        } catch (error) {
            alert("There was an error submitting the event. Please try again.");
        }
    };

    return (
        <div className="App" style={{top: 0}}>

            <header className="App-header" style={{top: 0}}>
                <NavBar style={{width: '100%'}}/>
                <p>Email: {email}</p>

                <div className='question'>
                    <label>
                        Name of Event:
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
                        Location:
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
                        Date:
                        <FormField
                            style={{textColor: 'white'}}
                            constraintText="Use YYYY/MM/DD format."
                        >
                            <DatePicker
                                onChange={({ detail }) => setDate(detail.value)}
                                value={date}
                                openCalendarAriaLabel={selectedDate =>
                                    "Choose certificate expiry date" +
                                    (selectedDate
                                        ? `, selected date is ${selectedDate}`
                                        : "")
                                }
                                placeholder="YYYY/MM/DD"
                            />
                        </FormField>
                        {errors.question3 && <span className='err'>{errors.question3}</span>}
                    </label>
                </div>
                <div style={{paddingBottom: 20}}>
                    <label>
                        HashTags (optional):
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

export default CreateEvent;
