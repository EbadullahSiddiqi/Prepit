import "./index.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import AI from "./Components/AI";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AI />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
