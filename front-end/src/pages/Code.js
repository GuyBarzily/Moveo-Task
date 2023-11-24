import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../Styles/Code.css';
import { getCodeByTitle } from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another




const Code = () => {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [isMentor, setIsMentor] = useState(false);
    const [codeData, setCodeData] = useState(null)
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const newSocket = io('https://moveo-server-z2xn.onrender.com');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCodeByTitle(id);
                setCodeData(data[0]);
                setCode(data[0].code);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
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

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        checkSuccess(newCode);
        socket.emit('codeChange', { roomId: id, code: newCode });
    };

    const checkSuccess = (newCode) => {
        if (codeData && newCode.replace(/\s/g, '') === codeData.solution.replace(/\s/g, '')) {
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
            <h1>Code block details</h1>
            <h2> {id}</h2>
            {loading ? (
                <div className="loader"></div>
            ) : (
                <div >
                    <Editor
                        value={code}
                        onValueChange={handleCodeChange}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        readOnly={isMentor}
                        style={{
                            backgroundColor: 'white',
                            minHeight: '50vh',
                            minWidth: '40vw',
                            fontFamily: 'monospace',
                            fontSize: 20,
                            border: '1px solid #ddd',
                            cursor: isMentor ? 'default' : 'text',


                        }}
                    />

                </div>
            )}
            {success &&
                <>
                    <FontAwesomeIcon icon={faFaceSmile} size='10x' color='orange' style={{ marginTop: '20px' }} />
                    <h1>Very Good!</h1>
                </>
            }
        </div>
    );
}

export default Code;
