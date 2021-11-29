import { React, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

const SignUp = () => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const  navigate  = useNavigate ();

    const handleChange = (event) => {
       
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

        setErrors(values => ({ ...values, [name]: '' }))

    }

    const registerSubmit = (event) => {
        event.preventDefault();
      

        if (!inputs.first_name) {
            setErrors(values => ({ ...values, 'first_name': 'First name is required' }))
        }
        else if (!inputs.last_name) {
            setErrors(values => ({ ...values, 'last_name': 'Last name is required' }))
        }
        else if (!inputs.email) {
            setErrors(values => ({ ...values, 'email': 'Email address is required' }))

        } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            setErrors(values => ({ ...values, 'email': 'Email address is invalid' }))
        }
        else if (!inputs.password) {
            setErrors(values => ({ ...values, 'password': 'Password is required' }))
        }
        else if (!inputs.confirm_password) {
            setErrors(values => ({ ...values, 'confirm_password': 'Confirm password is required' }))
        }
        else if (inputs.password !== inputs.confirm_password) {
            setErrors(values => ({ ...values, 'confirm_password': 'Password and confirm password did not matched' }))
        }
        else {

            axios.post('http://localhost:3002/user/register', inputs)
            .then(res =>
                {
                    navigate('/');
                   });

        }

    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="sign-up" onSubmit={registerSubmit}>
                        <div className="login__field">
                            <input type="text" name="first_name" className="input_style" value={inputs.first_name || ""} onChange={handleChange} placeholder="Fist Name" />

                            {errors.first_name && <p className="alert-message">
                                {errors.first_name}
                            </p>}

                        </div>
                        <div className="login__field">
                            <input type="text" name="last_name" className="input_style" value={inputs.last_name || ""} onChange={handleChange} placeholder="Last Name" />
                            {errors.last_name && <p className="alert-message">
                                {errors.last_name}
                            </p>}
                        </div>
                        <div className="login__field">
                            <input type="text" name="email" className="input_style" value={inputs.email || ""} onChange={handleChange} placeholder="Email" />
                            {errors.email && <p className="alert-message">
                                {errors.email}
                            </p>}
                        </div>
                        <div className="login__field">
                            <input type="password" name="password" className="input_style" value={inputs.password || ""} onChange={handleChange} placeholder="Password" />
                            {errors.password && <p className="alert-message">
                                {errors.password}
                            </p>}
                        </div>
                        <div className="login__field">
                            <input type="password" name="confirm_password" className="input_style" value={inputs.confirm_password || ""} onChange={handleChange} placeholder="Confirm Password" />
                        
                            {errors.confirm_password && <p className="alert-message">
                                {errors.confirm_password}
                            </p>}

                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">SIGN UP </span>
                        </button>
                        <div className="url-section">
                            <span> Already have an accoun? <Link to="/" className="login-page-link"> Log In</Link></span>
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


export default SignUp;