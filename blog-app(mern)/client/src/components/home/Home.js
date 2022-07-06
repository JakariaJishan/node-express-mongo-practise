import { useEffect, useState } from "react";
import BookList from "../Books/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5">
      {books.map((book) => (
        <BookList key={book.id} book={book} />
      ))}
    </div>
  );
};

export default Home;
