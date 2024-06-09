import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import AboutTodo from './components/AboutTodo';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:title" element={<AboutTodo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
