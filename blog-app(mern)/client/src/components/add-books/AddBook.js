import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function AddBook() {
  const [img, setImg] = useState();
  const [msg, setMsg] = useState();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const handleOnChange = (file) => {

    const data = new FormData();
    data.append('book_pic', file);
    data.append('title', title);
    data.append('description', description);
    data.append('author', author);

     fetch("http://localhost:5000/api/", {
      method: "POST",
      credentials: "include",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body:  data ,
    })
      .then((res) => res.json())
      .then((result) => {
        setMsg(result);
        alert('book added successfully');
        navigate("/");
      });

  };

  const onSubmit = (data) => {
    console.log(data);
    // const formData = new FormData();
    // formData.append('myfile', data.file[0])
    // formData.append('fileData', data)
    // console.log(formData.get('myfile'));
    // convertToBase64(data.file[0]);

    // fetch("http://localhost:5000/api/", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     // "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //   },
    //   body:  data ,
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     setMsg(result);
    //     alert(result.msg);
    //     navigate("/");
    //   });
  };

  return (
    <div>
      <Link to="/">Back to book list👉</Link>
      <form
        onSubmit={handleSubmit}
        
        className="flex flex-col w-1/2 mx-auto m-4  p-5"
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="author"
          placeholder="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          name="file"
          onChange={(e) => handleOnChange(e.target.files[0])}
        />

        <input
          type="submit"
          className="w-full  bg-gray-500 cursor-pointer p-3 rounded"
        />
      </form>
    </div>
  );
}
