import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ImCross } from 'react-icons/im';
import validation from './Signupvalidation'; 
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SignUp = ({ closeSignUpModel }) => {
  const navigate = useNavigate(); 
  const [values, setValues] = useState({
    fname: '',
    lname: '',
    email: '',
    phno: '',
    crpass: '',
    copass: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  //handleInput
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  //handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

      setIsSubmitting(true);
      axios.post('http://localhost:3000/api/user/signup', {
        fname: values.fname,
        lname: values.lname,
        email: values.email,
        phno: values.phno,
        password: values.crpass, 
      })
      .then(response => {
        alert("Signup successful! Please check your email to verify your account");
        navigate('/');
        console.log(response.data);
        console.log(message);
      })
      .catch(error => {
        console.error("Signup error:", error.response ? error.response.data : "No response from server");
        setMessage(error.response ? error.response.data.message : "Error during signup");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <>
      <SignupCSS>
        <div className="signUpBackground" onClick={closeSignUpModel}></div>
        <div className="signUpMain">
          <div className="input-fields">
            <div className="headinginfo">
              <h1 className="heading">Sign Up</h1>
              <StyledImCross onClick={closeSignUpModel} />
            </div>
            <form className="form-element" onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="form-component">
                  {/* First Name */}
                  <div className="name">
                    <label htmlFor="fname">First name</label><br />
                    <input 
                      type="text" 
                      id="fname" 
                      name="fname" 
                      value={values.fname}
                      onChange={handleInput}
                      placeholder="First Name" /><br />
                    {errors.fname && <span>{errors.fname}</span>}
                  </div>
                  
                  {/* Last Name */}
                  <div className="name">
                    <label htmlFor="lname">Last name</label><br />
                    <input 
                      type="text" 
                      id="lname" 
                      name="lname" 
                      value={values.lname}
                      onChange={handleInput}
                      placeholder="Last Name" /><br />
                    {errors.lname && <span>{errors.lname}</span>}
                  </div>
                </div>

                {/* Email */}
                <div className="form-components">
                  <label htmlFor="email">E-mail</label><br />
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={values.email}
                    onChange={handleInput}
                    placeholder="Email" /><br />
                  {errors.email && <span>{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-components">
                  <label htmlFor="phno">Phone No.</label><br />
                  <input 
                    type="text" 
                    id="phno" 
                    name="phno" 
                    value={values.phno}
                    onChange={handleInput}
                    placeholder="Phone No" /><br />
                  {errors.phno && <span>{errors.phno}</span>}
                </div>

                {/* Create Password */}
                <div className="form-components">
                  <label htmlFor="crpass">Create Password</label><br />
                  <input 
                    type="password" 
                    id="crpass" 
                    name="crpass" 
                    value={values.crpass}
                    onChange={handleInput}
                    placeholder="Create your password" /><br />
                  {errors.crpass && <span>{errors.crpass}</span>}
                </div>

                {/* Confirm Password */}
                <div className="form-components">
                  <label htmlFor="copass">Confirm Password</label><br />
                  <input 
                    type="password" 
                    id="copass" 
                    name="copass" 
                    value={values.copass}
                    onChange={handleInput}
                    placeholder="Confirm your password" /><br />
                  {errors.copass && <span>{errors.copass}</span>}
                </div>

                

                {/* Additional Info and Sign Up Button */}
                <div className="login-info">
                  <p>Did you already Sign Up? <Link to='/login'>Log In</Link></p>
                </div>
              {message && <p>{message}</p>}
              <div className="form-components">
                <button type="submit"  disabled={isSubmitting}>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </SignupCSS>
    </>
  );
}

export default SignUp;


const SignupCSS = styled.div`
.signUpMain{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  max-width: 30rem; 
  background-color: white;
  padding: 20px;
  border-radius: 0.5rem;
}
.signUpBackground{
  background-color: rgba(189,189,189,0.8    );
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
  .input-fields{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .input-fields label{
    margin-left:10px;
    font-size: 15px;
  }
  .input-fields input{
    border: 1px solid black;
    border-radius: 20px;
  }
  .form-component{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .name input{
    padding: 5px 10px;
  }
  .form-components input{
    padding: 5px 10px;
    padding-right:210px;
  }
  .form-components span, .form-component span{
    color: red;
  }
  .form-element{
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .form-components button{
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 15px;
    cursor: pointer;
  }
  .headinginfo{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 210px; 
    
  }
`;
const StyledImCross = styled(ImCross)`
  cursor: pointer;
`;