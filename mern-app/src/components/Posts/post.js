import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import './post.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Post = ({ logo, name, date, title, content, link, likes, comments, showDelete, postId, onDelete }) => {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    const [localLikes, setLocalLikes] = useState(likes);

    const handleDelete = async () => {
        onDelete(postId);
    };

    const handleLike = async () => {
        try {
            await axios.put(`https://jobhunt-six.vercel.app/api/posts/like/${postId}`);
            setLocalLikes(localLikes + 1);
            toast.success('Post liked');
        } catch (error) {
            console.error('Error liking post:', error);
            toast.error('Failed to like post');
        }
    };

    return (
        <div className='post-container'>
            <div className='profile'>
                <img className='pic' src={logo} alt='profile' />
                <div className='author'>
                    <h2 className='name'>{name}</h2>
                    <h4 className='date'>{formattedDate}</h4>
                </div>
            </div>
            <div className='title'>{title}</div>
            <div className='link'>
                <FontAwesomeIcon icon={faLink} /> {link}
            </div>
            <div className='description'>{content}</div>
            <div className='actions'>
                <span className='like' onClick={handleLike}>
                    <FontAwesomeIcon icon={faHeart} size='xl' /> {localLikes}
                </span>
                {(showDelete === 'true') && (
                    <span className='comment' onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} size='xl' />
                    </span>
                )}
            </div>
        </div>
    );
};

export default Post;
