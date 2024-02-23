import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Recident from "./components/Recident";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recidents/:name" element={<Recident />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
