import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Loading from '../Common/Loading';
import ProfileCard from './ProfileCard';

const Search = ({ userProfile }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(`https://jobhunt-six.vercel.app/api/search?query=${searchQuery}`);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        setLoading(false);
    };

    const handleFollow = async (profileId) => {
        try {
            await axios.post(`https://jobhunt-six.vercel.app/api/follow`, { followerId: userProfile._id, followingId: profileId });
            alert('Followed successfully!');
            setResults(results.map(result => {
                if (result._id === profileId) {
                    return { ...result, followers: [...result.followers, userProfile._id] };
                }
                return result;
            }));
        } catch (error) {
            console.error('Error following user:', error);
            alert('Error following user.');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for applicants, recruiters, companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
            <div className="search-results">
                {results.map((result) => (
                    <ProfileCard key={result._id} profile={result} onFollow={handleFollow} />
                ))}
            </div>
        </div>
    );
};

export default Search;
