import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    navbar: {
        top: 0,
        width: '100%',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'darkblue',
        zIndex: 0,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
    },
    navItem: {
        margin: '0 1rem',
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        transition: 'background 0.3s',  // smooth transition
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
        },
    }
}

const Navbar = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate("/");
    }

    const handleAboutClick = () => {
        navigate("/feed");
    }

    const handleCreateClick = () => {
        navigate("/createEvent");
    }

    return (
        <div style={styles.navbar}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <span style={styles.navItem} onClick={handleHomeClick}>Home</span>
                <span style={styles.navItem} onClick={handleAboutClick}>Events</span>
                <span style={styles.navItem} onClick={handleCreateClick}>Create</span>
            </div>
        </div>
    );
}

export default Navbar;
