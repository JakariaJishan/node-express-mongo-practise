import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const handleSubmit = () => {
    const localData = {
      name: "joe",
      email:'joe@gmail.com',
      age: 23,
      location: "janina",
    };
    fetch("http://localhost:5000/addLocalData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const [dataSet, setDataSet] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then((res) => res.json())
      .then((result) => {
        setDataSet(result);
      });
  }, []);

  return (
    <div className="App">
      <button onClick={handleSubmit}>submit</button>
      <hr/>
      {
        dataSet.map(elem =><p>{elem.name}</p> )
      }
    </div>
  );
}

export default App;
