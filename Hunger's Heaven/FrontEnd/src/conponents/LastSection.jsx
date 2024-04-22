import styled from "styled-components";
import { FaFacebook, FaInstagram, FaWhatsapp, FaLinkedin, FaRegCopyright} from "react-icons/fa";
import { useState } from "react";
import ChatBox from "./ChatBox";

const LastSection = () => {
        const [showChatbot, setShowChatbot] = useState(false);
      
        const toggleChatbot = () => setShowChatbot(!showChatbot);
  return (
    <LastCSS>
        <div className="mainDiv">
            <div className="companyInfo">
                <h1>Hunger's Heaven</h1>
                <p> The Hunger's Heaven App is brought to you by HungersHeaven Co. Pty Ltd.</p>
                <div className="social">
                    <FaFacebook />
                    <FaInstagram />
                    <FaWhatsapp />
                    <FaLinkedin />
                </div>
            </div>
            <div className="end">
                <p><FaRegCopyright/> By Hunger's Heaven</p>
                <button className="chatbot" onClick={toggleChatbot}>chat with us !!!</button>
            </div>
        </div>
        {showChatbot && <ChatBox onClose={() => setShowChatbot(false)} />}
    </LastCSS>
  )
}
export default LastSection;

const LastCSS = styled.div`
    background-color: grey;
    height: 40vh;
    width:100%;
    color: white;
    .companyInfo{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:20px;
    }
    .social{
        font-size: 30px;
        display: flex;
        gap:20px;
    }
    .end{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: auto 100px;
    }
    .end button{
        position: fixed;
        bottom:20px;
        right: 20px;
        padding: 10px 30px;
        background: transparent;
        border: 1px solid black;
        border-radius: 25px;
        font-size: 17px;
        font-weight: 600;
        cursor: pointer;
        color: black;
        
    }
    .end button:hover{
        background: white;
        border: 1px solid white;
        color: black;
    }
`;

