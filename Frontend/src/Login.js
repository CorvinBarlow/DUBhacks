import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from "@cloudscape-design/components/alert";
import './Login.css';

const Al = () => {
    return (
        <Alert
            statusIconAriaLabel="Error"
            type="error"
            header="Unable to continue"
            dismissible={true}
        >
            This service requires a .edu email address.
        </Alert>
    );
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [noEmailError, setNoEmailError] = useState(false);

    const handleEmailChange = (event) => {
        if (/\s/.test(event.target.value)) {
            handleSubmit();
        }
        setEmail(event.target.value);
    }

    const handleSubmit = () => {
        if (!email || !email.includes('edu')) {
            setNoEmailError(true);
            return;
        }
        navigate("/questionnaire", { state: { email: email } });
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleSubmit();
        }
    }

    return (
        <div>
            {noEmailError && <Al />}
            <div className="App">
                <header className="App-header" style={{paddingTop: '150px'}}>
                    <h1>Xpeerience</h1>
                    <div className="email-container">
                        <label className="email-label">Email address: </label>
                        <input
                            className="email-input"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <button onClick={handleSubmit}>Submit!</button>
                </header>
            </div>
        </div>
    );
}

export default Login;
