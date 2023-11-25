import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import '../Styles/Code.css';
import { getCodeByTitle } from '../axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faArrowLeft, faRefresh } from '@fortawesome/free-solid-svg-icons';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another




const Code = () => {
    const navigate = useNavigate();
    const { title } = useParams();
    const [code, setCode] = useState('');
    const [socket, setSocket] = useState(null);
    const [isMentor, setIsMentor] = useState(false);
    const [codeData, setCodeData] = useState(null)
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // initialize the socket with the server
        const newSocket = io('https://moveo-server-z2xn.onrender.com');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        // joins the room with the title
        if (socket) {
            socket.emit('joinRoom', title);

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
    }, [title, socket, isMentor]);

    useEffect(() => {
        // fetch code details from server
        const fetchData = async () => {
            try {
                const data = await getCodeByTitle(title);
                setCodeData(data[0]);
                setCode(data[0].code);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [title])

    const handleCodeChange = (newCode) => {
        // setting the code to the new code and sending in to the socket
        setCode(newCode);
        checkSuccess(newCode);
        socket.emit('codeChange', { roomId: title, code: newCode });
    };

    const checkSuccess = (newCode) => {
        // removeing all spaces and tabs from the code string to compare the solution to the current code
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

    const refreshCode = () => {
        setCode(codeData.code)
        setSuccess(false);
        socket.emit('codeChange', { roomId: title, code: codeData.code });
    }


    return (
        <div>
            <FontAwesomeIcon
                icon={faArrowLeft}
                size='3x'
                style={{ marginLeft: '20px', marginTop: '10px' }}
                onClick={goBack}
                cursor='pointer'
            />
            <div className='code-div'>
                <div className='code-title-div'>

                    <h2> {title}</h2>
                    <FontAwesomeIcon
                        icon={faRefresh}
                        size='lg'
                        cursor='pointer'
                        onClick={!isMentor ? refreshCode : () => { }}

                    />
                </div>
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <Editor
                        value={code}
                        onValueChange={handleCodeChange}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        readOnly={isMentor}
                        insertSpaces={true}
                        style={{
                            backgroundColor: 'white',
                            height: '50vh',
                            widows: '40vw',
                            fontFamily: 'monospace',
                            fontSize: 20,
                            border: '1px solid #ddd',
                        }}
                    />
                )}

                {success &&
                    <>
                        <FontAwesomeIcon icon={faFaceSmile} size='10x' color='orange' style={{ marginTop: '20px' }} />
                        <h1>Very Good!!</h1>
                    </>
                }
            </div>
        </div>
    );
}

export default Code;
