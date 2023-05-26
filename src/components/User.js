import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';


function User() {

  // user data
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userName, setUserName] = useState('');
  const [userRepoCount, setUserRepoCount] = useState('');
  const [userFollowersCount, setUserFollowersCount] = useState('');
  const [userFollowingCount, setUserFolloweringCount] = useState('');
  const [userGitHubLink, setUserGitHubLink] = useState('');

  // repo data
  const [userRepos, setUserRepos] = useState([]);

  // username
  const { username } = useParams();

  let userEndPoint = `https://api.github.com/users/${username}`;
  let reposEndPoint = `https://api.github.com/users/${username}/repos`;
  let token = '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';
  let options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(userEndPoint, options);
        const userReposResponse = await axios.get(reposEndPoint, options);
        
        setUserProfilePic(userResponse.data.avatar_url); 
        setUserName(userResponse.data.name);
        setUserRepoCount(userResponse.data.public_repos);
        setUserFollowersCount(userResponse.data.followers);
        setUserFolloweringCount(userResponse.data.following);
        setUserGitHubLink(userResponse.data.html_url);
        setUserRepos(userReposResponse.data)
      } catch (error) {
        console.log(error);
      }
    }

    if (username) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const dateFormat = {
    month: "short",
    day: "numeric",
    year: "numeric"
  };

  return (
    <main>
      <div className="container">
        <div className="user">
          <img src={userProfilePic} alt="UserPicture"></img>
          <h2>{userName}</h2>
          <div className="details">
            <div className="data">
              <div className="repo-count">{userRepoCount}</div>
              <p>REPOSITORIES</p>
            </div>
            <div className="data">
              <div className="followers-count">{userFollowersCount}</div>
              <p>FOLLOWERS</p>
            </div>
            <div className="data">
              <div className="following-count">{userFollowingCount}</div>
              <p>FOLLOWING</p>
            </div>
          </div>
          <div className="link"><a href={userGitHubLink}>GO TO GITHUB</a></div>
        </div>

        <h2>Public Repositories</h2>
        <section className="display">
          {userRepos.map(repo => (
            <div className="repo" key={repo.id}>
              <div>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
              </div>
              <p>Updated at {new Date(repo.updated_at).toLocaleDateString('en-CA', dateFormat)}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

export default User;