import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";

const Header2 = ({userId}) => {
    const userEmail  = localStorage.getItem("email");
    const navigate = useNavigate();
    const { user, logoutUser } = useUser(); // Access user data and logoutUser function from context
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        navigate('/'); // Optionally navigate to homepage or login page
    };

    // Use user's email if available, otherwise display "My Account"
    

    return (
        <>
            <HeaderMain>
                <div className="mainHeader">
                    <div className="logo">
                        <img src="/images/HH_logo.png" alt="Hunger's Heaven" />
                        <h1>HUNGER'S HEAVEN</h1>
                    </div>
                        
                    <ListStyle>
                        <div className="listElements">
                            <ul>
                                <li><Link style={{textDecoration: "none", color: "black"}} to="/afterlogin">HOME</Link></li>
                                <li><Link style={{textDecoration: "none", color: "black"}} to="/recipes">RECIPES</Link></li>
                                <li><Link style={{textDecoration: "none", color: "black"}} to="/write">WRITE</Link></li>
                                <li><Link style={{textDecoration: "none", color: "black"}} to="/contact">CONTACT US</Link></li>
                                <li><Link style={{textDecoration: "none", color: "black"}} to="/about">ABOUT US</Link></li>
                            </ul>
                        </div>   
                    </ListStyle>
                    <DropdownContainer>
                        <DropdownButton onClick={toggleDropdown}>
                            {userEmail}
                        </DropdownButton>
                        {isOpen && (
                            <DropdownContent>
                                <DropdownItem><Link to={`/userprofile`}>Profile</Link></DropdownItem>
                                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                            </DropdownContent>
                        )}
                    </DropdownContainer>
                </div>
            </HeaderMain>
        </>
    );
};
export default Header2;

const HeaderMain = styled.div`
    position: fixed;
    top:0;
    right:0;
    left:0;
    padding: 0px 10px;
    background-color: #f0f0f0;
    max-width: 100%;
    .logo img{
        height: 50px;
        width: 50px;
        padding: 0px 10px;
    }
    .mainHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo{
        display:flex;
        align-items: center;
    }
`;

const ListStyle = styled.div`

    display: flex;
    align-items: center;
    .listElements ul{
        display: flex;
        align-items: center;
        list-style: none;
        gap: 10px;
        padding: 0px 30px;
        cursor: pointer;
    }
    .listElements ul li{
        font-size: 18px;
        font-weight: 500;
        padding: 20px 5px;
    }

`;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.div`
  cursor: pointer;
  /* Add your button styling */
`;

const DropdownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  top:30px;
  right:-7px;
`;

const DropdownItem = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: #f1f1f1;
  }
`;


