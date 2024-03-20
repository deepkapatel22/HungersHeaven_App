import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
const Design = () => {
  return (
    <DesignCSS>
        <div className="emaildesign">
            <div className="e-mail">
                <img src="/images/emailimg.png" alt="Email"/>
            </div>
            <div className="person">
                <img id="img1" src="/images/callingman.png"/>
                <img id="img2" src="/images/tea.png"/>
            </div>
        </div>
        <div className="info">
            <h1>Get in Touch</h1><hr/>
            <div className="d">
                <FaPhoneAlt />
                <p id="mno">+1-414-456-7890</p>
            </div>
            <div className="d">
                <MdEmail />
                <p id="mail">hello@demo.com</p>
            </div>
            <div className="d4">
                <MdLocationOn />
                <div className="innerContent">
                    <p id="location">2746 N Murray</p>
                    <p id="location1">Milwaukee WI 53211</p>
                </div>
            </div>
        </div>
    </DesignCSS>
  )
}

export default Design;

const DesignCSS = styled.div`
    .e-mail img{
        height: 250px;
        width: 400px;
    }
    .emaildesign{
        position: relative;
    }
    #img1{
        height: 100px;
        width: 100px;
        position: absolute;
        top: 50px;
        left: -30px;
        rotate: -30deg;
    }
    #img2{
        height: 100px;
        width: 100px;
        position: absolute;
        right: 50px;
        bottom: -30px;
    }
    .info{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: gray;
    gap: 60px;
    .d{
        display: flex;
        align-items: center;
        gap:10px;
    }
.d4{
    display: flex;
    align-items: center;
    gap: 10px;  
}
`;