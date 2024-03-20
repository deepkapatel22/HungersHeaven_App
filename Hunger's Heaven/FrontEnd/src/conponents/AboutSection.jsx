import styled from "styled-components";
const AboutSection = () => {

        
  return (
    <>
        <AboutCSS>
          <div className="appInfo">
            <p className="aboutHH">About Hunger's Heaven</p>
            <h2 className="textInfo">
              Our mission is to be the smartest<br/>
              and most helpful food platform<br/>
              in existence
            </h2>
            <p className="textInfo2">
              We're fulfilling this mission by improving life in the kitchen<br/>
              for millions of home cooks around the world.
            </p>
          </div>
          <CustomCSS>
              <div className="mainEvent">
                <div className="infoImg">
                  <img id="img2" src="/images/customFood.jpg"/>
                </div>
                <div className="infoText">
                  <h1>We help people discover what to eat based on personal preferences and ingredience</h1>
                  <p>Our system of personalized discovery learns you better to serve you better, so the question "what's for dinner?" is answered before it's even asked.</p>
                </div>
              </div>
          </CustomCSS>
        </AboutCSS>
    </>
  )
} 

export default AboutSection;

const AboutCSS = styled.div`
  .aboutHH{
    color: rgba(189,189,189,1);
    font-size: 18px;
    margin-top: 20px;
  }
  .appInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .textInfo{
    text-align: center;
    font-size: 60px;
    
  }
  .textInfo2{
    text-align: center;
    font-size: 20px;
    font-weight: 700px;
  }
`;
const CustomCSS = styled.div`
  #img2{
    height: 60vh;
    width: 70vh;
    box-shadow: 10px 10px 5px #aaaaaa;
  }
  .mainEvent{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px auto;
    gap: 40px;
    padding-top: 100px;
    background-color: rgba(189,189,189,0.2);
    margin-right: 200px;
    padding-bottom: 100px;

  }
  .infoText{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    gap: 10px;
  }
`;
