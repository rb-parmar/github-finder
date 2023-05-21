import { useState } from "react";
import { useNavigate } from "react-router-dom";
import githubUsernameRegex from 'github-username-regex';

function Search() {
  const navigateToUser = useNavigate();
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 1 && githubUsernameRegex.test(input)) {
      navigateToUser(`/user/${input}`);
    } else {
      setErrorMsg('Username not found. Try again.');
      setInput("");
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