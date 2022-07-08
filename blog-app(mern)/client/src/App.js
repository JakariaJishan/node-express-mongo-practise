import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddBook from "./components/add-books/AddBook";
import ShowBook from "./components/Books/ShowBook";
import Home from "./components/home/Home";
import PrivateOutlet from "./components/private-route/PrivateOutlet";
import LogIn from "./components/register/Login";
import Register from "./components/register/Register";
import UpdateBook from "./components/update-book/UpdateBook";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/login" element={<LogIn />} />
          <Route path="" element={<PrivateOutlet />}>
            <Route path="/show-book/:id" element={<ShowBook />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/update-book/:id" element={<UpdateBook />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
