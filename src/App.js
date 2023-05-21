import { Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import User from "./components/User";
import './style/index.css';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route exact path="/" element={<Search />} />
          <Route exact path="/user/:username" element={<User />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
