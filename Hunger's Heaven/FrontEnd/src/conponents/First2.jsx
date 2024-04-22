
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useRecipes } from '../contexts/RecipeContext';
import { useEffect, useState } from "react";
import axios from 'axios';

const First2 = () => {
    const { name, setName, resFilter ,setResFilter} = useRecipes();
    const handleFilter = (event) => {
        setName(event.target.value);  
    }
    useEffect(()=>{
        axios.post('http://localhost:3000/api/recipes/search',{
            query: name
        }).then(response =>{
            setResFilter(response.data); 
             
    })
    },[name])
    console.log(resFilter);
    return (
        <>
            <TopPart>
                <div className="quote">
                    <h1>NO ONE IS BORN A GREAT COOK, ONE LEARNS BY DOING</h1>
                </div>
                <div className="twoBtn"> 
                <div className="searchField">
                    <input type="text" name="searchInput" placeholder="Search" value={name} onChange={handleFilter}/>
                    <FaSearch id="searchIcon"/>
                    </div>
                </div>
            </TopPart>
        </>
    );
};

export default First2;

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
    .searchField input{
        padding-right: 100px;
        padding-top:5px;
        padding-bottom: 5px;
        padding-left:5px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid black;  
    }
    .searchField input:hover{
        border: none;
    }
    .searchField input::placeholder{
        color: black;
        
    }
    #searchIcon{
        right: 20px;
        top : 21.5px;
        cursor: pointer;
        position: absolute;
        top:4px;
        right: 10px;
        
    }
    .searchField{
        position: relative;
    }
`;

