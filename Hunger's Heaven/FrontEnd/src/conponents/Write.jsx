import styled from "styled-components";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Write = () => {
    const navigate = useNavigate(); 

  const handleNavigate = () => {
    navigate('/login'); 
  };
  return (
    <>
        <WriteCSS>
            <div className="circlePlus">
                <CiCirclePlus onClick={handleNavigate} id="plusSymbol"/>
                <h1>Write your content here</h1>
            </div>
        </WriteCSS>
    </>
  )
}

export default Write;

const WriteCSS = styled.div`
        margin-top:50px;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        #plusSymbol{
            font-size: 80px;
            cursor: pointer;
        }
        .circlePlus{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border: 5px dashed black;
            border-radius: 30px;
            padding: 200px 350px;
        }
`;