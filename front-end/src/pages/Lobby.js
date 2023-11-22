import React from 'react'
import { Link } from 'react-router-dom';

const Lobby = () => {
    const codeBlocks = [
        { id: 1, name: 'Async case' },
        { id: 2, name: 'Another case' },
        { id: 3, name: 'Third case' },
        { id: 4, name: 'Fourth case' },
    ];
    return (
        <div>
            <h1>Choose code block</h1>
            <ul>
                {codeBlocks.map((block) => (
                    <li key={block.id}>
                        <Link to={`/code/${block.name}`}>{block.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Lobby