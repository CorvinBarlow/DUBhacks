import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        if (/\s/.test(event.target.value)) {
            handleSubmit();
        }
        setEmail(event.target.value);
    }

    const handleSubmit = () => {
        navigate("/questionnaire", { state: { email: email } });
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleSubmit();
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className="email" style={{ paddingBottom: '50px' }}>
                    <label>Email address: </label>
                    <input
                        className="email"
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
    );
}

export default Login;
