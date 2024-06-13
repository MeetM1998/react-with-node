import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_REACT_APP_API;

const CreateUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = useState({
    user: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let curData = { ...data };
    curData[name] = value;
    setData(curData);
  };

  const getUserById = () => {
    axios
      .get(`${baseURL}/getUserById/${id}`)
      .then((item) =>
        setData({
          user: item.data.user,
          email: item.data.email,
          age: item.data.age,
        })
      )
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      axios
        .put(`${baseURL}/updateUser/${id}`, {
          user: data.user,
          email: data.email,
          age: data.age,
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.log("error", error));
    } else {
      axios
        .post(`${baseURL}/createUser`, {
          user: data.user,
          email: data.email,
          age: data.age,
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 justify-center items-center">
      <div className="w-1/2 bg-white rounded-xl p-3 px-10">
        <form>
          <h2 className="text-lg  font-semibold text-center">
            {id ? "Update User" : "Add User"}
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user"
            >
              UserName
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user"
              type="text"
              name="user"
              placeholder="Enter Username"
              value={data.user || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={data.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              placeholder="Enter Age"
              value={data.age || ""}
              onChange={handleChange}
            />
          </div>
          <div className="text-center flex justify-between">
            <Link
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              to={"/"}
            >
              Back
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
