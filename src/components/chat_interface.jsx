import React, { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, IconButton, Switch, FormControlLabel, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useStyles } from './styles/chat_interface_styles';
import { getAuth } from "firebase/auth"
import axios from 'axios';
import TypewriterPaper from './typewriter';

const ChatInterface = () => {
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [contextual, setContextual] = useState(false); 
    const [result, setResult] = useState('')
    const classes = useStyles();

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleSubmit = async () => {
        const user = getAuth().currentUser;
    
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
    
        if (reply.trim() === "") {
            console.warn('Reply cannot be empty');
            return;
        }
    
        try {
            setIsLoading(true)
            const idToken = await user.getIdToken();
            const response = await axios.post('http://localhost:5000/api/process-query', {
                prompt: reply,
                idToken: idToken,
                type: contextual,
            });
            setReply("")
            setIsLoading(false)
            setResult(response.data.response);
        } catch (error) {
            handleError(error);
            setIsLoading(false)
        }
    };
    
    const handleError = (error) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        } else {
            console.error('Unexpected error:', error);
        }
    };
    

    return (
        <Box className={classes.container1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px', flexDirection: 'inherit' }}>
                <Typography variant="body2" fontSize={12} sx={{ marginRight: '8px' }}>
                    {contextual ? 'Contextual Response' : 'Non-Contextual Response'}
                </Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={contextual}
                            onChange={() => setContextual(!contextual)}
                            color="primary"
                        />
                    }
                />
            </Box>
            <TypewriterPaper result={result} />
            <TextField
                variant="outlined"
                placeholder="Ask anything"
                value={reply}
                onChange={handleReplyChange}
                sx={{ width: '97%', background: 'lightgrey', border: '1px solid white' }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                onClick={handleSubmit}
                                disabled={isLoading} 
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" /> 
                                ) : (
                                    <SendIcon /> 
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box> 
    );
};

export default ChatInterface;
