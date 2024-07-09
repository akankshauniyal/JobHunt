import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdCard from './AdCard';
import './adCard.css';

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/ads');
                setAds(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ads:', error);
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (ads.length === 0) {
        return <div>No ads available.</div>;
    }

    return (
        <div className='ads-container'>
            {ads.map((ad) => (
                <AdCard key={ad._id} ad={ad} />
            ))}
        </div>
    );
};

export default Ads;
