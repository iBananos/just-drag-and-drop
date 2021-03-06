import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import Analyze from './pages/Analyze';
import History from './pages/History';
import Upload from './pages/Upload';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mydatabase from './pages/Mydatabase';
import AnalyzeView from "./pages/AnalyseView";
import DataVisu from "./pages/DataVisu";
import NotFound from './pages/NotFound';
import Verification from './pages/Verification';
import Demo from "./pages/Demo"
function App() {
  document.title= "Scanylab"
  return (
    
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>      
          <Route path="/analyze" element={<Analyze />}></Route>
          <Route path="/analyzeView" element={<AnalyzeView />}></Route>
          <Route path="/dataVisu" element={<DataVisu />}></Route>
          <Route path="/mydatabase" element={<Mydatabase />} ></Route>
          <Route path="/history" element={<History />} ></Route>
          <Route path="/upload" element={<Upload />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/verification" element={<Verification />}></Route>
          <Route path="/demo" element={<Demo />}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
