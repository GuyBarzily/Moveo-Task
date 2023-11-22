import React from 'react'
import { useParams } from 'react-router-dom';


const Code = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Code block details</h1>
            <p>Name: {id}</p>
            {/* Add more details about the code block here */}
        </div>
    )
}

export default Code