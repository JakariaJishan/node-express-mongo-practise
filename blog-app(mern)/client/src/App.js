import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShowBook from "./components/Books/ShowBook";
import Home from "./components/home/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show-book/:id" element={<ShowBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
