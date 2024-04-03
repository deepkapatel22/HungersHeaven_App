import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import validation from "./LoginValidation";
import { Link } from "react-router-dom";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";



const Login = ({closeLogInModel}) => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

      setIsSubmitting(true);
      axios
        .post('http://localhost:3000/api/user/login',{
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          alert("Login successful! Please check your email to verify your account");
          console.log(response.data);
          localStorage.setItem("email" , values.email)
          navigate("/afterlogin");
        })
        .catch((error) => {
          console.error("Login error:", error.response ? error.response.data : "No response from server");
          setMessage(error.response ? error.response.data.message : "Error during login");
        })
        .finally(() => setIsSubmitting(false));
  };
  return (
    <>
      <LoginCSS>
        <div className="loginBackground" onClick={closeLogInModel}></div>
        <div className="loginMain">
          <div className="input-fields">
            <div className="headinginfo">
              <h1 className="heading">Log In</h1>
              <button onClick={closeLogInModel}><StyledImCross  /></button>
            </div>
            <form className="form-element" onSubmit={handleSubmit}>
              <div className="form-components">
                <label htmlFor="email">E-mail</label><br />
                <input type="email"
                  onChange={handleInput}
                  id="email"
                  name="email"
                  placeholder="Enter E-mail" /><br />
                {errors.email && <span>{errors.email}</span>}
              </div>
              <div className="form-components">
                <label htmlFor="password">Password</label><br />
                <input type="password"
                  onChange={handleInput}
                  id="password"
                  name="password"
                  placeholder="Password" /><br />
                {errors.password && <span>{errors.password}</span>}
              </div>
              <div className="login-info">
                <p>Don't have account?</p> <Link to="/signup">Sign Up</Link>
              </div>
              <div className="form-components">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </LoginCSS>
    </>
  );
}

export default Login;

const LoginCSS = styled.div`
.loginMain{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    max-width: 30rem; 
    background-color: white;
    padding: 20px;
    border-radius: 0.5rem;
}
.loginBackground{
    background-color: rgba(189,189,189,0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.form-components span{
  color: red;
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
    flex-direction: column;
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