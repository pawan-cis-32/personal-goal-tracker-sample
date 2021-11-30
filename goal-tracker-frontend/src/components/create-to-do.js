import { React, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateToDo = () => {
  const [cookies] = useCookies();

  const [inputs, setInputs] = useState({ 'user_id': cookies.user_id, 'task_file': null });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const navigate = useNavigate();

  // yuo can find all params from here
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))

    setErrors(values => ({ ...values, [name]: '' }))

  }

  const toDoSubmit = (event) => {
    event.preventDefault();

    if (!inputs.task_title) {
      setErrors(values => ({ ...values, 'task_title': 'Task title is required' }))

    }
    else if (!inputs.task_description) {
      setErrors(values => ({ ...values, 'task_description': 'Task description is required' }))
    }
    else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      if (fileName !== '' && fileName !== undefined && fileName != null) {
        axios.post('http://localhost:3002/utility/uploadImageToDo', formData)
          .then(imgData => {
            let toDoTaskData = {
              task_file: imgData.data.filename,
              user_id: inputs.user_id,
              task_title: inputs.task_title,
              task_description: inputs.task_description
            }
            axios.post('http://localhost:3002/user/createToDoTask', toDoTaskData)
              .then(res => {
                console.log(res)
                if (res.data.statusCode === 200) {

                  navigate('/to-do-list');
                }
                else
                  alert(res.data.msg)
              });
          });
      }
      else {
        axios.post('http://localhost:3002/user/createToDoTask', inputs)
          .then(res => {
            console.log(res)
            if (res.data.statusCode === 200) {

              navigate('/to-do-list');
            }
            else
              alert(res.data.msg)
          });
      }


    }

  }

  return (
    <div className="container">
      <div className="create-to-do-box">
        <div className="screen__content">
          <h4>Create new to do</h4>
          <form className="to-do-box" onSubmit={toDoSubmit}>
            <div className="login__field">

              <input type="text" name="task_title" className="input_style" value={inputs.task_title || ""} onChange={handleChange} placeholder="Task title" />
              {errors.task_title && <p className="alert-message">
                {errors.task_title}
              </p>}
            </div>
            <div className="login__field">
              <textarea type="password" name="task_description" className="input_style task-desc" value={inputs.task_description || ""} onChange={handleChange} placeholder="Task description" />
              {errors.task_description && <p className="alert-message">
                {errors.task_description}
              </p>}
            </div>
            <div className="login__field">

              <input type="file" name="task_img" className="input_style" onChange={saveFile} />

            </div>
            <button className="btn btn-primary" type="submit">
              <span className="button__text">Create to do </span>

            </button>
            <div className="url-section">
              <span>  <Link to="/to-do-list" className="to_do-link"> To do list</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );

}

export default CreateToDo;