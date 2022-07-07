import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookList from "../Books/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div>
      <Link
        to="/add-book"
        className=" m-4 float-right border-2 border-red-400 p-3"
      >
        Add Book➕
      </Link>
      <div className="grid grid-cols-3 gap-5">
        {books.map((book) => (
          <BookList key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Home;
