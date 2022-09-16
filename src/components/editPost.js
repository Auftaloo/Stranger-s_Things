import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updatePost, deletePost } from '../api';
import { Button } from '@mui/material';

const EditPost = ({ posts, token, navigate, fetchPosts }) => {
    const { postID } = useParams();

    const [currentPost] = posts.filter(post => post._id === postID);

    const { title, description, location, price, willDeliver } = currentPost;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDesc] = useState(description);
    const [newLocation, setNewLocation] = useState(location);
    const [newPrice, setNewPrice] = useState(price);
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

    async function editPost() {
        const updatedPost = {
            token: token,
            title: newTitle,
            description: newDescription,
            location: newLocation,
            price: newPrice,
            willDeliver: newWillDeliver,
            _id: postID
        }
        await updatePost(updatedPost)
        navigate('/posts')
        fetchPosts()
    }

    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            editPost();
        }}>
            <input
                type='text'
                placeholder={title}
                onChange={(ev) => setNewTitle(ev.target.value)}
            />
            <input
                type='text'
                placeholder={description}
                onChange={(ev) => setNewDesc(ev.target.value)}
            />
            <input
                type='text'
                placeholder={location}
                onChange={(ev) => setNewLocation(ev.target.value)}
            />
            <input
                type='text'
                placeholder={price}
                onChange={(ev) => setNewPrice(ev.target.value)}
            />
            <input
                type='checkbox'
                checked={newWillDeliver}
                onChange={(ev) => setNewWillDeliver(ev.target.checked)}
            />
            <Button
                style={{
                    height: '3rem',
                    margin: '1rem'
                }}
                variant='contained'
                type='submit'
                onClick={() => {
                    editPost();
                }}>Edit Post</Button>
            <Button
                style={{
                    height: '3rem',
                    margin: '1rem'
                }}
                variant='outlined'
                type='submit'
                onClick={() => {
                    deletePost(token, postID);
                }}>Delete Post</Button>
        </form>
    )
}

export default EditPost;