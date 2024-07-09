import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import './header.css';

const nav_links = [
	{ path: "/", display: "Home" },
	{ path: "/about", display: "About Us" },
	{ path: "/contact", display: "Contact Us" },
];

const ToggleContainer = styled.button`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7rem;
  height: 3.5rem;
  margin: 0 auto;
  border-radius: 30px;
  font-size: 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  background: none;

  .switch {
    position: absolute;
    height: 2.4rem;
    width: 2.4rem;
    border-radius: 50%;
    transform: ${({ theme }) => (theme === "light-theme" ? "translateX(0)" : "translateX(3.2rem)")};
    transition: transform 0.3s, background-color 0.1s ease;
    background: ${({ theme }) => theme.button};
    box-shadow: ${({ theme }) => theme.lightShadow}, ${({ theme }) => theme.darkShadow};
  }

  .sun,
  .moon {
    position: relative;
    border-radius: 50%;
    height: 2.4rem;
    width: 2.4rem;
    padding: 7px;
    z-index: 9;
  }

  .sun path {
    fill: ${({ theme }) => theme.primaryText};
    opacity: ${({ theme }) => (theme === "light-theme" ? "1" : "0.6")};
  }

  .moon path {
    fill: ${({ theme }) => theme.primaryText};
    opacity: ${({ theme }) => (theme === "light-theme" ? "0.6" : "1")};
  }
`;

const Header = ({ toggleTheme, theme }) => {
	return (
		<header className="headerMain">
			<div className="header__logo">
				<img className="logo" src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg" alt="" />
				<h1>JobHunt</h1>
			</div>
			<nav className="header__menu">
				<ul>
					{nav_links.map((item, index) => (
						<li key={index}>
							<Link to={item.path}>{item.display}</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="theme-toggle">
				<ToggleContainer theme={theme} onClick={toggleTheme}>
					<div className="switch"></div>
					<svg className="sun" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="currentColor"
						/>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.09441L21.1923 4.22186L19.7781 2.80764L16.9056 5.68018C17.4338 6.0908 17.9092 6.56618 18.3198 7.09441Z"
							fill="currentColor"
						/>
					</svg>
					<svg className="moon" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M17.472 16.416C16.7199 16.5944 15.946 16.6875 15.1667 16.6875C11.3333 16.6875 8.33337 13.6875 8.33337 9.85413C8.33337 7.41119 9.52249 5.20621 11.4335 3.9381C11.1124 3.89734 10.7883 3.875 10.4611 3.875C6.62775 3.875 3.62775 6.875 3.62775 10.7083C3.62775 14.5416 6.62775 17.5416 10.4611 17.5416C13.2396 17.5416 15.6273 15.8282 16.7011 13.4161C17.0453 14.3004 17.6936 15.0364 18.5538 15.4953C18.3503 15.8491 18.0614 16.162 17.7075 16.4003C17.6291 16.4532 17.5508 16.4835 17.472 16.416Z"
							fill="currentColor"
						/>
					</svg>
				</ToggleContainer>
			</div>
		</header>
	);
};

export default Header;