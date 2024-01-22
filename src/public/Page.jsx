import React, { useState } from 'react';
import './Page.css';

function Page() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [error, setError] = useState('');
  
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
  
        if (userResponse.ok) {
          setUserData(userData);
          setError('');
        } else {
          setUserData(null);
          setRepositories([]);
          setError('Error fetching user data. Please check the username and try again.');
        }
  
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repoData = await repoResponse.json();
  
        if (repoResponse.ok) {
          setRepositories(repoData);
          setError('');
        } else {
          setRepositories([]);
          setError('Error fetching repositories. Please check the username and try again.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setUserData(null);
        setRepositories([]);
        setError('Error fetching data. Please check the username and try again.');
      }
    };
  
    return (
      <div className="app-container">
        <h1>GitHub Repositories Viewer</h1>
        <label htmlFor="username">Enter GitHub Username:</label>
        <div className="input-container">
          <input
            type="text"
            id="username"
            placeholder="e.g., johnpapa"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={fetchUserData}>Fetch Data</button>
        </div>
  
        {error && <p className="error-message">{error}</p>}
  
        {userData && (
          <div className="user-details">
  <div className="user-image-column">
    <div className="user-image">
      <img
        src={userData.avatar_url}
        alt="User Avatar"
        className="user-avatar"
      />
    </div>
  </div>
  <div className="user-info-column">
    <div className="user-info">
      <h2>{userData.name}</h2>
      <p>{userData.bio}</p>
      {userData.location && <p>
        <img className="icon-avatar" src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_location_on_48px-512.png" alt="Location"/>
      : {userData.location}</p>}
      {userData.twitter_username && (
        <p >
          <img className="icon-avatar" src="https://logowik.com/content/uploads/images/twitter-x5265.logowik.com.webp" alt="twitter"/>
          <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">{userData.twitter_username}</a>
        </p>
      )}
      {/* Add more user details as needed */}
    </div>
  </div>
</div>
        )}
  
        <ul className="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong>: <br />{repo.description || 'No description available'}
            <br />
            <br />
            {/* {repo.languages && (
              <span>Languages: {Object.keys(repo.languages).join(', ')}</span>
            )} */}
          </li>
        ))}
      </ul>
      </div>
    );
}

export default Page;
