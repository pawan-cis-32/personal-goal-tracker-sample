import {React , useState} from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const  navigate  = useNavigate ();
  const [cookies, setCookie] = useCookies(["user_id"]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))

    setErrors(values => ({ ...values, [name]: '' }))

}

const loginSubmit = (event) => {
  event.preventDefault();

   if (!inputs.email) {
    setErrors(values => ({ ...values, 'email': 'Email is required' }))

} else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
    setErrors(values => ({ ...values, 'email': 'Email is invalid' }))
}
else if (!inputs.password) {
    setErrors(values => ({ ...values, 'password': 'Password is required' }))
}
  else {
    axios.post('http://localhost:3002/user/userLogin', inputs)
    .then(res =>
        {
          console.log(res)
          if(res.data.statusCode === 200)
          {
          setCookie("user_id", res.data.data.user_id, {
            path: "/"
          });
          navigate('/to-do-list');
        }
        else
        alert(res.data.msg)
           });
          

  }

}

  return (
    <div className="container">
    <div className="screen">
      <div className="screen__content">
        <form className="login" onSubmit={loginSubmit}>
          <div className="login__field">
            
            <input type="text" name="email" className="input_style" value={inputs.email || ""} onChange={handleChange} placeholder="Email" />
            {errors.email && <p className="alert-message">
                                {errors.email}
                            </p>}
          </div>
          <div className="login__field">
          
            <input type="password" name="password" className="input_style" value={inputs.password || ""} onChange={handleChange} placeholder="Password"/>
            {errors.password && <p className="alert-message">
                                {errors.password}
                            </p>}
          </div>
          <button className="button login__submit" type="submit">
            <span className="button__text">Log In </span>
          
          </button>		
          <div className="url-section">
       <span> Don't have an account? <Link to="/sign-up" className="sign-up-link"> Register</Link></span>   
            </div>		
        </form>
      </div>
      <div className="screen__background">
        <span className="screen__background__shape screen__background__shape4"></span>
        <span className="screen__background__shape screen__background__shape3"></span>		
        <span className="screen__background__shape screen__background__shape2"></span>
        <span className="screen__background__shape screen__background__shape1"></span>
      </div>		
    </div>
  </div>
  );
};

 
export default Login;