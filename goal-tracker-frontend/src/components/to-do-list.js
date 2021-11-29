import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useNavigate  } from "react-router-dom";

const ToDoList = () => {
    const [cookies, removeCookie] = useCookies();

    const [toDoLists, setToDoLists] = useState();
    const  navigate  = useNavigate ();

    useEffect(() => {
        getToDoTaskList();

    }, []); // 

    function getToDoTaskList() {
        axios.get(`http://localhost:3002/user/getToDoList/${cookies.user_id}`)
            .then(res => {
                if (res.data.statusCode == 200) {

                    setToDoLists(res.data.data)
                }
                else
                    alert(res.data.msg)
            });
    }
    function deleteToDo(task_id) {

        axios.get('http://localhost:3002/user/deleteToDoDetails/' + task_id)
            .then(response => {

                if (response.data.statusCode == 200) {
                    getToDoTaskList();

                }
                else
                    alert(response.data.msg)

            })
            .catch(function (error) {
            })

    }

    function logout()
    {
        removeCookie("user_id", {
            path: "/"
          });
        navigate('/');
    }

    function ShowToDoList(props) {

        return <tr>
            <td>{props.todolist.task_id}</td>
            <td>{props.todolist.task_title}</td>
            <td>{props.todolist.task_description}</td>
            <td>{props.todolist.create_at}</td>
            <td>
                <Link to={"/update-to-do/" + props.todolist.task_id}>Edit</Link>
            </td>

            <td>
                <button onClick={() => { deleteToDo(props.todolist.task_id) }} >Delete</button>
            </td>

        </tr>

    }

    function ToDoList() {
        if (toDoLists) {
            return toDoLists.map(function (todolist, i) {
                return <ShowToDoList key={todolist.task_id} todolist={todolist} />;
            })
        }
    }

    return (
        <div>
            <h3 className="create-to-do"> <Link to="/create-to-do" >Create to do task</Link> </h3>
            <a className="logout-btn" onClick={() => { logout() }}> Logout </a>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Task id</th>
                        <th>Task title</th>
                        <th>Task description</th>
                        <th>Created Date</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </thead>
                <tbody>
                    {ToDoList()}
                </tbody>
            </table>
        </div>
    );

}

export default ToDoList;