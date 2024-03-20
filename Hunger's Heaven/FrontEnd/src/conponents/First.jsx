import { useState } from "react";
import Login from "./Login";
import styled from "styled-components";
import SignUp from "./SignUp";


const First = () => {
    
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const closeSignUp = () => setIsSignUpOpen(false);
    const closeLogin = () => setIsLoginOpen(false);

    return (
        <>
            <TopPart>
                <div className="quote">
                    <h1>NO ONE IS BORN A GREAT COOK, ONE LEARNS BY DOING</h1>
                </div>
                <div className="twoBtn"> 
                    <button type="button" onClick={() => setIsSignUpOpen(true)} className="btnTwo" id="btnOne">Sign Up</button>
                    {isSignUpOpen && <SignUp closeSignUpModel={closeSignUp} />}
                    <button type="button" onClick={() => setIsLoginOpen(true)} className="btnTwo" id="btnTo">Log In</button>
                    {isLoginOpen && <Login closeLogInModel={closeLogin} />}
                </div>
            </TopPart>
        </>
    );
};

export default First;

const TopPart = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 60vh;
   margin: 120px 150px;
   gap: 15px;
    .quote h1{
        font-size:60px;
        text-align: center;
    }
    .twoBtn{
        display: flex;
        justify-content: center;
        align-items: center; 
        gap: 20px;  
    }
    .btnTwo{
        padding: 15px 50px;
        background: transparent;
        border: 1px solid black;
        border-radius: 25px;
        font-size: 17px;
        font-weight: 600;
        cursor: pointer;
    }
    #btnTo{
        background-color: black;
        border: none;
        color: white;
    }
    #btnOne:hover{
        background-color: black;
        border: none;
        color: white;
    }
    #btnTo:hover{
        background: transparent;
        border: 1px solid black;
        color: black;
    }
`;

