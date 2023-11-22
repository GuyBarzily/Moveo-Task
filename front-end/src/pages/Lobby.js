import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getCodeTitles } from '../axios';

const Lobby = () => {
    const [titles, setTitles] = useState([]);
    useState(() => {
        const fetchData = async () => {
            const data = await getCodeTitles();
            setTitles(data)
        }
        fetchData();
    }, [])
    return (
        <div>
            <h1>Choose code block</h1>
            <ul>
                {titles.map((block) => (
                    <li key={block.title}>
                        <Link to={`/code/${block.title}`}>{block.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Lobby