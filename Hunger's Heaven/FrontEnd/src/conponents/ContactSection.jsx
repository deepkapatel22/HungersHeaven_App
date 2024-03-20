import styled from "styled-components";
import QueryCard from "./QueryCard";
import Design from "./Design";
const ContactSection = () => {
  return (
    <>
    <ContactCSS>
        <div className="container" id="1">
            <div className="query">
                <h1 className="question">Have Some Question?</h1>
                <p className="mailUs">Thank you for your intrest in our services.
                Please fill out the form below or e-mail us at <a href="#">hello@demoemail.com</a> and we will get back to you promptlyregarding your request. </p>
            </div>
        </div>
        <QueryCSS>
            <Design/>
            <QueryCard/>
        </QueryCSS>
    </ContactCSS>
    </>
  )
}

export default ContactSection;

const ContactCSS = styled.div` 
@import url('https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap');
    margin-top: 30px;
    background-color: #f0f0f0;
    width: 100%;
    padding-bottom: 40px;
    .container{
        display: flex;
        justify-content: end;
        padding: 10px;
    }
    .query{
        max-width: 900px;
        padding: 40px;
        font-family: "Kode Mono", monospace;
    }
`;
const QueryCSS =styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    margin-right: 200px;
    margin-left: 100px;
    
`;
