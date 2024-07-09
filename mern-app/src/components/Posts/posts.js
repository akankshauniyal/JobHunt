import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';
import './post.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import Loading from '../Common/Loading';
import { toast } from 'react-toastify';

const Posts = ({ profile }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const fetchProfileAndPosts = async () => {
            try {
                const postsResponse = await axios.get('https://jobhunt-six.vercel.app/api/posts');
                const filteredPosts = postsResponse.data.filter(post => post.author.profilePicture === profile.logo);
                setPosts(filteredPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile and posts:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchProfileAndPosts();
        }
    }, [user]);

    if (loading) {
        return <Loading />;
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`https://jobhunt-six.vercel.app/api/posts/${postId}`);
            toast.success('Post deleted');
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
            toast.error('Failed to delete post');
        }
    };

    return (
        <div className='posts-container'>
            {posts.map((post) => (
                <Post
                    key={post._id}
                    logo={post.author.profilePicture}
                    name={post.author.name}
                    date={post.date}
                    title={post.title}
                    content={post.description}
                    link={post.link}
                    likes={post.likes}
                    comments={post.comments}
                    showDelete='true' 
                    postId={post._id}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default Posts;
