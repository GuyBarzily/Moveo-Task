import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; // Import the language syntax module
import 'prismjs/themes/prism.css';


const CodeHighlighter = ({ code }) => {
    useEffect(() => {
        Prism.highlightAll(); // Trigger syntax highlighting after component mounts
    }, [code]);

    return <pre className="language-javascript"><code>{code}</code></pre>;
};

export default CodeHighlighter;
