import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import NavBar from "./NavBar";
import './Questionnaire.css';
import Alert from "@cloudscape-design/components/alert";
import DateRangePicker from "@cloudscape-design/components/date-range-picker";

const Al = () => {
    return (<Alert
        statusIconAriaLabel="Error"
        type="error"
        header="Unable to continue"
        dismissible={true}
        style={{ zIndex:-1, position: 'absolute' }}
        zIndex={-1}
    >
        Please fill out all questions.
    </Alert>);
}

function Questionnaire() {
    const [value, setValue] = React.useState({
        type: "absolute",
        startDate: "2023-01-09",
        endDate: "2023-12-30"
    });
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "No email provided";

    const [answers, setAnswers] = useState({
        question1: '', question3: ''
        // ... add more questions if needed
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAnswers(prevAnswers => ({
            ...prevAnswers, [name]: value
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

        console.log(value)
        // All fields are filled out. You can continue to the next step or save data, etc.
        navigate("/feed", {state: {email: email, answers: answers, startDate: value.startDate, endDate: value.endDate}});
    };
    console.log(value)

    return (<div>
            {JSON.stringify(errors) !== '{}' && <Al/>}
            <div className="App" style={{paddingTop: 60}}>
                <header className="App-header" style={{top: 70}}>
                    <NavBar style={{width: '100%', zIndex: 0}} zIndex={0}/>
                    <p>Email: {email}</p>

                    <div className='question'>
                        <label>
                            What kind of event are you looking for?:
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
                            What dates are you looking for?:
                            <DateRangePicker
                                onChange={({ detail }) => setValue(detail.value)}
                                value={value}
                                isValidRange={range => {
                                    if (range.type === "absolute") {
                                        const [
                                            startDateWithoutTime
                                        ] = range.startDate.split("T");
                                        const [
                                            endDateWithoutTime
                                        ] = range.endDate.split("T");
                                        if (
                                            !startDateWithoutTime ||
                                            !endDateWithoutTime
                                        ) {
                                            return {
                                                valid: false,
                                                errorMessage:
                                                    "The selected date range is incomplete. Select a start and end date for the date range."
                                            };
                                        }
                                        if (
                                            new Date(range.startDate) -
                                            new Date(range.endDate) >
                                            0
                                        ) {
                                            return {
                                                valid: false,
                                                errorMessage:
                                                    "The selected date range is invalid. The start date must be before the end date."
                                            };
                                        }
                                    }
                                    return { valid: true };
                                }}
                                i18nStrings={{}}
                                dateOnly
                                placeholder="Filter by a date and time range"
                                rangeSelectorMode="absolute-only"
                            />
                        </label>
                    </div>

                    <div style={{paddingBottom: 20}}>
                        <label>
                            How many people are you looking to invite?:
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
        </div>);
}

export default Questionnaire;
