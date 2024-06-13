import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UserList = lazy(() => import("../UsersList"));
const CreateUser = lazy(() => import("../CreateUsers"));

const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserList />} />
      <Route exact path="/create" element={<CreateUser />} />
      <Route exact path="/update/:id" element={<CreateUser />} />
    </Routes>
  );
};

export default Router;
