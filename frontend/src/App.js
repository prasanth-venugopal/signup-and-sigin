import { Route, Routes } from "react-router-dom";
import Login from "./components/signin";
import Signup from "./components/signup";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
