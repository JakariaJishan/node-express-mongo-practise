import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AddBook() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");


  const onSubmit = (data) => {
    fetch("http://localhost:5000/api/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token")

      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setMsg(result);
        alert(result.msg);
        navigate("/");
      });
  };

  return (
    <div>
      <Link to="/">Back to book list👉</Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/2 mx-auto m-4  p-5"
      >
        <input
          {...register("title", { required: true, maxLength: 20 })}
          placeholder="Title"
          className="w-full  bg-gray-300 p-3 rounded "
        />
        <p className="text-red-600 mb-3">
          {errors.title?.type === "required" && "First name is required"}
        </p>
        <input
          {...register("isbn", { required: true, maxLength: 20 })}
          placeholder="ISBN"
          className="w-full  bg-gray-300 p-3 rounded"
        />
        <p className="text-red-600 mb-3">
          {errors.isbn?.type === "required" && "First name is required"}
        </p>
        <input
          {...register("author", { required: true, maxLength: 20 })}
          placeholder="Author"
          className="w-full  bg-gray-300 p-3 rounded"
        />
        <p className="text-red-600 mb-3">
          {errors.author?.type === "required" && "First name is required"}
        </p>
        <input
          {...register("description", { required: true, maxLength: 20 })}
          placeholder="Description"
          className="w-full  bg-gray-300 p-3 rounded"
        />
        <p className="text-red-600 mb-3">
          {errors.description?.type === "required" && "First name is required"}
        </p>
        <input
          {...register("publisher", { required: true, maxLength: 20 })}
          placeholder="Publisher"
          className="w-full  bg-gray-300 p-3 rounded"
        />
        <p className="text-red-600 mb-3">
          {errors.publisher?.type === "required" && "First name is required"}
        </p>
        <input
          type="submit"
          className="w-full  bg-gray-500 cursor-pointer p-3 rounded"
        />
      </form>
    </div>
  );
}
