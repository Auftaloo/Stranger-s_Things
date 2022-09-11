import React from 'react';

const Posts = ({ posts }) => {
    return (
        <div id='outer div element'>
        {
            posts.map((post) => {
                const {description, location, price, title, _id} = post;
                return (
                <div key={_id}>
                    <h3>{title}</h3>
                    <p>Description: {description}</p>
                    <p>Price: {price}</p>
                    <p>Location: {location}</p>
                </div>
                )
            })
        }
        </div>
    )
}

export default Posts;