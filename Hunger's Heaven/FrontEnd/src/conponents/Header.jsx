import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
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
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/">HOME</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/recipes">RECIPES</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/write">WRITE</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/contact">CONTACT US</Link></li>
                            <li><Link style={{textDecoration: "none", color: "black"}} to="/about">ABOUT US</Link></li>
                        </ul>
                    </div>
                    <div className="searchField">
                        <input type="text" name="searchInput" placeholder="Search"/>
                        <FaSearch id="searchIcon"/>
                    </div>
                    
                </ListStyle>
            </div>
        </HeaderMain>
    </>
  )
}

export default Header;

const HeaderMain = styled.div`
    position: fixed;
    top:0;
    right:0;
    left:0;
    padding: 0px 10px;
    background-color: #f0f0f0;
    max-width: 1200px;
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
    .searchField input{
        padding: 7px 20px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid black; 
        position: relative;  
        border-radius: 30px;
    }
    .searchField input::placeholder{
        color: black;
        
    }
    #searchIcon{
        position: absolute;
        right: 20px;
        top : 21.5px;
        cursor: pointer;
    }
`;
