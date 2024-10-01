import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/auth/login";
import Home from "./components/home";
import Registration from "./components/auth/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/registration" element={<Registration />} />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
