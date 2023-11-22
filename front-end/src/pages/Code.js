import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import '../Styles/Code.css';
import { getCodeByTitle } from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';



const hljs = require('highlight.js/lib/core');

// Load any languages you need
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

const Code = () => {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [isMentor, setIsMentor] = useState(false);
    const textareaRef = useRef(null);
    const [codeData, setCodeData] = useState(null)
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        hljs.highlightBlock(textareaRef.current);
        const fetchData = async () => {
            const data = await getCodeByTitle(id);
            setCodeData(data[0]);
        }
        fetchData();
    }, []);


    useEffect(() => {
        const newSocket = io('https://moveo-server-z2xn.onrender.com');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', id);

            socket.on('codeChange', (newCode) => {
                if (isMentor) {
                    setCode(newCode);
                    checkSuccess(newCode);
                }
            });
            socket.on('mentorStatus', (status) => {
                setIsMentor(status);
            });
        }
    }, [id, socket, isMentor]);

    const handleCodeChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);
        checkSuccess(newCode);
        socket.emit('codeChange', { roomId: id, code: newCode });
    };

    const checkSuccess = (newCode) => {
        console.log("code: ", newCode);
        console.log('data: ', codeData.code);
        if (newCode === codeData.code) {
            setSuccess(true);
        }
        else {
            setSuccess(false)
        }
    }
    useEffect(() => {

    }, [isMentor])

    return (
        <div className="code-div">
            {isMentor &&
                <h1>Mentor</h1>
            }
            <h1>Code block details</h1>
            <p> {id}</p>
            <div className="code-block-container">
                <textarea
                    ref={textareaRef}
                    className="code-block"
                    placeholder="Write your code here..."
                    value={code}
                    onChange={handleCodeChange}
                    rows={20}
                    cols={50}
                    readOnly={isMentor}
                />
            </div>

            {success &&
                <FontAwesomeIcon icon={faFaceSmile} size='10x' color='yellow' />
            }
        </div>
    );
}

export default Code;
