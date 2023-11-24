import React, { useEffect, useState } from 'react';
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
    const navigate = useNavigate();
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

    useEffect(() => {

    }, [isMentor])

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

    const goBack = () => {
        navigate(-1);
    }


    return (
        <div>
            <FontAwesomeIcon
                icon={faArrowLeft}
                size='3x'
                color='orange'
                style={{ marginLeft: '20px', marginTop: '10px' }}
                onClick={goBack}
                cursor='pointer'
            />
            <div className='code-div'>
                <h2> {id}</h2>
                {loading ? (
                    <div className="loader"></div>
                ) : (
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
                )}

                {success &&
                    <>
                        <FontAwesomeIcon icon={faFaceSmile} size='10x' color='orange' style={{ marginTop: '20px' }} />
                        <h1>Very Good!</h1>
                    </>
                }
            </div>
        </div>
    );
}

export default Code;
