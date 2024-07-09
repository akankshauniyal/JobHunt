import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';
import './CompanyHome.css';

const nav_links = [
  { path: '/', display: 'Home' },
  { path: '/explore', display: 'Explore' },
  { path: '/notifications', display: 'Notifications' },
  { path: '/messages', display: 'Messages' },
  { path: '/discuss', display: 'Discuss' },
];

const Header = ({ toggleTheme, theme }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const showTooltip = () => setTooltipVisible(true);
  const hideTooltip = () => setTooltipVisible(false);

  return (
    <header className="header">
      <div className="logo">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/767/731/original/jh-logo-letter-initial-logo-designs-template-free-vector.jpg"
          alt="logo"
        />
      </div>
      <div className="nav_wrapper">
        <ul className="menu">
          {nav_links.map((item, index) => (
            <li className="menu__item" key={index}>
              <Link to={item.path} className="menu__link">
                {item.display}
              </Link>
            </li>
          ))}
          <li className="menu__item">
            <Link to="/add-post" className="menu__link">
              <FontAwesomeIcon
                icon={faPlus}
                className="plus-icon"
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
              />
              {tooltipVisible && <span className="tooltip">New Post</span>}
            </Link>
          </li>
        </ul>
      </div>
      <div className="profile-icon" onClick={toggleDropdown}>
        <img src="https://via.placeholder.com/45" alt="profile" />
        <ul className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
          <li>Profile</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </header>
  );
};

const Hero = ({ theme }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    { id: 1, content: "First post", likes: 0, comments: [] },
    { id: 2, content: "Second post", likes: 0, comments: [] },
  ]);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    setPosts([...posts, { id: posts.length + 1, content: newPost, likes: 0, comments: [] }]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
  };

  return (
    <div className={`main-content ${theme === 'light-theme' ? 'light-theme' : ''}`}>
      <div className="center-section">
        <h2>User Posts</h2>
        <div className="add-post">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write your post..."
          />
          <button className="add" onClick={handleAddPost}>Add Post</button>
        </div>
        {posts.map(post => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <button onClick={() => handleLike(post.id)}>
              <FontAwesomeIcon icon={faThumbsUp} /> Like ({post.likes})
            </button>
            <div className="comments">
              {post.comments.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
              <textarea
                placeholder="Write a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleComment(post.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <FontAwesomeIcon icon={faComment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CH = ({ toggleTheme, theme }) => {
  return (
    <div>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Hero theme={theme} />
    </div>
  );
};

export default CH;
