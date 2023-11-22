import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import '../Styles/Code.css';

const Code = () => {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [isMentor, setIsMentor] = useState(false);


    useEffect(() => {
        console.log('useEffect');
        const newSocket = io('ws://localhost:8080');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', id);

            socket.on('codeChange', (newCode) => {
                setCode(newCode);
            });
            socket.on('mentorStatus', (status) => {
                setIsMentor(status);
            });
        }
    }, [id, socket]);

    const handleCodeChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);

        socket.emit('codeChange', { roomId: id, code: newCode });
    };
    useEffect(() => { }, [isMentor])

    return (
        <div className="code-div">
            {isMentor &&
                <h1>Mentor</h1>
            }
            <h1>Code block details</h1>
            <p> {id}</p>

            <div className="code-block-container">
                <textarea
                    className="code-block"
                    placeholder="Write your code here..."
                    value={code}
                    onChange={handleCodeChange}
                    rows={20}
                    cols={50}
                    readOnly={isMentor}
                />
            </div>
        </div>
    );
}

export default Code;
