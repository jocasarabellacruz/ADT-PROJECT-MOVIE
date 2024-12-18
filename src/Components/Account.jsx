// Account.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Account.css';

const Account = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await axios.get("http://localhost/get_user");
                setUsername(response.data.username);
            } catch (err) {
                setError('Failed to fetch username.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsername();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div className='accPanel'>
            <h1 className='accName'>Hello, Tite {username}!</h1>
        </div>
    );
};

export default Account;



