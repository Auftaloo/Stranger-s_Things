import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Card } from '@mui/material';

const Profile = ({ user }) => {
    const messages = user.messages;
    const userID = user._id;

    return (
        <Card>
            <Card>
                <h1>Inbox:</h1>
                {
                    messages && messages.map(message => {
                        const fromUserID = message.fromUser._id;
                        const { username } = message.fromUser;
                        const { title } = message.post;

                        if (userID !== fromUserID) {
                            return (
                                <Card key={message._id}>
                                    <p>From User: {username}</p>
                                    <p>Message: {message.content}</p>
                                    <p>Post Reference: {title}</p>
                                </Card>
                            )
                        }
                    })
                }
            </Card>
            <Card>
                <h1>Sent:</h1>
                {
                    messages && messages.map(message => {
                        const fromUserID = message.fromUser._id;

                        if (userID === fromUserID) {
                            return (
                                <Card key={message._id}>{message.content}</Card>
                            )
                        }
                    })
                }
            </Card>
        </Card>
    )
}

export default Profile;