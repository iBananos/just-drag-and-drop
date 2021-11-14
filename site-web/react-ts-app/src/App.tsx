import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Analyze from './pages/Analyze';
import History from './pages/History';
import Upload from './pages/Upload';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>      
        <Route path="/analyze" element={<Analyze />}></Route>
        <Route path="/history" element={<History />} ></Route>
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
