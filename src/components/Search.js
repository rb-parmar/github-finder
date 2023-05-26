import { useState } from "react";
import { useNavigate } from "react-router-dom";
import githubUsernameRegex from 'github-username-regex';
import axios from 'axios';

function Search() {
  const navigateToUser = useNavigate();
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  let userEndPoint = `https://api.github.com/users/${input}`;
  let token = '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';
  let options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length < 2 || !githubUsernameRegex.test(input)) {
      setErrorMsg('Invalid input. Try again.');
      setInput("");
    } else {
      checkData();
    }
  }


  const checkData = async () => {
    try {
      const userResponse = await axios.get(userEndPoint, options);
      if (userResponse.data) {;
        navigateToUser(`/user/${input}`);
        setErrorMsg('');
        setInput('');
      }
    } catch {
      setErrorMsg('Username not found. Try again.');
      setInput('');
    }
  }

  const handleChange = (event) => {
    setInput(event.target.value.trim());
  }

  return (
    <section>
      <div className="container grid">
        <div className="search-field">
          <h1>GitHub Finder</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Enter username" 
              onChange={handleChange}
              value={input}
            />
            <button>Search</button>
          </form>
          <p>{errorMsg}</p>
        </div>
      </div>
    </section>
  )
}

export default Search;