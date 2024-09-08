import React, { useState } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, IconButton, Box, Paper, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatIcon from '@mui/icons-material/Chat';

function ChatBot() {
    const [question, setQuestion] = useState("");
    const [conversation, setConversation] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    async function generateAnswer() {
        const userMessage = { type: 'user', text: question };
        setConversation([...conversation, userMessage, { type: 'bot', text: "Loading..." }]);

        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAnLJr5RJNeByyztdjHuzCNyO6G5HSBukM",
                method: "post",
                data: {
                    contents: [
                        { "parts": [{ "text": question }] }
                    ]
                }
            });

            // Formatting the response text
            const formattedAnswer = response.data.candidates[0].content.parts[0].text
                .replace(/## /g, '') // Remove markdown headers
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Convert **bold** to HTML <b> tags
                .replace(/\* (.*?)\*/g, '<i>$1</i>') // Convert *italic* to HTML <i> tags
                .replace(/^- /gm, '<li>') // Convert list items to HTML <li> tags
                .replace(/\n/g, '<br />'); // Convert new lines to HTML <br /> tags

            // Update conversation with the bot's response
            setConversation(conversation => [
                ...conversation.slice(0, -1), // Replace the last 'Loading...' message
                { type: 'bot', text: formattedAnswer }
            ]);
        }
        catch (error) {
            setConversation(conversation => [
                ...conversation.slice(0, -1), // Replace the last 'Loading...' message
                { type: 'bot', text: "Error generating answer" }
            ]);
        }
        setQuestion("");
    }

    return (
        <>
            {isOpen ? (
                <Paper elevation={3} sx={{ width: 400, position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
                    <Card>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h5">Chatbot</Typography>
                                <IconButton onClick={() => setIsOpen(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    height: 200,
                                    overflowY: 'auto',
                                    backgroundColor: "#f4f6f8",
                                    padding: 2,
                                    marginTop: 2,
                                    borderRadius: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {conversation.map((msg, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                            backgroundColor: msg.type === 'user' ? '#d1c4e9' : '#e0f7fa',
                                            borderRadius: 2,
                                            padding: 1,
                                            maxWidth: '90%',
                                            marginBottom: 1,
                                            whiteSpace: 'pre-wrap',
                                        }}
                                        dangerouslySetInnerHTML={{ __html: msg.text }} // Render HTML content
                                    />
                                ))}
                            </Box>
                            <TextField
                                label="Ask a question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                fullWidth
                                sx={{ marginTop: 2 }}
                            />
                            <Button variant="contained" color="primary" onClick={generateAnswer} sx={{ marginTop: 2 }}>
                                Get Answer
                            </Button>
                        </CardContent>
                    </Card>
                </Paper>
            ) : (
                <Fab
                    color="primary"
                    aria-label="chat"
                    onClick={() => setIsOpen(true)}
                    sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
                >
                    <ChatIcon />
                </Fab>
            )}
        </>
    );
}

export default ChatBot;
