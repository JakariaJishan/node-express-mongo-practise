import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShowBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookList, setBookList] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/api/" + id, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => setBookList(data));
  }, []);

  const handleDelete = () => {
    fetch("http://localhost:5000/api/" + id, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then((res) => res.json())
      .then((data) => {
        alert("deleted successfully");
        navigate("/");
      });
  };
  return (
    <div>
      <h1 className="text-6xl text-center">Book's record</h1>
      <h1 className="text-2xl text-center mb-5">view book info</h1>
      <p className="  text-center font-bold">
        <Link to="/">show book list👉</Link>
      </p>

      <div className="flex justify-center items-center">
        <table className="table-auto ">
          <tbody>
            <tr className="even:bg-amber-100 odd:bg-blue-100">
              <td class="p-5">1</td>
              <td class="p-5">title</td>
              <td class="p-5">{bookList.title}</td>
            </tr>
            <tr className="even:bg-amber-100 odd:bg-blue-100">
              <td class="p-5">2</td>
              <td class="p-5">author</td>
              <td class="p-5">{bookList.author}</td>
            </tr>
            <tr className="even:bg-amber-100 odd:bg-blue-100">
              <td class="p-5">3</td>
              <td class="p-5">description</td>
              <td class="p-5">{bookList.description}</td>
            </tr>
            <tr className="even:bg-amber-100 odd:bg-blue-100">
              <td class="p-5">4</td>
              <td class="p-5">publisher</td>
              <td class="p-5">
                {bookList.publisher ? bookList.publisher : "no one"}
              </td>
            </tr>
            <tr className="even:bg-amber-100 odd:bg-blue-100">
              <td class="p-5">5</td>
              <td class="p-5">published date</td>
              <td class="p-5">{bookList.published_date}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center my-5">
        <button onClick={handleDelete} className="bg-orange-400 p-3 ml-3">
          Delete book
        </button>
        <button className="bg-orange-400 p-3 ml-3">
          <Link to={`/update-book/${id}`}>Update book</Link>
        </button>
      </div>
    </div>
  );
};

export default ShowBook;
