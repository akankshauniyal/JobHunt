import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hero.css';
import heroDarkImg from '../images/hero-img.png';

const Hero = ({ theme }) => {
	const navigate = useNavigate();

	const handleGetStartedClick = () => {
		navigate('/UserCards');
	};

	const handleDiscoverMoreClick = () => {
		navigate('/about');
	};

	return (
		<section className='hero_section'>
			<div className="hero_wrapper">
				<div className="hero_content">
					<div className='highlight'>
						<h1>Find Your Dream Job</h1>
						<h1>Connect with Top Recruiters</h1>
						<h1>And Leading Companies</h1>
					</div>
					<p className="description">
						Join our platform to explore opportunities, whether you're an applicant, recruiter, or a company looking for talent.
						Log in to access tailored services and resources that meet your specific needs.
					</p>
					<div className="hero_btns">
						<button className="primary_btn" onClick={handleGetStartedClick}>Get Started Now!</button>
						<button className="secondary_btn" onClick={handleDiscoverMoreClick}>Discover More</button>
					</div>
				</div>
				<div className="hero_img">
					<img src={heroDarkImg} alt="hero-image" />
				</div>
			</div>
		</section>
	);
};

export default Hero;
