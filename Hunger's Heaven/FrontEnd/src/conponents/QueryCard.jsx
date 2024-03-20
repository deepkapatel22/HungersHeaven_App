import styled from "styled-components";
import { useState } from "react";
const QueryCard = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      };
    
    //  const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission here (e.g., send data to a backend server)
    //     console.log(formData);
    //   };
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
      
        // URL of your backend endpoint
        const backendUrl = 'http://localhost:3000/submit'; // Adjust the port if necessary
      
        // Use the Fetch API to send the form data to your backend
        fetch(backendUrl, {
          method: 'POST', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Specify the content type as JSON
          },
          body: JSON.stringify(formData), // Convert the formData object to a JSON string
        })
        .then(response => {
          if (response.ok) {
            return response.text(); // or response.json() if your server responds with JSON
          }
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          console.log('Success:', data);
          // Here you can handle the successful form submission,
          // for example, showing a success message to the user or clearing the form fields
          // You could also invoke the onSubmitSuccess prop here if needed
          // this.props.onSubmitSuccess();
        })
        .catch((error) => {
          console.error('Error:', error);
          // Here you can handle errors, for example, showing an error message to the user
        });
      };
      
      return (
        <>
          <Card>
            <div className="inputs">
              <form className="formElements" onSubmit={handleSubmit}>
                <div className="formControl">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name} // Controlled input
                    onChange={handleChange} // Update state on change
                  />
                </div>
                <div className="formControl">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="text" 
                    id="phone" 
                    name="phone"
                    value={formData.phone} // Controlled input
                    onChange={handleChange} // Update state on change
                  />
                </div>
                <div className="formControl">
                  <label htmlFor="email">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email} // Controlled input
                    onChange={handleChange} // Update state on change
                  />
                </div>
                <div className="formControl">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows="6" 
                    cols="20"
                    value={formData.message} // Controlled textarea
                    onChange={handleChange} // Update state on change
                  ></textarea>
                </div>
                <div className="formControl">
                  <button type="submit" className="sendmsg">SEND MESSAGE</button>
                </div>
              </form>
            </div>
          </Card>
        </>
      );
    };
    // QueryCard.propTypes = {
    //     className: PropTypes.string,
    //     onSubmitSuccess: PropTypes.func,
    //   };
      
    //   QueryCard.defaultProps = {
    //     className: '',
    //     onSubmitSuccess: () => {},
    //   };

export default QueryCard;

const Card = styled.div`
    .formElements{
        display: flex;
        flex-direction: column;
        gap: 35px;  
        justify-content: center;
        align-items: center;
    }
    .inputs{
        max-width: 400px;
        border: 1px solid black;
        padding: 20px;
        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
        border-radius: 15px;
    }
    .formControl{
        position: relative;
    }
    .formControl label{
        position: absolute;
        top: -9px;
        left: 7px;
        font-size: 14px;
        background-color: white;
        padding: 0 5px;
        font-weight: 500;
    }
    .formControl input, .formControl textarea, .formControl button {
        padding: 7px 40px;
        border: 1px solid black;
        border-radius: 15px;
        box-shadow: 1px 1px 3px; black;
    }
`;