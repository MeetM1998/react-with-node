import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_REACT_APP_API;

const UserList = () => {
  const [userList, setUserList] = useState();

  const getUser = () => {
    axios
      .get(`${baseURL}/getAllUser`)
      .then((result) => setUserList(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        getUser();
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async (e) => {
    let key = e.target.value;

    if (key) {
      axios
        .get(`${baseURL}/search/${key}`)
        .then((res) => {
          setUserList(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      getUser();
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 justify-center items-center">
      <div className="w-1/2 bg-white rounded-xl p-3 px-10">
        <div className="flex justify-between text-end my-3">
          <div className="">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              name="search"
              placeholder="Search User"
              onChange={handleSearch}
            />
          </div>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
            to={"/create"}
          >
            Create User
          </Link>
        </div>
        <table className="table-auto min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm front-semibold text-black uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm front-semibold text-black uppercase"
              >
                Email
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm front-semibold text-black uppercase"
              >
                Age
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-sm front-semibold text-black text-center uppercase"
              >
                Action
              </th>
            </tr>
          </thead>
          {userList?.length > 0 ? (
            <tbody>
              {userList?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium border-b border-gray-200">
                      {item.user}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium border-b border-gray-200">
                      {item.email}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium border-b border-gray-200">
                      {item.age}
                    </td>
                    <td className="flex justify-evenly py-4 pl-4 pr-3 border-b border-gray-200">
                      <Link
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        to={`/update/${item?._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <h2>No User Found!!</h2>
          )}
        </table>
      </div>
    </div>
  );
};

export default UserList;
