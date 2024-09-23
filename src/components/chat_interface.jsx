import React, { useState } from 'react';
import { Box, TextField, Typography, Paper, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; 
import { useStyles } from './styles/chat_interface_styles';

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');
    const classes = useStyles()

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleSendReply = () => {
        if (reply) {
            setMessages([...messages, reply]);
            setReply('');
        }
    };

    return (
        <Box className={classes.container1}>
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
                {messages.map((msg, index) => (
                    <Typography key={index} variant="body1" sx={{ marginBottom: '8px' }}>
                        {msg}
                    </Typography>
                ))}
            </Paper>
            <TextField
                variant="outlined"
                placeholder='Ask followup'
                value={reply}
                onChange={handleReplyChange}
                sx={{width: '97%', background: 'lightgrey', border: '1px solid white'}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                onClick={handleSendReply}
                            >
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box> 
    );
};

export default ChatInterface;