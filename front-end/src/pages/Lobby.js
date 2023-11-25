import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCodeTitles } from '../axios';
import '../Styles/Lobby.css';

const Lobby = () => {
    const [titles, setTitles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // use Effect to get the titles from the server
        const fetchData = async () => {
            try {
                const data = await getCodeTitles();
                setTitles(data);
            } catch (error) {
                console.error('Error fetching code titles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Choose code block</h1>

            {loading ? (
                <div className="loader"></div>
            ) : (
                <ul>
                    {titles.map((block) => (
                        <li key={block.title}>
                            <Link to={`/code/${block.title}`}>{block.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Lobby;
