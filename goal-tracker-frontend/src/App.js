import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
  
} from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/sign-up";
import CreateToDo from "./components/create-to-do";
import ToDoList from "./components/to-do-list";
import UpdateToDo from "./components/update-to-do";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/create-to-do" element={<CreateToDo />} />
      <Route path="/update-to-do/:id" element={<UpdateToDo />} />
      <Route path="/to-do-list" element={<ToDoList />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
