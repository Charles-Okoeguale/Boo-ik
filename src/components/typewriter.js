import React, { useState, useEffect } from 'react';
import { Paper, Typography } from '@mui/material';

const TypewriterPaper = ({ result }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
        const typingSpeed = 50; 
        let index = 0;

        const typeNextCharacter = () => {
            if (index < result.length) {
                setDisplayedText((prev) => prev + result.charAt(index));
                index++;
                setTimeout(typeNextCharacter, typingSpeed);
            }
        };

        typeNextCharacter(); 
        return () => {
            setDisplayedText('');
        };
    }, [result]);

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                padding: '16px', 
                height: '100%', 
                width: '90%',
                overflowY: 'auto', 
                marginBottom: '16px', 
                flexGrow: 1 ,
                boxShadow: 'none',
            }}
        >
            <Typography variant="body1">
                {displayedText}
            </Typography>
        </Paper>
    );
};

export default TypewriterPaper;
