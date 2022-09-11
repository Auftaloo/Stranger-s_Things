import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import './style.css';
import {
    Navbar,
    Posts,
    Profile,
    Home,
    Register
} from './components';
import {
    getPosts
} from './api';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    async function fetchPosts() {
        const results = await getPosts()
        setPosts(results.data.posts);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
    <div>
        <Navbar setToken={ setToken }/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<Posts posts={posts}/>} />
            <Route path='/profile' element={<Profile />} />
            <Route 
             path='/register' 
             element={<Register 
             setToken={ setToken } 
             navigate={navigate} />}
             />
        </Routes>
    </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);

/*
Login
Registration
Posts
Profile
Nav Bar
Add Post
Search
*/