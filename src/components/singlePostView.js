import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createMessage, deletePost } from '../api';

const SendMessage = ({ postID, token, navigate }) => {
    const [message, setMessage] = useState({ content: '' });
    //we need 3 things to make this request
    //Post-id, token, message object containing the content of the message
    async function addMessage() {
        await createMessage({ postID, message, token });
    }
    return (
        <form
            id='messageForm'
            className='messageForm'
            onSubmit={(event) => {
                event.preventDefault();
                addMessage();
                navigate('/post')
            }}>
            <input
                className='messageInput'
                type='text'
                placeholder='Enter Message'
                onChange={(event) => setMessage({ content: event.target.value })}
            />
            <button type='submit'
                className='messageSubmit'
                onClick={() => {
                    addMessage();
                    navigate('/posts')
                }}>Send Message</button>
        </form>
    )
}

const SinglePostView = ({ posts, token, getMe, navigate }) => {
    const [activateMessage, setActivateMessage] = useState(false);

    const { postID } = useParams();

    if (posts.length) {
        const [currentPost] = posts.filter(post => post._id === postID);
        const { title, description, location, price, willDeliver, isAuthor } = currentPost;

        return (
            <div>
                <div>
                    <h3>{title}</h3>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                    <p>Will Deliver: {willDeliver}</p>
                </div>
                {
                    isAuthor ? (
                        <>
                            <Link to='/posts'>
                                <button>
                                    Back
                                </button>
                            </Link>
                            <Link to='/posts'>
                                <button
                                    onClick={() => deletePost(token, postID)}>
                                    Delete
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to='/posts'>
                                <button>
                                    Back
                                </button>
                            </Link>
                            {token &&
                                <>
                                    <button
                                        onClick={() => setActivateMessage(!activateMessage)}>
                                        Message User
                                    </button>
                                    {
                                        activateMessage &&
                                        <SendMessage token={token}
                                            postID={postID}
                                            navigate={navigate}
                                            getMe={getMe} />
                                    }
                                </>
                            }
                        </>
                    )
                }
            </div>
        )
    } else {
        return (
            <h2>Waiting for Posts...</h2>
        )
    }
}

export default SinglePostView;